// TODO : fix props types
/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
  isLoggedIn: boolean;
}> = ({ isLoggedIn, path, component, exact }) => {
  return isLoggedIn ? (
    <Route path={path} exact={exact} component={component} />
  ) : (
    <Redirect to="/login" />
  );
};
export default ProtectedRoute;