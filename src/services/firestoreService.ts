import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  updateDoc,
  deleteDoc,
  Timestamp,
  addDoc
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { Gig, UserProfile, Application, Feedback } from '../types';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const userService = {
  async getUserProfile(userId: string) {
    const path = `users/${userId}`;
    try {
      const docRef = doc(db, 'users', userId);
      const snapshot = await getDoc(docRef);
      return snapshot.exists() ? (snapshot.data() as UserProfile) : null;
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, path);
    }
  },

  async createUserProfile(profile: UserProfile) {
    const path = `users/${profile.userId}`;
    try {
      await setDoc(doc(db, 'users', profile.userId), {
        ...profile,
        createdAt: Timestamp.now().toDate().toISOString(),
        updatedAt: Timestamp.now().toDate().toISOString()
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, path);
    }
  },

  async updateUserProfile(userId: string, data: Partial<UserProfile>) {
    const path = `users/${userId}`;
    try {
      await updateDoc(doc(db, 'users', userId), {
        ...data,
        updatedAt: Timestamp.now().toDate().toISOString()
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, path);
    }
  },

  onProfileSnapshot(userId: string, callback: (profile: UserProfile | null) => void) {
    const docRef = doc(db, 'users', userId);
    return onSnapshot(docRef, 
      (snapshot) => {
        callback(snapshot.exists() ? (snapshot.data() as UserProfile) : null);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, `users/${userId}`);
      }
    );
  }
};

export const gigService = {
  async getGigs() {
    const path = 'gigs';
    try {
      const q = query(collection(db, 'gigs'), where('status', '==', 'Active'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Gig));
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, path);
    }
  },

  async getPosterGigs(userId: string) {
    const path = 'gigs';
    try {
      const q = query(collection(db, 'gigs'), where('postedBy', '==', userId), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Gig));
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, path);
    }
  },

  async getGig(id: string) {
    const path = `gigs/${id}`;
    try {
      const docRef = doc(db, 'gigs', id);
      const snapshot = await getDoc(docRef);
      return snapshot.exists() ? ({ ...snapshot.data(), id: snapshot.id } as Gig) : null;
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, path);
    }
  },

  async createGig(gig: Omit<Gig, 'id' | 'createdAt' | 'updatedAt'>) {
    const path = 'gigs';
    try {
      const docRef = await addDoc(collection(db, 'gigs'), {
        ...gig,
        createdAt: Timestamp.now().toDate().toISOString(),
        updatedAt: Timestamp.now().toDate().toISOString()
      });
      return docRef.id;
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, path);
    }
  }
};

export const applicationService = {
  async applyForGig(application: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>) {
    const path = 'applications';
    try {
      const docRef = await addDoc(collection(db, 'applications'), {
        ...application,
        createdAt: Timestamp.now().toDate().toISOString(),
        updatedAt: Timestamp.now().toDate().toISOString()
      });
      return docRef.id;
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, path);
    }
  },

  async getGigApplications(gigId: string) {
    const path = 'applications';
    try {
      const q = query(collection(db, 'applications'), where('gigId', '==', gigId));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Application));
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, path);
    }
  },

  async getLearnerApplications(applicantId: string) {
    const path = 'applications';
    try {
      const q = query(collection(db, 'applications'), where('applicantId', '==', applicantId));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Application));
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, path);
    }
  }
};
