import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

firebase.initializeApp({
  apiKey: "AIzaSyBQUWl1U4c8e9QtMwsrPk4vxrkbn4dngtQ",
  authDomain: "proyectoliteratura-72052.firebaseapp.com",
  databaseURL: "https://proyectoliteratura-72052.firebaseio.com",
  projectId: "proyectoliteratura-72052",
  storageBucket: "proyectoliteratura-72052.appspot.com",
  messagingSenderId: "1005990284321",
  appId: "1:1005990284321:web:b57a6383beb291bb22a760",
  measurementId: "G-R67DV07DX4",
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
