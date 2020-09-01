import React, { useEffect } from 'react';
import '../css/Dashboard.css';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa';
import firebase from './Firebase.js';

function Dashboard() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLogin, setIsLogin] = React.useState(true);
    const [isConfirmAccount, setIsConfirmAccount] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const [existingEmail, setExistingEmail] = React.useState('');
    const [pendingCred, setPendingCred] = React.useState({});

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            console.log("auth state changed");
            if (user) {
                window.location.href="/dashboard"
            } else {
                console.log('no user found');
            }
        });
    }, []);

    function confirmPassword() {
        firebase.auth().signInWithEmailAndPassword(existingEmail, password).then(function (result) {
            result.user.linkWithCredential(pendingCred).then(function(linkResult) {
                console.log("linked");
                setIsConfirmAccount('');
                window.location.href = "/dashboard";
            });
        })
        .catch(function (error) {
            setErrorMessage(error.message);
        });
    }

    function continueWithGoogle() {
        var googProvider = new firebase.auth.GoogleAuthProvider();
        googProvider.setCustomParameters({'login_hint': existingEmail});
        firebase.auth().signInWithPopup(googProvider).then(function(result) {
            result.user.linkWithCredential(pendingCred).then(function(linkResult) {
                console.log("linked");
                setIsConfirmAccount('');
                window.location.href = "/dashboard";
            });
        })
        .catch(function (error) {
            setErrorMessage(error.message);
        });
    }

    function continueWithFacebook() {
        var fbProvider = new firebase.auth.FacebookAuthProvider();
        fbProvider.setCustomParameters({'login_hint': existingEmail});
        firebase.auth().signInWithPopup(fbProvider).then(function(result) {
            result.user.linkWithCredential(pendingCred).then(function(linkResult) {
                console.log("linked");
                setIsConfirmAccount('');
                window.location.href = "/dashboard";
            });
        })
        .catch(function (error) {
            setErrorMessage(error.message);
        });
    }

    function emailLoginPopup () {
        firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
            window.location.href = "/dashboard";
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

    
    var confirmPassword = (
        <>
        <div id="message">You already have an existing Soulsmile Club account associated with this email address. Please enter the password below to complete login.</div>
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}></input>
        <button onClick={confirmPassword}>Log In</button>
        <div id="error" hidden={!errorMessage}>{errorMessage}</div>
        </>
    );

    var continueGoogle = (
        <>
        <div id="message">You already have a Soulsmile Club account associated with this email address, created with Google authentication. Please log in through Google to continue.</div>
        <button onClick={continueWithGoogle}>Continue with Google</button>
        <div id="error" hidden={!errorMessage}>{errorMessage}</div>
        </>
    );

    var continueFacebook = (
        <>
        <div id="message">You already have a Soulsmile Club account associated with this email address, created with Facebook authentication. Please log in through Facebook to continue.</div>

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
          window.location.href = "/dashboard";
        }).catch(handleLoginSignupErrors);
    }


    function facebookLoginPopup() {
        var facebookProvider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(facebookProvider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            window.location.href = "/dashboard";
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

    var loginButtons = (
        <>
        <header className="WebApp-header">
            Log In
        </header>
        <div className="loginForm">
            <button onClick={googleLoginPopup} className="login"><FaGoogle size={25} className="icon" />Log in with Google</button>
            <button onClick={facebookLoginPopup} className="login"><FaFacebookSquare size={25} className="icon" />Log in with Facebook</button>
        </div>
        <hr className="donate" />
        <div className="loginForm">
            <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="login"></input>
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="login"></input>
            <input type="submit" onClick={emailLoginPopup} value="Log in to Soulsmile Club" className="login submit"></input>
            <div>Don't have an account? Sign up <a id="loginOrSignup" onClick={loginOrSignup}>here</a>.</div>
            <div id="error" hidden={!errorMessage}>{errorMessage}</div>
        </div>
        </>
    );

    var signupButtons = (
        <>
        <header className="WebApp-header">
            Sign Up
        </header>
        <div className="loginForm">
            <button onClick={googleLoginPopup} className="login"><FaGoogle size={25} className="icon" />Sign up with Google</button>
            <button onClick={facebookLoginPopup} className="login"><FaFacebookSquare size={25} className="icon" />Sign up with Facebook</button>
        </div>
        <hr className="donate" />
        <div className="loginForm">
            <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="login"></input>
            <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="login"></input>
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="login"></input>
            <input type="submit" onClick={emailSignupPopup} value="Sign up for Soulsmile Club" className="login submit"></input>
            <div>Have an account already? Log in <a id="loginOrSignup" onClick={loginOrSignup}>here</a>.</div>
            <div id="error" hidden={!errorMessage}>{errorMessage}</div>
        </div>
        </>
    );

    return (
        <div className="Account">
            {((isConfirmAccount === 'password') ? confirmPassword :
                                      (isConfirmAccount === 'google') ? continueGoogle :
                                      (isConfirmAccount === 'facebook') ? continueFacebook :
                                      (isLogin ? loginButtons : signupButtons)) }
        </div>
    );
}

export default Dashboard;
