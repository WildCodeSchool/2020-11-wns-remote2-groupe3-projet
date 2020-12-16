import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Interpretes from './pages/Interpretes/Interpretes';
import NavBar from './components/layout/navbar/NavBar';
import Dashboard from './components/layout/dashboard/Dashboard';
import Overview from './pages/Interpretes/Interpretes';
import History from './pages/History';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import Logout from './pages/Logout';
import './styles/App.scss';

const App = (): JSX.Element => (
  <div className="App">
    <NavBar />
    <Dashboard>
      <Switch>
        <Route exact path="/overview" component={Overview} />
        <Route exact path="/interpretes" component={Interpretes} />
        <Route exact path="/history" component={History} />
        <Route exact path="/messages" component={Messages} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/logout" component={Logout} />
      </Switch>
    </Dashboard>
  </div>
);

export default App;
