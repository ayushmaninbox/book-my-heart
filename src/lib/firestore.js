import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  setDoc
} from 'firebase/firestore';
import { db } from './firebase';

// Collections
const DATES_COLLECTION = 'dates';
const INVITES_COLLECTION = 'invites';

// Create a new date
export const createDate = async (dateData) => {
  try {
    // Use the custom ID as the document ID
    const dateRef = doc(db, DATES_COLLECTION, dateData.id);
    
    const firestoreData = {
      ...dateData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    await setDoc(dateRef, firestoreData);
    
    return { ...firestoreData, id: dateData.id };
  } catch (error) {
    console.error('Error creating date:', error);
    throw error;
  }
};

// Get a date by ID
export const getDateById = async (id) => {
  try {
    const dateRef = doc(db, DATES_COLLECTION, id);
    const dateSnap = await getDoc(dateRef);
    
    if (dateSnap.exists()) {
      return { id: dateSnap.id, ...dateSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching date:', error);
    return null;
  }
};

// Get all dates for a user
export const getUserDates = async (userId) => {
  try {
    const datesRef = collection(db, DATES_COLLECTION);
    const q = query(
      datesRef, 
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const dates = [];
    
    querySnapshot.forEach((doc) => {
      dates.push({ id: doc.id, ...doc.data() });
    });
    
    return dates;
  } catch (error) {
    console.error('Error fetching user dates:', error);
    return [];
  }
};

// Create an invite record
export const createInvite = async (inviteData) => {
  try {
    const inviteRef = collection(db, INVITES_COLLECTION);
    const docRef = await addDoc(inviteRef, {
      ...inviteData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return { id: docRef.id, ...inviteData };
  } catch (error) {
    console.error('Error creating invite:', error);
    throw error;
  }
};

// Get invites for a partner email
export const getPartnerInvites = async (email) => {
  try {
    const invitesRef = collection(db, INVITES_COLLECTION);
    const q = query(
      invitesRef,
      where('partnerEmail', '==', email),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const invites = [];
    
    querySnapshot.forEach((doc) => {
      invites.push({ id: doc.id, ...doc.data() });
    });
    
    return invites;
  } catch (error) {
    console.error('Error fetching partner invites:', error);
    return [];
  }
};

// Update invite status
export const updateInviteStatus = async (inviteId, updates) => {
  try {
    const inviteRef = doc(db, INVITES_COLLECTION, inviteId);
    await setDoc(inviteRef, {
      ...updates,
      updatedAt: serverTimestamp()
    }, { merge: true });
    
    return true;
  } catch (error) {
    console.error('Error updating invite:', error);
    return false;
  }
};