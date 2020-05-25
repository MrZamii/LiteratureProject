import React, { useContext } from 'react';
import styled from 'styled-components';
import { ReactComponent as LogoutIcon } from '../assets/images/logoutIcon.svg';
import { Context as AuthContext } from './contexts/AuthContext';
const NavbarWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  div.navbarLeft,
  div.navbarRight {
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0px 10px;
  }
  button {
    outline: none !important;
    border: 0;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-weight: bold;
    opacity: 0.3;
    transition-duration: 0.3s;
    transition-timing-function: ease-in-out;
    font-size: 17px;
  }
  button:hover {
    transition-duration: 0.3s;
    transition-timing-function: ease-in-out;
    opacity: 0.7;
  }
`;
const Navbar = () => {
  const { signOut, isLoggedIn } = useContext(AuthContext);
  return (
    <NavbarWrapper>
      <div className="navbarLeft"></div>
      <div className="navbarRight">
        {isLoggedIn && (
          <button className="navbar-item" onClick={signOut}>
            <LogoutIcon width={20} height={20} style={{ marginRight: 10 }} />
            Cerrar sesión
          </button>
        )}
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;
