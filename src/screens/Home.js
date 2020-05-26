import React, { useContext } from 'react';
import { Context as AuthContext } from '../components/contexts/AuthContext';
import HomeImg from '../assets/images/BooksImg.svg';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { ReactComponent as WavesSVG } from '../assets/images/waves.svg';
import OpenFile from '../components/OpenFile';
import { db, firebase } from '../firebase.config';

import Navbar from '../components/Navbar';

const MySwal = withReactContent(Swal);
const HomeScreen = () => {
  const { signInWithGoogle, isLoggedIn, user, setLoading } = useContext(
    AuthContext
  );
  let [selectedFile, selectFile] = React.useState(null);
  const inputFileRef = React.useRef(null);
  const uploadFileToStorage = (file, selectFile) => {
    return new Promise(async resolve => {
      if (user.displayName !== '') {
        const storageRef = await firebase.storage().ref();
        const uploadDoc = await db.collection('uploads').doc();
        const uploadRef = await storageRef.child(
          `uploads/${uploadDoc.id}.${file.name.split('.').slice(-1)[0]}`
        );
        uploadRef.put(file).then(async snapshot => {
          const url = await uploadRef.getDownloadURL();
          await uploadDoc.set({
            url,
            user,
            createdAt: new Date().getTime(),
          });
          selectFile(null);
          resolve();
        });
      }
    });
  };
  const uploadFile = async e => {
    const fileGetted = e.target.files[0];
    if (fileGetted.size / 1024 / 1024 <= 5) {
      console.log('todo ok', fileGetted.size / 1024 / 1024);
      selectFile(fileGetted);
      setLoading(true);
      console.log(fileGetted, selectedFile);
      const result = await MySwal.fire({
        title: <span>Estás seguro de subír este archivo ?</span>,
        confirmButtonText: 'Si, estoy seguro!',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#e74c3c',
        showCancelButton: true,
        showConfirmButton: true,
        footer: 'Si lo envías, no habrá vuelta atrás',
        onOpen: () => {},
      });
      if (result.isConfirmed) {
        await uploadFileToStorage(fileGetted, selectFile);
        setLoading(false);

        return MySwal.fire({
          icon: 'success',
          title: 'Se ha enviado correctamente.',
          showConfirmButton: false,
          timer: 1200,
        });
      } else {
        setLoading(false);

        return MySwal.fire({
          icon: 'info',
          showConfirmButton: false,
          title: 'Se canceló el envío ',
          timer: 1200,
        });
      }
    }
  };

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
                <OpenFile
                  selectedFile={selectedFile}
                  inputFileRef={inputFileRef}
                  uploadFile={uploadFile}
                  uploadFileToStorage={uploadFileToStorage}
                  disabled={!isLoggedIn}
                />
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
