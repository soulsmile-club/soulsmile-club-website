import React from 'react';
import '../css/App.css';
import SoulsmileNavbar from './SoulsmileNavbar';
import { Router } from 'react-router-dom';
import history from '../services/history';
import Routes from '../routes';

function App() {
  return (
    <>
    <style type="text/css">
      {`
      .btn-round {
        border-radius: 50px;
        margin: 10px;
        color: #444444;
      }
      .btn-round:hover {
        background-color: #444444;
      }
      `}
    </style>
    <div className="App">
      <SoulsmileNavbar />
      <Router history={history}>
        <Routes />
      </Router>
    </div>
    </>
  );
}

export default App;
