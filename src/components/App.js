import React from 'react';
import '../css/App.css';
import SoulsmileNavbar from './SoulsmileNavbar';
import SoulsmileFooter from './SoulsmileFooter';
import { Router } from 'react-router-dom';
import history from '../services/history';
import Routes from '../routes';
import ReactGA from 'react-ga';

const trackingId = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID; 
ReactGA.initialize(trackingId);

history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

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
