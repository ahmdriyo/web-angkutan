import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; 
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCu5L32Lawkz9GJWH7e_SFtD3n7rsNmEhE",
  authDomain: "web-angkutan.firebaseapp.com",
  projectId: "web-angkutan",
  storageBucket: "web-angkutan.appspot.com",
  messagingSenderId: "1054918656488",
  appId: "1:1054918656488:web:b60cca3f02d96bf867a45d"
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
export { app,auth, firestore, storage};