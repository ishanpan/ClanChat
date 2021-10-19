// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCjMSqcyCOfvG9yH5yKoWqJLXDGb_bUN5A",
  authDomain: "chatapp-8ce30.firebaseapp.com",
  projectId: "chatapp-8ce30",
  storageBucket: "chatapp-8ce30.appspot.com",
  messagingSenderId: "1075205672317",
  appId: "1:1075205672317:web:b18b28590e6bd4a3aad014",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };

/*1. set firestore to send data to firestore. start with nickname -> Done
2. Design UI For Chatting -> Done
3. Design DB structure  -> Done
4. Implement sending text -> Done
and retriving texts. 
Dyanmically rerender the list -> Done

additonal features i can work on
 set realtime database with offline support -> real time done
Adding text search

NOTES-> Encrypted chats would be fun.
        One on One or Group??? Will have to think this.
        Could use home UI for welcoming user  -> Done
        Settings icon for changing password.
		*/
