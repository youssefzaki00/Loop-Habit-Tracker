// firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAX3mN-dHMzuf3deIIy-Dc-P00-0Ir9Ifo",
  authDomain: "loop-habit-tracker-clone.firebaseapp.com",
  projectId: "loop-habit-tracker-clone",
  storageBucket: "loop-habit-tracker-clone.appspot.com",
  messagingSenderId: "223193595180",
  appId: "1:223193595180:web:7060a49b953eea57bac089",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
/*const socrestemp={run:{10-2-2024:5,11-2-2024:8},water:{10-2-2024:5,11-2-2024:8}}
const checkmarkstemp={run:{10-2-2024:20,11-2-2024:30},water:{10-2-2024:5,11-2-2024:4}}
cosnt habitstemp=[{position:1,name:'read',Question:'did you read?',Description:'read man',NumRepetitions:1,Interval:1,Color:#fafafa}]
const habitCheckmarks={date:value,date2:value2}
const habitScore={date:value,date2:value2}*/
