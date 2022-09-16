// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// import "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAA9FLclNz-DnIs-o0If9oN2hq2tWUStIg",
  authDomain: "community-pantry-a18e1.firebaseapp.com",
  projectId: "community-pantry-a18e1",
  storageBucket: "community-pantry-a18e1.appspot.com",
  messagingSenderId: "930035961351",
  appId: "1:930035961351:web:28faf9fc380fb6414ee4a2",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
