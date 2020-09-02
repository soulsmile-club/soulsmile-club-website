import React, { useEffect } from 'react';
import firebase from './Firebase.js';
import '../css/ProfileCard.css';
import { BiDonateHeart } from 'react-icons/bi';
import { IoMdSend } from 'react-icons/io';
import { Button } from 'react-bootstrap';
import { BiSmile } from 'react-icons/bi';
import genericProfilePic from '../images/genericProfilePic.png';

function ProfileCard() {
    const [name, setName] = React.useState('');
    const [profilePic, setProfilePic] = React.useState('');
    const [daysInSoulsmile, setDaysInSoulsmile] = React.useState(0);
    const [soulsmilesGiven, setSoulsmilesGiven] = React.useState(0);
    const [soulsmilesInWallet, setSoulsmilesInWallet] = React.useState(0);
    const [isGoldSoulsmiler, setIsGoldSoulsmiler] = React.useState(true);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            console.log("auth state changed");
            if (user) {
                setName(user.displayName);
                setProfilePic(user.photoURL);
                setDaysInSoulsmile(Math.round((Date.now() - new Date(user.metadata.creationTime).getTime()) / (1000 * 3600 * 24)));
                firebase.database().ref('users/' + user.uid).once("value", snapshot => {
                    if (snapshot.exists()) {
                        setSoulsmilesGiven(snapshot.val().soulsmilesGiven);
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

    return (
        <div className="profile">
            <div id="picAndDetailsContainer">
                {profilePic ? <img className="profilePhoto" src={profilePic} alt={name}></img> : <img className="profilePhoto noProfilePic" src={genericProfilePic} alt={name}></img> }
                <div id="detailsContainer">
                    <div id="profileName">{name}</div>
                    <div id="profileStats">
                        <div className="stat">
                            <div className="statNum">{daysInSoulsmile}</div>
                            <div className="statDesc">Days in Soulsmile Club</div>
                        </div>
                        <div className="stat">
                            <div className="statNum" style={{color: "#70A36A"}}>{soulsmilesGiven}</div>
                            <div className="statDesc">Soulsmiles Given</div>
                        </div>
                        <div className="stat">
                            <div className="statNum">{soulsmilesInWallet}</div>
                            <div className="statDesc">Soulsmiles in Wallet</div>
                        </div>
                    </div>
                    <div id="giveButton">
                        <Button bsPrefix="donateButton">Give Soulsmiles <IoMdSend id="giveIcon" size={18} /></Button>
                    </div>
                </div>
            </div>
        </div>
    );
  
}

export default ProfileCard;
