
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getAuth }  from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";


export const firebaseConfig = {
    apiKey: "AIzaSyC-UbSM2ir5nTSeleS113xieOzcmAzz55k",
    authDomain: "sqi-training.firebaseapp.com",
    projectId: "sqi-training",
    storageBucket: "sqi-training.firebasestorage.app",
    messagingSenderId: "463628946486",
    appId: "1:463628946486:web:9d460437c444489c9a9c97"
  };
  
  // Initialize Firebase


const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export{auth}