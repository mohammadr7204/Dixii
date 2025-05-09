import { db } from '../utils/firebase';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  orderBy
} from 'firebase/firestore';

export const createClient = async (clientData, userId) => {
  try {
    const clientsRef = collection(db, 'clients');
    const newClient = {
      ...clientData,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const docRef = await addDoc(clientsRef, newClient);
    return { id: docRef.id, ...newClient };
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
};

export const getClients = async (userId) => {
  try {
    const clientsRef = collection(db, 'clients');
    const q = query(
      clientsRef,
      where('userId', '==', userId),
      orderBy('name', 'asc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
};

export const updateClient = async (clientId, clientData) => {
  try {
    const clientRef = doc(db, 'clients', clientId);
    const updatedData = {
      ...clientData,
      updatedAt: new Date().toISOString()
    };
    await updateDoc(clientRef, updatedData);
    return { id: clientId, ...updatedData };
  } catch (error) {
    console.error('Error updating client:', error);
    throw error;
  }
};

export const deleteClient = async (clientId) => {
  try {
    const clientRef = doc(db, 'clients', clientId);
    await deleteDoc(clientRef);
    return clientId;
  } catch (error) {
    console.error('Error deleting client:', error);
    throw error;
  }
};