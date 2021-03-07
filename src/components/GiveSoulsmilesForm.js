import React, { useEffect } from 'react';
import firebase from './Firebase.js';
import '../css/GiveSoulsmilesForm.css';
import { Button } from 'react-bootstrap';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { BiWorld } from 'react-icons/bi';
import { FaLock } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    minWidth: 120,
    fontFamily: 'Montserrat',
    margin: '0 20px',
    fontSize: '20px',
    color: '#eda1aa'
  },
  selectPublicEmpty: {
    minWidth: 40,
    margin: '0 10px',
    color: '#444444'
  },
  menuItemStyle: {
    fontFamily: 'Montserrat',
    fontSize: '20px',
    color: '#eda1aa'
  },
  publicMenuItemStyle: {
    color: '#444444'
  }
}));

const causes =[
    {value: 0, label: 'All Soulsmile Causes'},
    {value: 1, label: 'Education'},
    {value: 2, label: 'Global Health'},
    {value: 3, label: 'Racial Justice'},
    {value: 4, label: 'Humanitarian Aid'}
]

function GiveSoulsmilesForm(props) {
    const classes = useStyles();

    // give form data
    const [giveAmount, setGiveAmount] = React.useState(50);
    const [giveCause, setGiveCause] = React.useState(0);
    const [publicPost, setPublicPost] = React.useState(true);
    const [giveMessage, setGiveMessage] = React.useState("");

    // user data
    const [name, setName] = React.useState('');
    const [uid, setUid] = React.useState('');
    const [profilePic, setProfilePic] = React.useState('');
    const [soulsmilesInWallet, setSoulsmilesInWallet] = React.useState(0);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            console.log("auth state changed");
            if (user) {
                setName(user.displayName);
                setUid(user.uid);
                setProfilePic(user.photoURL);
                firebase.database().ref('users/' + user.uid).once("value", snapshot => {
                    if (snapshot.exists()) {
                        setSoulsmilesInWallet(snapshot.val().soulsmilesInWallet);
                    } else {
                        console.log("user is not in database!");
                    }
                });
            } else {
                console.log('no user found');
                window.location.href = "/login";
            }
        });
    }, []);

    function timeSince(date) {

      var seconds = Math.floor((new Date() - date) / 1000);

      var interval = seconds / 31536000;

      if (interval > 1) {
        return Math.floor(interval) + "y";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + "mon";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + "d";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + "h";
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + "m";
      }
      return Math.floor(seconds) + "s";
    }

    function submitGiveForm() {
      if (soulsmilesInWallet >= giveAmount) {
        // if there are enough soulsmiles in wallet, create giving post in database and update profile stats
        var donationData = {
          amount: giveAmount,
          cause: causes[giveCause].label,
          timestamp: Date.now(),
          author: name,
          authorPic: profilePic,
          heartCount: 0,
          uid: uid
        }

        var newDonationKey = firebase.database().ref().child('donations').push().key;

        var updates = {};
        updates['/users-donations/' + uid + '/donations/' + newDonationKey] = donationData;
        updates['/donations/' + newDonationKey] = donationData;

        firebase.database().ref().update(updates, function (error) {
            if (error) {
                console.log(error);
            } else {
                firebase.database().ref('/users/' + uid).transaction(function (userData) {
                    if (userData) {
                        userData.soulsmilesGiven += giveAmount;
                        userData.soulsmilesInWallet -= giveAmount;
                    } else {
                        console.log("no user found in database!");
                    }
                    return userData;
                }, function (error) {
                    console.log('updated database');
                });
            }
        });
      } else {
        // otherwise, redirect to PayPal to complete payment
        window.location.href = "/payment?type=single&amount=" + giveAmount + "&cause=" + giveCause;
      }
    }

    return (
        <div className="box arrow-top">                    
            <div className="giveSoulsmilesContainer">
              <div className="giveAmountAndCause">
                <div id="giveSoulsmiles"><input className="giveAmount" type="number" min="0.1" step="0.1" placeholder="50" onChange={e => {if (e.target.value && e.target.value >= 0.01) { setGiveAmount(Math.round(parseFloat(e.target.value) * 10) / 10)} else if (!e.target.value) { setGiveAmount(50) } else { setGiveAmount(0)}}}></input>
                soulsmiles</div><div id="toCause">
                <Select
                  value={giveCause}
                  onChange={(e) => setGiveCause(e.target.value)}
                  displayEmpty
                  className={classes.selectEmpty}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  {causes.map((cause, index) => (
                    <MenuItem className={classes.menuItemStyle} key={cause.value} value={cause.value}>{cause.label}</MenuItem>
                  ))}
                </Select></div>
              </div>
              <hr className="giveBorder"/>
              <textarea className="writeMessageText" onClick={props.onTextClicked} placeholder="What inspired you to give today?"></textarea>
              <hr className="messageBorder"/>
              <div className="buttonRow">
                <Select
                  value={publicPost}
                  onChange={(e) => setPublicPost(e.target.value)}
                  displayEmpty
                  className={classes.selectPublicEmpty}
                  inputProps={{ 'aria-label': 'Without label' }}
                  disableUnderline
                >
                  <MenuItem className={classes.publicMenuItemStyle} value={true}><BiWorld/></MenuItem>
                  <MenuItem className={classes.publicMenuItemStyle} value={false}><FaLock/></MenuItem>
                </Select>
                <Button bsPrefix="giveFormButton" onClick={submitGiveForm}>Give {giveAmount} soulsmiles</Button>
              </div>
            </div>

        </div>
    );
  
}

export default GiveSoulsmilesForm;
