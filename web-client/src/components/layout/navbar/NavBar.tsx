import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss';
import {
  FiHome,
  FiUsers,
  FiRotateCcw,
  FiMessageSquare,
  FiSettings,
  FiLogOut,
} from 'react-icons/fi';
import Logo from './logo.png';

const Items = [
  {
    name: 'Overview',
    link: '/overview',
    icon: <FiHome />,
  },
  {
    name: 'Interpretes',
    link: '/interpretes',
    icon: <FiUsers />,
  },
  {
    name: 'History',
    link: '/history',
    icon: <FiRotateCcw />,
  },
  {
    name: 'Messages',
    link: '/messages',
    icon: <FiMessageSquare />,
  },
  {
    name: 'Settings',
    link: '/settings',
    icon: <FiSettings />,
  },
  {
    name: 'Logout',
    link: '/logout',
    icon: <FiLogOut />,
  },
];
// let navbar = useRef();

const NavBar = (): JSX.Element => (
  <div className="Navbar">
    <div className="Navbar-logo">
      <img src={Logo} alt="logo" />
    </div>
    <ul className="Navbar-list">
      {Items.map((item) => {
        return (
          <li className="Navbar-list-item" key={item.name}>
            <Link to={item.link}>{item.icon}</Link>
            <Link to={item.link} className="Navbar-list-item-name">
              {item.name}
            </Link>
          </li>
        );
      })}
    </ul>
  </div>
);

export default NavBar;
