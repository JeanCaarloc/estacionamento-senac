import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLeu4a7GxnGXDLG-mUj2yQb_aRARN0aZw",
  authDomain: "estacionamento-267ba.firebaseapp.com",
  projectId: "estacionamento-267ba",
  storageBucket: "estacionamento-267ba.firebasestorage.app",
  messagingSenderId: "213355120069",
  appId: "1:213355120069:web:80553e02f4917025c3b7ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

//console.log('Vai corinthians', app);

async function getCities(db) {
  const citiesCol = collection(db, 'teste');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  //console.log(cityList, citySnapshot, citiesCol);
  //return cityList;
}

getCities(db);




