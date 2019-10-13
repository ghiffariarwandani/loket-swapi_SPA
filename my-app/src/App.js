import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './scenes/home'
import Detail from './scenes/detail'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path ="/detail/:id" component={ Detail } />
        </Switch>
     </Router>
    </div>
  );
}

export default App;
