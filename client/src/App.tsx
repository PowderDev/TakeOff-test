import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Main from './pages/Main';

function App() {
  return (
    <Switch>
      <Route path='/' component={Main} exact/>
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Redirect to='/'/> 
    </Switch>
  );
}

export default App;
