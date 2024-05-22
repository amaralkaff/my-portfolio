// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTe6SqKhbJm9GKokz0ECme-S8egwvI9Ds",
  authDomain: "test1-ba28d.firebaseapp.com",
  projectId: "test1-ba28d",
  storageBucket: "test1-ba28d.appspot.com",
  messagingSenderId: "1063595510246",
  appId: "1:1063595510246:web:52a2eb74f8aebd0187ee27",
  measurementId: "G-MLZK6HP5KR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Providers
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, googleProvider, githubProvider };
