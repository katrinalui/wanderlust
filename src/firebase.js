import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCsyO5uIMCzWa4BDfL_wP8yiDrqS9Z4qrE",
  authDomain: "wanderlust-travel.firebaseapp.com",
  databaseURL: "https://wanderlust-travel.firebaseio.com",
  projectId: "wanderlust-travel",
  storageBucket: "wanderlust-travel.appspot.com",
  messagingSenderId: "940837448148"
};

const firebaseRef = () => firebase.initializeApp(firebaseConfig);

export default firebaseRef;
