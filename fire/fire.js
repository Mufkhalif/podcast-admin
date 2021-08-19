import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBZ4IMKCDdnML7k3kMvotjXqDvmrrR5tIg",
  authDomain: "podcastapp-14a25.firebaseapp.com",
  projectId: "podcastapp-14a25",
  storageBucket: "podcastapp-14a25.appspot.com",
  messagingSenderId: "913585463865",
  appId: "1:913585463865:web:4fccb894a1d028e87f63e8",
};
// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const store = firebase.firestore();
export const storage = firebase.storage();
export const fire = firebase;
