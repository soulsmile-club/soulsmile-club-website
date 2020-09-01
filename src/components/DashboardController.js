import React from 'react';
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

const useStyles = makeStyles({
    indicator: {
        background: '#eda1aa'
    }
});

function DashboardController() {
  const [value, setValue] = React.useState(0);

  function handleChange(event, val) {
    console.log(val);
    setValue(val);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  const classes = useStyles();

  return (
    <>
    <div className="dashboardBar row">
      <div className="dashboardLogo">
      <img
          alt="?"
          src={soulsmile}
          width="25"
          height="25"
          className="dashboardIcon"
        />
        <span className="dashboardSoulsmile">soul<span id="smile">smile</span> club</span>
      </div>
      <Tabs value={value} onChange={handleChange} centered classes={{indicator: classes.indicator}}>
        <Tab label="Home" style={{fontFamily: 'Montserrat'}} />
        <Tab label="Feed" style={{fontFamily: 'Montserrat'}} />
        <Tab label="Smileage" style={{fontFamily: 'Montserrat'}} />
      </Tabs>
    </div>
    <SwipeableViews
        index={value}
        onChangeIndex={handleChangeIndex}
    >
      <div>
        <Dashboard />
      </div>
      <div>
        Item Two
      </div>
      <div>
        Item Three
      </div>
    </SwipeableViews>
    </>
  );
}

export default DashboardController;
