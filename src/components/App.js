import React, { useEffect } from 'react';
import '../css/App.css';
import { Router } from 'react-router-dom';
import history from '../services/history';
import Routes from '../routes';
import ReactGA from 'react-ga';
import { Helmet } from "react-helmet";


const trackingId = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID; 
ReactGA.initialize(trackingId);

history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

function App() {

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, [])

  return (
    <>
      <Helmet>
        <title>Soulsmile Club</title>
        <meta name="description" content="Donate without spending extra when shopping online using the Soulsmile Club browser extension." />
      </Helmet>
      <Router history={history}>
        <Routes />
      </Router>
    </>
  );
}

export default App;
