import React, { useEffect } from 'react';
import firebase from './Firebase.js';
import '../css/Feed.css';
import { BsPlusCircleFill } from 'react-icons/bs';
import '../css/SmileageCard.css';

function SmileageCard(props) {
    const [posts, setPosts] = React.useState([]);
    const [uid, setUid] = React.useState('');

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                fetchAllPosts(user);
                setUid(user.uid);
            } else {
                window.location.href = "/login";
            }
        });
    }, []);

    function fetchAllPosts(user) {
        firebase.database().ref('/users-donations/' + user.uid + '/subscriptions').once('value').then(function(snapshot) {
              if (snapshot.exists() && snapshot.val()) {
                setPosts(Object.values(snapshot.val()).sort(function (a, b) {
                    return ((a.startTimestamp > b.startTimestamp) ? -1 : (a.startTimestamp < b.startTimestamp) ? 1 : 0);
                }));
              }
        });
    }

    function goToSmileageFunction() {
        if (props.goToSmileage) {
            return props.goToSmileage;
        } else {
            return (() => alert("hi"));
        }
    }

    return (
        <div className="feed">
            <div className="feedTitle">Smileage</div>
            {(posts.length === 0) ? 
                <div id="noSmileageMessage">Pledge 50 soulsmiles or more per month to achieve <span className="gold">Gold Smileage</span> status!</div>
            : 
              posts.map((donation, index) => (
                <div>{index}</div>
              ))
            }
            <hr className="smileageDivider" />
            <a href="javascript:void(0)" onClick={goToSmileageFunction()} className="addNewSmileage"><BsPlusCircleFill size={23} className="smileagePlus" />Add new Smileage Program monthly donation</a>
        </div>
    );
  
}

export default SmileageCard;
