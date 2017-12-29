import firebase from 'firebase';

let config = {
    apiKey: "AIzaSyBgbY7goyrp1rXIbXe60o-_6UcbaQAPYvM",
    authDomain: "fut-stats.firebaseapp.com",
    databaseURL: "https://fut-stats.firebaseio.com",
    projectId: "fut-stats",
    storageBucket: "fut-stats.appspot.com",
    messagingSenderId: "1088259858709"
  };

firebase.initializeApp(config);
export default firebase;