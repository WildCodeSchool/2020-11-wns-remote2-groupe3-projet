import React from 'react';
import './dashboard.scss';
import Navbar from '../navbar/NavBar';

const Dashboard = (props: { children: React.ReactNode }): JSX.Element => (
  <section className="dashboard">
    <Navbar />
    <div className="dashboard-main">{props.children}</div>
  </section>
);

export default Dashboard;
