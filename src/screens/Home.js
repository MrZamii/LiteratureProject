import React, { useContext } from 'react';
import { Context as AuthContext } from '../components/contexts/AuthContext';
import HomeImg from '../assets/images/BooksImg.svg';
import { ReactComponent as WavesSVG } from '../assets/images/waves.svg';
import OpenFile from '../components/OpenFile';
import Navbar from '../components/Navbar';
const HomeScreen = () => {
  const { signInWithGoogle, isLoggedIn, user } = useContext(AuthContext);
  return (
    <>
      <Navbar />

      <div className="App">
        <div className="Home">
          <div className="leftContent">
            <div className="containerCenter">
              <h1>Comparte los archivos de tus clases</h1>
              <p>El conocimiento deber ser libre</p>
              <div className="buttons">
                {!isLoggedIn && (
                  <button id="logIn" onClick={signInWithGoogle}>
                    Iniciar Sesión
                  </button>
                )}
                <OpenFile disabled={!isLoggedIn} />
                <button disabled={!isLoggedIn} id="goFiles">
                  Ver archivos
                </button>
              </div>
            </div>
          </div>
          <div className="RightContent">
            <img src={HomeImg} alt="Icon" />
          </div>
        </div>
      </div>
      <WavesSVG
        style={{ position: 'fixed', bottom: '0', zIndex: -10, opacity: 0.3 }}
        width="100%"
      />
    </>
  );
};
export default HomeScreen;
