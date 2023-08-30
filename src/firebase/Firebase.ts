// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBN2JUMv76a1L1imkX8Yq134W8ZGDWoniY',
  authDomain: 'chatter-app-359cf.firebaseapp.com',
  projectId: 'chatter-app-359cf',
  storageBucket: 'chatter-app-359cf.appspot.com',
  messagingSenderId: '32822540935',
  appId: '1:32822540935:web:e6538a82e622e5df7b9622',
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

// Allow read/write access on all documents to any user signed in to the application
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if request.auth != null;
//     }
//   }
// }
