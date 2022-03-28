import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import InvKin from './components/invkin/invkin';
import BezCrv from './components/bezcrv/bezcrv';
import RopeSim from './components/ropesim/ropesim';
import ClothSim from './components/clothsim/clothsim';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="App">
        {window.location.pathname!="/"?(
          <a className="home" href="/">{"<"} Home</a>
        ):null}
        <Switch>
          <Route exact path='/' component = {App}/>
          <Route exact path='/invKin' component = {InvKin}/>
          <Route exact path='/bezCrv' component = {BezCrv}/>
          <Route exact path='/ropeSim' component = {RopeSim}/>
          <Route exact path='/clothSim' component = {ClothSim}/>
        </Switch>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
