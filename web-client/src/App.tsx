import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Interpretes from './pages/Interpretes';
import NavBar from './components/layout/NavBar';
import './styles/App.scss';
import Overview from './pages/Overview';
import History from './pages/History';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import Logout from './pages/Logout';

const App = (): JSX.Element => (
  <div className="App">
    <NavBar />
    <Switch>
      <Route exact path="/overview" component={Overview} />
      <Route exact path="/interpretes" component={Interpretes} />
      <Route exact path="/history" component={History} />
      <Route exact path="/messages" component={Messages} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/logout" component={Logout} />
    </Switch>
  </div>
);

export default App;
