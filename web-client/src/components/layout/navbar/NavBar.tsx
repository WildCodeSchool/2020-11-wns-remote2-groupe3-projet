import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.scss';
import {
  FiHome,
  FiUsers,
  FiRotateCcw,
  FiMessageSquare,
  FiSettings,
  FiLogOut,
  FiCalendar,
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
    name: 'Calendar',
    link: '/calendar',
    icon: <FiCalendar />,
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
      <NavLink to="/interpretes">
        <img src={Logo} alt="logo" />
      </NavLink>
    </div>
    <ul className="Navbar-list">
      {Items.map((item) => {
        return (
          <li className="Navbar-list-itemBlock" key={item.name}>
            <div className="Navbar-list-item">
              <NavLink
                to={item.link}
                className="Navbar-list-item-icon"
                activeClassName="Navbar-list-item-selected"
              >
                {item.icon}
              </NavLink>
              <span className="Navbar-list-item-name">{item.name}</span>
            </div>
          </li>
        );
      })}
    </ul>
  </div>
);

export default NavBar;
