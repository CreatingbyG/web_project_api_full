import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import logo from "../images/logo.svg.svg";

const Header = ({ isUserAuthorized, onSignOut, userEmail }) => {
  const location = useLocation();
  const currentPage = location.pathname;

  return (
    <div className="header">
      <img className="logo" src={logo} alt="logo around the US" />
      <div className="navigation">
        {!isUserAuthorized && (
          <>
          {currentPage === '/signin' && (
            <Link className="link" to='/signup'>Regístrate</Link>
          )}
          {currentPage === '/signup' && (
            <Link className="link" to='/signin'>Iniciar Sesión</Link>
          )}
          {(currentPage !== '/signin' && currentPage !== '/signup') && (
            <Link className="link" to='/signup'>Registrate</Link>
          )}
        </>
        )}
        {isUserAuthorized && currentPage === '/' && (
          <>
            <span className="user-email">{userEmail}</span>
            <Link className="link" onClick={onSignOut}>Cerrar sesión</Link>
          </>
        )}
      </div>
      <div className="line"></div>
    </div>
  );
};

export default Header;
