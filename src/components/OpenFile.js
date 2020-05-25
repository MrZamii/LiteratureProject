import React, { useContext } from 'react';
import { Context as AuthContext } from './contexts/AuthContext';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { db, firebase } from '../firebase.config';

const MySwal = withReactContent(Swal);

export default ({ disabled }) => {
  const { user } = useContext(AuthContext);
  let [selectedFile, selectFile] = React.useState(null);
  const inputFileRef = React.useRef(null);
  const uploadFileToStorage = file => {
    return new Promise(resolve => {
      if (user.displayName !== '') {
        const storageRef = firebase.storage().ref();

        const uploadDoc = db.collection('uploads').doc();
        console.log(uploadDoc.id, file, typeof file);
        const uploadRef = storageRef.child(
          `uploads/${uploadDoc}.${file.name.split('.')[-1]}`
        );
        uploadRef.put(file).then(snapshot => {
          console.log(snapshot);
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
      console.log(fileGetted, selectedFile);
      const result = await MySwal.fire({
        title: <span>Estás seguro de subír este archivo ?</span>,
        confirmButtonText: 'Si, estoy seguro!',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#e74c3c',
        showCancelButton: true,
        showConfirmButton: true,
        footer: 'Si lo envías, no habrá vuelta atrás',
        onOpen: () => {
          // `MySwal` is a subclass of `Swal`
          //   with all the same instance & static methods
        },
      });
      if (result.isConfirmed) {
        await uploadFileToStorage(fileGetted);
        return MySwal.fire({
          icon: 'success',
          title: 'Se ha enviado correctamente.',
          showConfirmButton: false,
          timer: 1200,
        });
      } else {
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
      <input
        disabled={disabled}
        ref={inputFileRef}
        type="file"
        onChange={uploadFile}
        style={{ display: 'none' }}
      />

      <button
        disabled={disabled}
        onClick={() => inputFileRef.current.click()}
        id="upLoadFile"
      >
        {selectedFile !== null ? <> {selectedFile.name}</> : <>Subir archivo</>}
      </button>
    </>
  );
};
