import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import { MenuAnimations } from '../../animations/menu';

const Menu = (): JSX.Element => {
  useEffect(() => {
    MenuAnimations();
  }, []);

  const location = useLocation();
  const ButtonChange = () => {
    const location = useLocation();
    if (location.pathname === '/login') {
      return (
        <div className="menu-signup-block">
          <span className="menu-signup-text">Don/t have an account yet ?</span>
          <NavLink to="/signup">
            <button className="menu-signup-button">Sign Up</button>
          </NavLink>
        </div>
      );
    } else if (location.pathname === '/signup') {
      return (
        <div className="menu-signup-block">
          <span className="menu-signup-text">Already have an account ?</span>
          <NavLink to="/login">
            <button className="menu-signup-button">Sign In</button>
          </NavLink>
        </div>
      );
    }
  };

  return (
    <ul className="menu">
      <li className="menu-logo">
        <NavLink to="/">
          <img src={Logo} alt="logo" />
        </NavLink>
      </li>
      <li className="menu-signup">{ButtonChange()}</li>
    </ul>
  );
};

export default Menu;
