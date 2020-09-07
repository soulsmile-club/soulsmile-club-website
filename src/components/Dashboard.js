import React, { useEffect } from 'react';
import firebase from './Firebase.js';
import ProfileCard from './ProfileCard.js';
import ProfileFeed from './ProfileFeed.js';
import Select from 'react-select';
import { Button } from 'react-bootstrap';
import '../css/Dashboard.css';
import { FaArrowCircleUp } from 'react-icons/fa';
import GiveSoulsmilesForm from './GiveSoulsmilesForm.js';
import Collapse from '@material-ui/core/Collapse';
import SmileageCard from './SmileageCard.js';

const options =[
    {value: 0, label: 'All Soulsmile Causes'},
    {value: 1, label: 'Education'},
    {value: 2, label: 'Global Health'},
    {value: 3, label: 'Racial Justice'},
    {value: 4, label: 'Humanitarian Aid'}
]

function Dashboard(props) {
    const [name, setName] = React.useState('');
    const [uid, setUid] = React.useState('');
    const [photoURL, setPhotoURL] = React.useState('');

    const [giveButtonClicked, setGiveButtonClicked] = React.useState(false);

    const [showOneTimeDonationButtons, setShowOneTimeDonationButtons] = React.useState(false);
    const [showSubscriptionButtons, setShowSubscriptionButtons] = React.useState(false);
    const [oneTimeAmount, setOneTimeAmount] = React.useState(5);
    const [subscriptionAmount, setSubscriptionAmount] = React.useState(5);
    const [oneTimeCause, setOneTimeCause] = React.useState(0);
    const [subscriptionCause, setSubscriptionCause] = React.useState(0);
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            console.log("auth state changed");
            if (user) {
                setName(user.displayName);
                setUid(user.uid);
                if (user.photoURL) {
                    setPhotoURL(user.photoURL + "?type=large");
                } else {
                    setPhotoURL(null);
                }
                writeNewUserData(user);
            } else {
                console.log('no user found');
                window.location.href = "/login";
            }
        });
    }, []);

    function writeNewUserData(user) {
        console.log("write new user data");
        firebase.database().ref('users/' + user.uid).once("value", snapshot => {
            if (snapshot.exists()) {
                console.log("user already exists in database");
            } else {
                console.log("create new db entry for " + user.uid);
                firebase.database().ref('users/' + user.uid).set({
                    name: user.displayName,
                    email: user.email,
                    profile_picture: user.photoURL,
                    donations: {},
                    subscriptions: {},
                    soulsmilesGiven: 0,
                    soulsmilesInWallet: 0,
                    isGoldSoulsmiler: false
                });
            }
        });
    }

    function handleAmountInputClicked () {
        if (document.getElementById("amountInput").value) {
            setOneTimeAmount(parseFloat(document.getElementById("amountInput").value).toFixed(2));
        }
    }

    function handleSubscriptionAmountInputClicked () {
        if (document.getElementById("subscriptionAmountInput").value) {
            setSubscriptionAmount(parseFloat(document.getElementById("subscriptionAmountInput").value).toFixed(2));
        }
    }

    function topFunction() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    function giveButtonOnClick() {
        setGiveButtonClicked(!giveButtonClicked);
    }
    
    function fadeInOverlay () {
        document.getElementsByClassName("overlay")[0].style.setProperty('display', 'block');
    }

    function fadeOutOverlay () {
        document.getElementsByClassName("overlay")[0].style.setProperty('display', 'none');
    }
    return (
        <>
        <div className="dashboard">
            <div className="overlay fade-in" onClick={fadeOutOverlay} ></div>
            <ProfileCard giveButtonOnClick={giveButtonOnClick}/>
            <Collapse in={giveButtonClicked}>
                <GiveSoulsmilesForm onTextClicked={fadeInOverlay} />
            </Collapse>
            <SmileageCard goToSmileage={props.goToSmileage}/>
            <ProfileFeed />
            <Button bsPrefix="topButton" onClick={topFunction}><FaArrowCircleUp id="returnIcon" /> Return to Top</Button>
        </div>



        <div className="donationButtonContainer">

        <Button onClick={() => setShowOneTimeDonationButtons(!showOneTimeDonationButtons)} bsPrefix="donateButton">Donate once to a Smileage Cause</Button>
        {showOneTimeDonationButtons ?
            <>
            <div>How much would you like to donate?</div>
            <div id="smile">**If you donate $5 or more a month, you can become a Soulsmile Club Gold Member!**</div>
            <div className="buttonGroup">
                <Button bsPrefix="amountButton" active={oneTimeAmount === 3} onClick={() => setOneTimeAmount(3)}>
                    $3
                </Button>
                <Button bsPrefix="amountButton" active={oneTimeAmount === 5} onClick={() => setOneTimeAmount(5)}>
                    $5
                </Button>
                <Button bsPrefix="amountButton" active={oneTimeAmount === 10} onClick={() => setOneTimeAmount(10)}>
                    $10
                </Button>
                    <input id="amountInput" onClick={handleAmountInputClicked} className="amountInput" type="number" step="1" placeholder="Custom Amount" onChange={e => {if (e.target.value && e.target.value >= 0.01) { setOneTimeAmount(parseFloat(e.target.value).toFixed(2))}}}></input>
            </div>

            <div>Which cause would you like to donate to?</div>
            <div id="smile">**100% of your donation will go directly to Soulsmile Club's curated and heavily researched organizations that we believe are doing the best work in these areas!**</div>
            <Select
                className="causeSelector"
                defaultValue={options[0]}
                options={options}
                onChange={(selected) => setOneTimeCause(selected.value)}
            />

            <a href={"/payment?type=single&amount=" + oneTimeAmount + "&cause=" + oneTimeCause}>
                <Button bsPrefix="amount submit">Donate ${oneTimeAmount}</Button>
            </a>
            </>
        : <></>}
        <Button onClick={() => setShowSubscriptionButtons(!showSubscriptionButtons)} bsPrefix="donateButton">Create a Smileage Program monthly donation!</Button>
        {showSubscriptionButtons ?
            <>
            <div>How much would you like to pledge each month?</div>
            <div id="smile">**If you donate $5 or more a month, you will be considered a Soulsmile Club Gold Member! You can cancel or change this subscription at any time.**</div>
            <div className="buttonGroup">
                <Button bsPrefix="amountButton" active={subscriptionAmount === 3} onClick={() => setSubscriptionAmount(3)}>
                    $3
                </Button>
                <Button bsPrefix="amountButton" active={subscriptionAmount === 5} onClick={() => setSubscriptionAmount(5)}>
                    $5
                </Button>
                <Button bsPrefix="amountButton" active={subscriptionAmount === 10} onClick={() => setSubscriptionAmount(10)}>
                    $10
                </Button>
                    <input id="subscriptionAmountInput" onClick={handleSubscriptionAmountInputClicked} className="amountInput" type="number" min="0.01" step="0.01" placeholder="Custom Amount" onChange={e => {if (e.target.value && e.target.value >= 0.01) { setSubscriptionAmount(parseFloat(e.target.value).toFixed(2))}}}></input>
            </div>


            <div>Which cause would you like to donate to?</div>
            <div id="smile">**100% of your donation will go directly to Soulsmile Club's curated and heavily researched organizations that we believe are doing the best work in these areas!**</div>
            <Select
                className="causeSelector"
                defaultValue={options[0]}
                options={options}
                onChange={(selected) => setSubscriptionCause(selected.value)}
            />

            <a href={"/payment?type=subscription&amount=" + subscriptionAmount + "&cause=" + subscriptionCause}>
                <Button bsPrefix="amount submit">Pledge ${subscriptionAmount}/month</Button>
            </a>
            </>
        : <></>}
        </div>
        </>
    );

}

export default Dashboard;
