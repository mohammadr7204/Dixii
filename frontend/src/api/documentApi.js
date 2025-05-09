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

export const uploadDocument = async (file, metadata, userId, clientId) => {
  try {
    // Upload file to Firebase Storage
    const storageRef = ref(storage, `documents/${userId}/${clientId}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Create document record in Firestore
    const documentsRef = collection(db, 'documents');
    const newDocument = {
      ...metadata,
      userId,
      clientId,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      downloadURL,
      storagePath: storageRef.fullPath,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: metadata.tags || [],
      category: metadata.category || 'Uncategorized',
      sharedWith: [],
      previewUrl: null
    };
    const docRef = await addDoc(documentsRef, newDocument);
    return { id: docRef.id, ...newDocument };
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};

export const getDocuments = async (userId, clientId = null, filters = {}) => {
  try {
    const documentsRef = collection(db, 'documents');
    let constraints = [
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    ];

    if (clientId) {
      constraints.push(where('clientId', '==', clientId));
    }

    if (filters.category) {
      constraints.push(where('category', '==', filters.category));
    }

    if (filters.tags && filters.tags.length > 0) {
      constraints.push(where('tags', 'array-contains-any', filters.tags));
    }

    if (filters.search) {
      // Note: This is a simple search. For better search, consider using Algolia or similar
      const q = query(documentsRef, ...constraints);
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter(doc =>
          doc.fileName.toLowerCase().includes(filters.search.toLowerCase()) ||
          doc.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
          doc.description?.toLowerCase().includes(filters.search.toLowerCase())
        );
    }

    const q = query(documentsRef, ...constraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
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

export const getDocument = async (documentId) => {
  try {
    const docRef = doc(db, 'documents', documentId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('Document not found');
    }

    return {
      id: docSnap.id,
      ...docSnap.data()
    };
  } catch (error) {
    console.error('Error fetching document:', error);
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

export const deleteDocument = async (document) => {
  try {
    // Delete file from Storage
    const storageRef = ref(storage, document.storagePath);
    await deleteObject(storageRef);

    // Delete document record from Firestore
    const docRef = doc(db, 'documents', document.id);
    await deleteDoc(docRef);

    return document.id;
  } catch (error) {
    console.error('Error deleting document:', error);
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