// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBN2JUMv76a1L1imkX8Yq134W8ZGDWoniY',
  authDomain: 'chatter-app-359cf.firebaseapp.com',
  projectId: 'chatter-app-359cf',
  storageBucket: 'chatter-app-359cf.appspot.com',
  messagingSenderId: '32822540935',
  appId: '1:32822540935:web:f48fc487ad93fae07b9622',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)

//emulator 
// connectAuthEmulator(auth,'http://127.0.0.1:9099', {disableWarnings: true})
 
export {auth}


