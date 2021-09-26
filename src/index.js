import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SwitchBox from './components/switchBox/SwitchBox';
import PaintHouse from './components/paintHouse/PaintHouse';
import InfLoops from './components/infLoops/InfLoops';
import Ludo from './components/ludo/ludo';
import LockPick from './components/lockpick/LockPick';
import WordSearch from './components/wordSearch/WordSearch';
import BlockPuzzle from './components/blockPuzzle/BlockPuzzle';
import InvKin from './components/invkin/invkin';
import BezCrv from './components/bezcrv/bezcrv';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component = {App}/>
          <Route exact path='/switchBox' component = {SwitchBox}/>
          <Route exact path='/paintHouse' component = {PaintHouse}/>
          <Route exact path='/infLoops' component = {InfLoops}/>
          <Route exact path='/ludo' component = {Ludo}/>
          <Route exact path='/lockpick' component = {LockPick}/>
          <Route exact path='/wordSearch' component = {WordSearch}/>
          <Route exact path='/blockPuzzle' component = {BlockPuzzle}/>
          <Route exact path='/invKin' component = {InvKin}/>
          <Route exact path='/bezCrv' component = {BezCrv}/>
        </Switch>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
