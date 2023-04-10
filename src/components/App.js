import React, { Component } from 'react'
import './App.css';
import {HashRouter as Router, Route, Routes} from 'react-router-dom'

import Navigation from './Navigation';

import Players from './Players';
import Team from './Team';
import Games from './Games';


function App() {
  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
          <Navigation />
        </header>
      </div>
      <Routes>
        <Route path='/players' element={<Players />} />
        <Route path='/team' element={<Team />} />
        <Route path='/games' element={<Games />}/>
      </Routes>
    </Router>
  );
}

export default App;
