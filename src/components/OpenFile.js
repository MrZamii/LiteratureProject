import React, { useContext, useEffect, useCallback } from 'react';

export default ({ disabled, uploadFile, inputFileRef, selectedFile }) => {
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
