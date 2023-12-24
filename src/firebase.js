// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyOMHq2dqeDzLBfZ36gxL2Q2ciVP-kC2o",
  authDomain: "otpverify-30457.firebaseapp.com",
  projectId: "otpverify-30457",
  storageBucket: "otpverify-30457.appspot.com",
  messagingSenderId: "267324786498",
  appId: "1:267324786498:web:dfdf2885ff7f1b06a9aadb",
  measurementId: "G-9M4KHKXCDK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app as firebase };