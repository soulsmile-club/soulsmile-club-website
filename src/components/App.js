import React from 'react';
import '../css/App.css';
import SoulsmileNavbar from './SoulsmileNavbar';
import SoulsmileFooter from './SoulsmileFooter';
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
      <div className="content">
      <Router history={history}>
        <Routes />
      </Router>
      </div>
      <SoulsmileFooter />
    </div>
    </>
  );
}

export default App;
