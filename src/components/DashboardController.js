import React, { useEffect } from 'react'; 
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import soulsmile from '../images/soulsmile-48.png';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Dashboard from './Dashboard';
import '../css/DashboardController.css';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from 'react-bootstrap';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { FaArrowCircleUp } from 'react-icons/fa';
import firebase from './Firebase.js';
import GlobalFeed from './GlobalFeed.js';
import EarningFeed from './EarningFeed.js';


const useStyles = makeStyles({
    indicator: {
        background: '#eda1aa'
    }
});

function DashboardController() {
  const [value, setValue] = React.useState(0);

  useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            console.log("user logged in");
          } else {
            console.log("no user logged in");
            window.location.href="/login";
          }
        });
  }, []);

  function handleChange(event, val) {
    console.log(val);
    setValue(val);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  function signOut() {
      firebase.auth().signOut().then(function() {
          console.log("Sign out was successful!");
          window.location.href="/login";
      }).catch(function(error) {
          console.log(error);
      });
  }

  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  const classes = useStyles();

  return (
    <>
    <div className="dashboardBar">
      <a href="/" className="dashboardLogo">
      <img
          alt="?"
          src={soulsmile}
          width="25"
          height="25"
          className="dashboardIcon"
        />
        <span className="dashboardSoulsmile">soul<span id="smile">smile</span> club</span>
      </a>
      <Tabs value={value} onChange={handleChange} centered classes={{indicator: classes.indicator}}>
        <Tab label="Me" style={{fontFamily: 'Montserrat'}} />
        <Tab label="Community" style={{fontFamily: 'Montserrat'}} />
        <Tab label="Earnings" style={{fontFamily: 'Montserrat'}} />
        <Tab label="Smileage" style={{fontFamily: 'Montserrat'}} />
      </Tabs>
      <a href="#" className="logoutButton" onClick={signOut}>
        <RiLogoutBoxRLine size={25} />
      </a>
    </div>
    {value === 0 ?
      <div>
        <Dashboard />
      </div>
      : value === 1 ?
      <div id="globalCommunity">
        <div className="dashboard">
          <GlobalFeed />
          <Button bsPrefix="topButton" onClick={topFunction}><FaArrowCircleUp id="returnIcon" /> Return to Top</Button>
        </div>
      </div>
      : value === 2 ?
      <div id="earningHistory">
        <div className="dashboard">
          <EarningFeed />
          <Button bsPrefix="topButton" onClick={topFunction}><FaArrowCircleUp id="returnIcon" /> Return to Top</Button>
        </div>
      </div>
      : value === 3 ?
      <div>
        Smileage
      </div> :
      ""}
    </>
  );
}

export default DashboardController;
