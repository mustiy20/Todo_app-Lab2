import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBavi9XCp30LGm5T8wSdADJVwoc6wg6IYA",
  authDomain: "todo-app-6132.firebaseapp.com",
  projectId: "todo-app-6132",
  storageBucket: "todo-app-6132.appspot.com",
  messagingSenderId: "78467441148",
  appId: "1:78467441148:web:6cac9c2c4ff7be16045279"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
