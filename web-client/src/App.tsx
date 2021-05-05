// TODO: fix setISloggedIn value form child components

import React, { useContext, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Interpretes from './pages/Interpretes/Interpretes';
import Dashboard from './components/layout/dashboard/Dashboard';
import Overview from './pages/Overview';
import Calendar from './pages/Calendar/Calendar';
import History from './pages/History';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import SignUp from './pages/signup/SignUp';
import Login from './pages/login/Login';
import './styles/App.scss';
import { LoginContext } from './Context/LoginContext';
import ProtectedRoute from './components/routes/ProtectedRoute';

const App = (): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login" component={Login}>
            {isLoggedIn === false ? <Login /> : <Redirect to="/interpretes" />}
          </Route>
          <Route path="/signup" component={SignUp}>
            {isLoggedIn === false ? <SignUp /> : <Redirect to="/interpretes" />}
          </Route>

          <Dashboard>
            <ProtectedRoute
              path="/overview"
              component={Overview}
              isLoggedIn={isLoggedIn}
              exact
            />
            <ProtectedRoute
              component={Interpretes}
              path="/interpretes"
              isLoggedIn={isLoggedIn}
              exact
            />
            <ProtectedRoute
              path="/history"
              component={History}
              isLoggedIn={isLoggedIn}
              exact
            />
            <ProtectedRoute
              path="/history"
              component={Calendar}
              isLoggedIn={isLoggedIn}
              exact
            />
            <ProtectedRoute
              path="/messages"
              component={Messages}
              isLoggedIn={isLoggedIn}
              exact
            />
            <ProtectedRoute
              path="/settings"
              component={Settings}
              isLoggedIn={isLoggedIn}
              exact
            />
          </Dashboard>
        </Switch>
      </div>
    </LoginContext.Provider>
  );
};

export default App;
