import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
import { Button } from 'react-bootstrap';
import '../css/Payment.css';
import firebase from './Firebase.js';


const causes =[
    {value: 0, label: 'All Soulsmile Causes'},
    {value: 1, label: 'Education'},
    {value: 2, label: 'Global Health'},
    {value: 3, label: 'Racial Justice'},
    {value: 4, label: 'Humanitarian Aid'}
]

function Payment() {
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
                setUid(user.uid);
            } else {
                console.log('no user found');
                window.location.href = "/login";
            }
        });
    }, []);

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
                    updates['/donations/' + newDonationKey] = donationData;

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

    var subscriptionButtons = (
        <PayPalButton
            onApprove={(details, data) => {
                var subscriptionData = {
                    amount: parseFloat(query.get("amount")),
                    cause: causes[query.get("cause")].label,
                    startTimestamp: Date.now(),
                    active: true,
                    author: name,
                    authorPic: profilePic,
                    heartCount: 0,
                    uid: uid
                }

                console.log("subscription data to log");
                console.log(subscriptionData);

                var newSubscriptionKey = firebase.database().ref().child('subscriptions').push().key;

                var updates = {};
                updates['/users-donations/' + uid + '/subscriptions/' + newSubscriptionKey] = subscriptionData;
                updates['/subscriptions/' + newSubscriptionKey] = subscriptionData;

                firebase.database().ref().update(updates, function (error) {
                    if (error) {
                        console.log(error);
                    } else {
                        setPaymentDone(true);
                        console.log('updated database');
                    }
                });
            }}
            createSubscription={(data, actions) => {
                return actions.subscription.create({
                    plan_id: 'P-36G54755XA9707334L5EZD5A',
                    // start_time: "2020-09-01T00:00:00Z",
                    quantity: query.get("amount")
                });
            }}
            options={{
              clientId: "Abq0IUThpLiDGjVAJRqvvT5kzwvqqFfBRK8WzO8ivCdfVphhLgsYcAStVf14ouSmYiMQS377LY2kFJ0O",
              vault: true
            }}
        />
    );

    if (paymentDone) {
        return (
            <>
            <header className="WebApp-header">
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
        <div className="paymentContent">
        <div>
        {(query.has("type") && query.has("amount") && query.has("cause")) ?
                <div id="payPalButtons">
                    {query.get("type") === "single" ?
                        <>
                        <header className="WebApp-header">
                            <span>Complete your ${query.get("amount")} donation for {causes[query.get("cause")].label}!</span>
                        </header>
                        {oneTimeDonationButtons}
                        </>
                    :
                        <>
                        <header className="WebApp-header">
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
                <header className="WebApp-header"><span>Error</span></header>
                <p>We're sorry! It seems we are missing some information for this page. Please click <a href="/dashboard">here</a> to try again, or <a href="mailto:hello@soulsmile.club">contact us</a> if you continue to face issues!</p>
            </>
        }
        </div>
        </div>
      );
    }
  
}

export default Payment;
