import React from 'react';
import LoaderLib from 'react-loader-spinner';
import styled from 'styled-components';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const LoaderWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = ({ isLoading = true }) => (
  <LoaderWrapper>
    {isLoading && (
      <LoaderLib type="Circles" color="#fd79a8" height={100} width={100} />
    )}
  </LoaderWrapper>
);
export default Loader;
