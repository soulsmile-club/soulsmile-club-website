import React, { useEffect } from 'react';
import '../css/Dashboard.css';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa';
import * as firebase from "firebase/app";
import { Button } from 'react-bootstrap';
import Select from 'react-select';

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

const options =[
    {value: 0, label: 'All Soulsmile Causes'},
    {value: 1, label: 'Education'},
    {value: 2, label: 'Global Health'},
    {value: 3, label: 'Racial Justice'},
    {value: 4, label: 'Humanitarian Aid'}
]

var firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_ID
};

firebase.initializeApp(firebaseConfig);

function Dashboard() {

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [name, setName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [photoURL, setPhotoURL] = React.useState('');
    const [isLogin, setIsLogin] = React.useState(true);
    const [isConfirmAccount, setIsConfirmAccount] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const [existingEmail, setExistingEmail] = React.useState('');
    const [pendingCred, setPendingCred] = React.useState({});

    const [showOneTimeDonationButtons, setShowOneTimeDonationButtons] = React.useState(false);
    const [showSubscriptionButtons, setShowSubscriptionButtons] = React.useState(false);
    const [oneTimeAmount, setOneTimeAmount] = React.useState(5);
    const [subscriptionAmount, setSubscriptionAmount] = React.useState(5);
    const [oneTimeCause, setOneTimeCause] = React.useState(0);
    const [subscriptionCause, setSubscriptionCause] = React.useState(0);

    useEffect(() => {
        console.log(isLogin);
        firebase.auth().onAuthStateChanged(function(user) {
            console.log("auth state changed");
            if (user) {
                setName(user.displayName);
                setUsername(user.email);
                if (user.photoURL) {
                    setPhotoURL(user.photoURL + "?type=large");
                } else {
                    setPhotoURL(null);
                }
                handleUserLoggedIn(true);
            } else {
                console.log('no user found');
                setIsLoggedIn(false);
            }
        });
    });

    
    function handleUserLoggedIn (user) {
        setIsLoggedIn(true);
    }

    function confirmPassword() {
        firebase.auth().signInWithEmailAndPassword(existingEmail, password).then(function (result) {
            handleUserLoggedIn(result.user);
            result.user.linkWithCredential(pendingCred);
            console.log("linked");
            setIsConfirmAccount('');
        })
        .catch(function (error) {
            setErrorMessage(error.message);
        });
    }

    function continueWithGoogle() {
        var googProvider = new firebase.auth.GoogleAuthProvider();
        googProvider.setCustomParameters({'login_hint': existingEmail});
        firebase.auth().signInWithPopup(googProvider).then(function(result) {
            handleUserLoggedIn(result.user);
            result.user.linkWithCredential(pendingCred);
            console.log("linked");
            setIsConfirmAccount('');
        })
        .catch(function (error) {
            setErrorMessage(error.message);
        });
    }

    function continueWithFacebook() {
        var fbProvider = new firebase.auth.FacebookAuthProvider();
        fbProvider.setCustomParameters({'login_hint': existingEmail});
        firebase.auth().signInWithPopup(fbProvider).then(function(result) {
            handleUserLoggedIn(result.user);
            result.user.linkWithCredential(pendingCred);
            console.log("linked");
            setIsConfirmAccount('');
        })
        .catch(function (error) {
            setErrorMessage(error.message);
        });
    }

    function emailLoginPopup () {
        firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
            handleUserLoggedIn(user);
        }).catch(handleLoginSignupErrors);
    }

    async function emailSignupPopup () {
        await firebase.auth().createUserWithEmailAndPassword(email, password).then(async function(result) {
            var user = firebase.auth().currentUser;
            await user.updateProfile({
                displayName: name
            }).then(function () {
                // Hacky way to set the name - TODO: user reload
                setName(user.displayName);
                console.log('Email signup with popup');
            })
        }).catch(handleLoginSignupErrors);
    }

    function loginOrSignup (e) {
        e.preventDefault();
        setIsLogin(!isLogin);
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

    var logoutButton = (
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
                    <input id="amountInput" onClick={handleAmountInputClicked} className="amountInput" type="number" min="0.01" step="0.01" placeholder="Custom Amount" onChange={e => {if (e.target.value && e.target.value >= 0.01) { setOneTimeAmount(parseFloat(e.target.value).toFixed(2))}}}></input>
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
        <button onClick={signOut}>Log Out</button>
        </div>
        </>
    );

    var confirmPassword = (
        <>
        <div id="message">You already have an existing Soulsmile Club account associated with this email address. Please enter the password below to complete login.</div>
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}></input>
        <button onClick={confirmPassword}>Login</button>
        <div id="error" hidden={!errorMessage}>{errorMessage}</div>
        </>
    );

    var continueGoogle = (
        <>
        <div id="message">You already have a Soulsmile Club account associated with this email address, created with Google authentication. Please login through Google to continue.</div>
        <button onClick={continueWithGoogle}>Continue with Google</button>
        <div id="error" hidden={!errorMessage}>{errorMessage}</div>
        </>
    );

    var continueFacebook = (
        <>
        <div id="message">You already have a Soulsmile Club account associated with this email address, created with Facebook authentication. Please login through Facebook to continue.</div>

        <button onClick={continueWithFacebook}>Continue with Facebook</button>
        <div id="error" hidden={!errorMessage}>{errorMessage}</div>
        </>
    );


    function googleLoginPopup () {
        var googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider).then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          handleUserLoggedIn(true);
        }).catch(handleLoginSignupErrors);
    }


    function facebookLoginPopup() {
        var facebookProvider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(facebookProvider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            handleUserLoggedIn(true);
        }).catch(handleLoginSignupErrors);
    }

    function handleLoginSignupErrors(error) {
        console.log(error);
        var errorCode = error.code;
        var errorMessage = error.message;
        // Account exists with different credential. To recover both accounts
        // have to be linked but the user must prove ownership of the original
        // account.
        if (errorCode === 'auth/account-exists-with-different-credential') {
            var existingEmail = error.email;
            var pendingCred = error.credential;
            // Lookup existing account’s provider ID.
            firebase.auth().fetchSignInMethodsForEmail(existingEmail)
            .then(function(methods) {
                if (methods[0] === 'password') {
                    // Password account already exists with the same email.
                    // Ask user to provide password associated with that account.
                    setIsConfirmAccount('password');
                    setExistingEmail(existingEmail);
                    setPendingCred(pendingCred);
                } else if (methods[0] === firebase.auth.GoogleAuthProvider.PROVIDER_ID) {
                    // Sign in user to Google with same account.
                    setIsConfirmAccount('google');
                    setExistingEmail(existingEmail);
                    setPendingCred(pendingCred);
                } else if (methods[0] === firebase.auth.FacebookAuthProvider.PROVIDER_ID) {
                    // Sign in user to Facebook with same account.
                    setIsConfirmAccount('facebook');
                    setExistingEmail(existingEmail);
                    setPendingCred(pendingCred);
                }
            });
        } else {
            console.log("Login error " + errorCode + " " + errorMessage);
            setErrorMessage("Error: " + errorMessage + " Please try again.");
        }
    }

    function signOut() {
        firebase.auth().signOut().then(function() {
            console.log("Sign out was successful!");
        }).catch(function(error) {
            console.log(error);
        });
    }

    var loginButtons = (
        <>
        <header className="App-header">
            Login
        </header>
        <div className="loginForm">
            <button onClick={googleLoginPopup} className="login"><FaGoogle size={25} className="icon" />Login with Google</button>
            <button onClick={facebookLoginPopup} className="login"><FaFacebookSquare size={25} className="icon" />Login with Facebook</button>
        </div>
        <hr className="donate" />
        <div className="loginForm">
            <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} className="login"></input>
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className="login"></input>
            <input type="submit" onClick={emailLoginPopup} value="Login to soulsmile club" className="login submit"></input>
            <div>Don't have an account? Sign up <a id="loginOrSignup" onClick={loginOrSignup}>here</a>.</div>
            <div id="error" hidden={!errorMessage}>{errorMessage}</div>
        </div>
        </>
    );

    var signupButtons = (
        <>
        <header className="App-header">
            Signup
        </header>
        <div className="loginForm">
            <button onClick={googleLoginPopup} className="login"><FaGoogle size={25} className="icon" />Signup with Google</button>
            <button onClick={facebookLoginPopup} className="login"><FaFacebookSquare size={25} className="icon" />Signup with Facebook</button>
        </div>
        <hr className="donate" />
        <div className="loginForm">
            <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} className="login"></input>
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className="login"></input>
            <input type="submit" onClick={emailSignupPopup} value="Signup to soulsmile club" className="login submit"></input>
            <div>Have an account already? Log in <a id="loginOrSignup" onClick={loginOrSignup}>here</a>.</div>
            <div id="error" hidden={!errorMessage}>{errorMessage}</div>
        </div>
        </>
    );

    return (
        <div className="Account">
        {isLoggedIn ? logoutButton : ((isConfirmAccount === 'password') ? confirmPassword :
                                      (isConfirmAccount === 'google') ? continueGoogle :
                                      (isConfirmAccount === 'facebook') ? continueFacebook :
                                      (isLogin ? loginButtons : signupButtons)) }
        </div>
    );
}

export default Dashboard;
