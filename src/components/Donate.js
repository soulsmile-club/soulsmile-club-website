import React, { useEffect } from 'react';
import '../css/Donate.css';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa';
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

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

function Donate() {

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

    var logoutButton = (
        <>
        <div className="profile">
        {photoURL ? <img id="photo" src={photoURL} alt={name}></img> : <></>}
        <h1>{name}</h1>
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
        <input type="hidden" name="cmd" value="_donations" />
        <input type="hidden" name="business" value="team@soulsmile.club" />
        <input type="hidden" name="currency_code" value="USD" />
        <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
        <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
        </form>
        </div>
        <button onClick={signOut}>Log Out</button>
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
        <>

        {isLoggedIn ? logoutButton : ((isConfirmAccount === 'password') ? confirmPassword :
                                      (isConfirmAccount === 'google') ? continueGoogle :
                                      (isConfirmAccount === 'facebook') ? continueFacebook :
                                      (isLogin ? loginButtons : signupButtons)) }
        </>
    );
}

export default Donate;
