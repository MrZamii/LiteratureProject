import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyBQUWl1U4c8e9QtMwsrPk4vxrkbn4dngtQ',
  authDomain: 'proyectoliteratura-72052.firebaseapp.com',
  databaseURL: 'https://proyectoliteratura-72052.firebaseio.com',
  projectId: 'proyectoliteratura-72052',
  storageBucket: 'proyectoliteratura-72052.appspot.com',
  messagingSenderId: '1005990284321',
  appId: '1:1005990284321:web:b57a6383beb291bb22a760',
  measurementId: 'G-R67DV07DX4',
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebaseApp.firestore();
export { firebaseApp as firebase, database as db };
