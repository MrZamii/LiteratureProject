import React, { Component, useContext } from 'react';
import HomeImg from './assets/images/BooksImg.svg';
import './assets/styles/App.css';
import {
  Provider as AuthProvider,
  Context,
} from './components/contexts/AuthContext';
const App = () => {
  // const { signInWithGoogle } = useContext(Context);
  // console.log();
  return (
    <AuthProvider>
      <Context.Consumer>
        {({ signInWithGoogle }) => (
          <div className="App">
            <div className="Home">
              <div className="leftContent">
                <h1>Comparte los archivos de tus clases</h1>
                <p>El conocimiento deber ser libre</p>
                <div className="buttons">
                  <button id="logIn" onClick={signInWithGoogle}>
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
        )}
      </Context.Consumer>
    </AuthProvider>
  );
};

export default App;
