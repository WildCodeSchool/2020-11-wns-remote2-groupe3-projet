import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Interpretes from './pages/Interpretes/Interpretes';
import Dashboard from './components/layout/dashboard/Dashboard';
import Overview from './pages/Overview';
import History from './pages/History';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import SignUp from './pages/signup/SignUp';
import Login from './pages/login/Login';
import './styles/App.scss';

const App = (): JSX.Element => (
  <div className="App">
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Dashboard>
        <Route path="/overview" component={Overview} />
        <Route path="/interpretes" component={Interpretes} />
        <Route path="/history" component={History} />
        <Route path="/messages" component={Messages} />
        <Route path="/settings" component={Settings} />
      </Dashboard>
    </Switch>
  </div>
);

export default App;
