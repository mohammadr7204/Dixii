import { db, storage } from '../utils/firebase';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  getDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const getAuthHeader = async () => {
  const auth = getAuth();
  const token = await auth.currentUser?.getIdToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const uploadDocument = async (file, clientId) => {
  const formData = new FormData();
  formData.append('file', file);
  if (clientId) {
    formData.append('clientId', clientId);
  }

  const config = await getAuthHeader();
  config.headers['Content-Type'] = 'multipart/form-data';

  const response = await axios.post(`${API_URL}/upload`, formData, config);
  return response.data;
};

export const getDocuments = async (filters = {}) => {
  const config = await getAuthHeader();
  const response = await axios.get(`${API_URL}/documents`, {
    ...config,
    params: filters,
  });
  return response.data;
};

export const getDocument = async (documentId) => {
  const config = await getAuthHeader();
  const response = await axios.get(`${API_URL}/documents/${documentId}`, config);
  return response.data;
};

export const deleteDocument = async (documentId) => {
  const config = await getAuthHeader();
  const response = await axios.delete(`${API_URL}/documents/${documentId}`, config);
  return response.data;
};

export const getSharedDocuments = async (userId) => {
  try {
    const documentsRef = collection(db, 'documents');
    const q = query(
      documentsRef,
      where('sharedWith', 'array-contains', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching shared documents:', error);
    throw error;
  }
};

export const updateDocument = async (documentId, metadata) => {
  try {
    const docRef = doc(db, 'documents', documentId);
    const updatedData = {
      ...metadata,
      updatedAt: new Date().toISOString()
    };
    await updateDoc(docRef, updatedData);
    return { id: documentId, ...updatedData };
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

export const shareDocument = async (documentId, userId) => {
  try {
    const docRef = doc(db, 'documents', documentId);
    await updateDoc(docRef, {
      sharedWith: arrayUnion(userId),
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error('Error sharing document:', error);
    throw error;
  }
};

export const unshareDocument = async (documentId, userId) => {
  try {
    const docRef = doc(db, 'documents', documentId);
    await updateDoc(docRef, {
      sharedWith: arrayRemove(userId),
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error('Error unsharing document:', error);
    throw error;
  }
};

export const generatePreview = async (document) => {
  try {
    if (document.fileType.includes('pdf')) {
      // For PDFs, we can use the download URL directly
      return document.downloadURL;
    } else if (document.fileType.includes('image')) {
      // For images, we can use the download URL directly
      return document.downloadURL;
    } else {
      // For other file types, you might want to use a service like Google Docs Viewer
      return `https://docs.google.com/viewer?url=${encodeURIComponent(document.downloadURL)}&embedded=true`;
    }
  } catch (error) {
    console.error('Error generating preview:', error);
    throw error;
  }
};