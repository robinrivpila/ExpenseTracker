import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB3PqBEdqcbGR1nSPHBdEJX_zRBKkjjLm0",
  authDomain: "ExpenseTracker.firebaseapp.com",
  projectId: "expensetracker-c7528",
  messagingSenderId: "400867090447",
  appId: "expensetracker-c7528"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export{auth, firestore}; 