import React from 'react';
import './dashboard.scss';

const Dashboard = (props: { children: React.ReactNode }): JSX.Element => (
  <section className="dashboard">
    <div className="dashboard-top">Filters</div>
    <div className="dashboard-main">{props.children}</div>
  </section>
);

export default Dashboard;
