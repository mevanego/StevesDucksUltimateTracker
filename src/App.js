import React, { Component } from 'react'
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Navigation from './components/Navigation';

import Players from './components/Players';
import Team from './components/Team';
import Games from './components/Games';


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
