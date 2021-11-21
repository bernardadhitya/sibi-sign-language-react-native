import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyBQbgHFq_n-C4pZec8xrAfW1Zke6hL-Tzc",
  authDomain: "sibi-sign-language-service.firebaseapp.com",
  projectId: "sibi-sign-language-service",
  storageBucket: "sibi-sign-language-service.appspot.com",
  messagingSenderId: "876792998044",
  appId: "1:876792998044:web:893517ee71accd25b12559"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getUrl = async () => {
  const response = await getDocs(collection(db, 'url'));
  const data = response.docs.map(doc => doc.data());

  console.log(data[0].url);

  return data[0].url;
}

