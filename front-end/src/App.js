import React from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import rockGlass from './images/rockGlass.svg';

function App() {
  return (
    <div>
      <Switch>
        <Route path='/login' component={ <div></div> } />
      </Switch>
    </div>
  );
}

export default App;
