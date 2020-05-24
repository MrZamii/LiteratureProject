import React, { Component } from "react";
import firebase from "firebase";
import HomeImg from "./BooksImg.svg";
import "./App.css";

class App extends Component() {
  constructor() {
    super();
    this.state = {
      user: null,
      pictures: [],
    };

    this.handleAuth = this.handleAuth.bind(this);
    // this.handleLogout = this.handleLogout.bind(this);
    // this.renderLoginButton = this.renderLoginButton.bind(this);
    // this.handleUpload = this.handleUpload.bind(this);
  }
  handleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => console.log(`${result.user.email} ha iniciado sesión`))
      .catch((error) => console.log(`Error ${error.code}: ${error.message}`));
  }

  render() {
    return (
      <div className="App">
        <div className="Home">
          <div className="leftContent">
            <h1>Comparte los archivos de tus clases</h1>
            <p>El conocimiento deber ser libre</p>
            <div className="buttons">
              <button onClick={this.handleAuth} id="logIn">
                Iniciar Sesión
              </button>
              <button id="upLoadFile">
                <input type="file" />
              </button>
              <button id="goFiles">Ver archivos</button>
            </div>
          </div>
          <div className="RightContent">
            <img src={HomeImg} alt="Icon" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
