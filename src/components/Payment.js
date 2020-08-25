import React, { useEffect } from 'react';
import { useLocation, Link } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
import { Button } from 'react-bootstrap';
import '../css/Payment.css';
import firebase from './Firebase.js';
import  { Redirect } from 'react-router-dom'


const causes =[
    {value: 0, label: 'All Soulsmile Causes'},
    {value: 1, label: 'Education'},
    {value: 2, label: 'Global Health'},
    {value: 3, label: 'Racial Justice'},
    {value: 4, label: 'Humanitarian Aid'}
]

function Payment() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [name, setName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [profilePic, setProfilePic] = React.useState('');
    const [uid, setUid] = React.useState('');
    const [paymentDone, setPaymentDone] = React.useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            console.log("auth state changed");
            if (user) {
                setName(user.displayName);
                setUsername(user.email);
                setProfilePic(user.photoURL);
                setIsLoggedIn(true);
                setUid(user.uid);
            } else {
                console.log('no user found');
                setIsLoggedIn(false);
            }
        });
    });

    function useQuery() {
      return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();

    var oneTimeDonationButtons = (
            <PayPalButton
                amount={query.get("amount")}
                shippingPreference="NO_SHIPPING"
                onApprove={(details, data) => {
                    var donationData = {
                        amount: parseFloat(query.get("amount")),
                        cause: causes[query.get("cause")].label,
                        timestamp: Date.now(),
                        author: name,
                        authorPic: profilePic,
                        heartCount: 0,
                        uid: uid
                    }

                    console.log("donation data to log");
                    console.log(donationData);

                    var newDonationKey = firebase.database().ref().child('donations').push().key;

                    var updates = {};
                    updates['/users-donations/' + uid + '/donations/' + newDonationKey] = donationData;

                    firebase.database().ref().update(updates, function (error) {
                        if (error) {
                            console.log(error);
                        } else {
                            setPaymentDone(true);
                            console.log('updated database');
                        }
                    });
                }}
                options={{
                  clientId: "Abq0IUThpLiDGjVAJRqvvT5kzwvqqFfBRK8WzO8ivCdfVphhLgsYcAStVf14ouSmYiMQS377LY2kFJ0O"
                }}
            />
    );

    var subscriptionButtons;

    if (paymentDone) {
        return (
            <>
            <header className="App-header">
                <span>Payment Complete!</span>
            </header>
            <p>Thank you so much for your generous donation! We know it will go a long way to making the world a better place. :)</p>
            <a href="/dashboard">
                <Button bsPrefix="donateButton">Return to Profile</Button>
            </a>
            </>
        );
    } else {
        return (
        <>
        {isLoggedIn ?
            (query.has("type") && query.has("amount") && query.has("cause")) ?
                <div id="payPalButtons">
                    {query.get("type") === "single" ?
                        <>
                        <header className="App-header">
                            <span>Complete your ${query.get("amount")} donation for {causes[query.get("cause")].label}!</span>
                        </header>
                        {oneTimeDonationButtons}
                        </>
                    :
                        <>
                        <header className="App-header">
                            <span>Complete your ${query.get("amount")} monthly donation to {causes[query.get("cause")].label}!</span>
                        </header>
                        {subscriptionButtons}
                        </>
                    }
                    <a id="cancelButton" href="/dashboard">
                        <Button bsPrefix="donateButton">Cancel Payment</Button>
                    </a>
                </div>
            : <>
                <header className="App-header"><span>Error</span></header>
                <p>We're sorry! It seems we are missing some information for this page. Please click <a href="/dashboard">here</a> to try again, or <a href="mailto:hello@soulsmile.club">contact us</a> if you continue to face issues!</p>
            </>
        : <>
            <header className="App-header"><span>Access Denied</span></header>
            <p>Please log in <a href="/dashboard">here</a> to access this page.</p>
        </>}
        </>
      );
    }
  
}

export default Payment;
