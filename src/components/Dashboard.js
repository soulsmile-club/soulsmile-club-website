import React, { useEffect } from 'react';
import firebase from './Firebase.js';
import Select from 'react-select';
import { Button } from 'react-bootstrap';
import '../css/Dashboard.css';

const options =[
    {value: 0, label: 'All Soulsmile Causes'},
    {value: 1, label: 'Education'},
    {value: 2, label: 'Global Health'},
    {value: 3, label: 'Racial Justice'},
    {value: 4, label: 'Humanitarian Aid'}
]

function Dashboard() {
    const [name, setName] = React.useState('');
    const [uid, setUid] = React.useState('');
    const [photoURL, setPhotoURL] = React.useState('');

    const [showOneTimeDonationButtons, setShowOneTimeDonationButtons] = React.useState(false);
    const [showSubscriptionButtons, setShowSubscriptionButtons] = React.useState(false);
    const [oneTimeAmount, setOneTimeAmount] = React.useState(5);
    const [subscriptionAmount, setSubscriptionAmount] = React.useState(5);
    const [oneTimeCause, setOneTimeCause] = React.useState(0);
    const [subscriptionCause, setSubscriptionCause] = React.useState(0);

    const [donationHistory, setDonationHistory] = React.useState([]);
    const [globalDonationHistory, setGlobalDonationHistory] = React.useState([]);

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

                firebase.database().ref('/users-donations/' + user.uid + '/donations').once('value').then(function(snapshot) {
                  if (snapshot.exists()) {
                    setDonationHistory(Object.values(snapshot.val()).sort(function (a, b) {
                        return ((a.timestamp > b.timestamp) ? -1 : (a.timestamp < b.timestamp) ? 1 : 0);
                    }));
                  } else {
                    setDonationHistory({});
                  }
                  if (!snapshot.val()) {
                    setDonationHistory({});
                  }
                });

                firebase.database().ref('/donations').once('value').then(function (snapshot) {
                    if (snapshot.exists()) {
                        setGlobalDonationHistory(Object.values(snapshot.val()).sort(function (a, b) {
                            return ((a.timestamp > b.timestamp) ? -1 : (a.timestamp < b.timestamp) ? 1 : 0);
                        }));
                    } else {
                        setGlobalDonationHistory({});
                    }
                    if (!snapshot.val()) {
                        setGlobalDonationHistory({});
                    }
                });
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
                    activeSubscriptions: {},
                    pastSubscriptions: {}
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

    var causeSelector = (
        <>
        <div>Which cause would you like to donate to?</div>
        <div id="smile">**100% of your donation will go directly to Soulsmile Club's curated and heavily researched organizations that we believe are doing the best work in these areas!**</div>
        <Select
            className="causeSelector"
            defaultValue={options[0]}
            options={options}
            onChange={(selected) => setOneTimeCause(selected.value)}
        />
        </>
    );

    return (
        <>
        <div className="profile">
        {photoURL ? <img id="photo" src={photoURL} alt={name}></img> : <></>}
        <h1>{name}</h1></div>
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
        <p>Donations Made:</p>
        <ul>
            {donationHistory.map((donation) => <li key={donation.uid + "_" + donation.timestamp}>You gave ${donation.amount} to cause {donation.cause} on {new Date(donation.timestamp).toString()}.</li>
            )}
        </ul>
        <p>Global Donation Feed:</p>
        <ul>
            {globalDonationHistory.map((donation) => <li key={donation.uid + "_" + donation.timestamp}>{donation.uid === uid ? "You" : donation.author} gave ${donation.amount} to cause {donation.cause} on {new Date(donation.timestamp).toString()}.</li>
            )}
        </ul>
        </div>
        </>
    );

}

export default Dashboard;
