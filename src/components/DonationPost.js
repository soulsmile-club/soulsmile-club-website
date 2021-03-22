import React, { useEffect } from 'react';
import firebase from './Firebase.js';
import genericProfilePic from '../images/genericProfilePic.png';
import '../css/DonationPost.css';
import { MdFavorite } from 'react-icons/md';
import { MdFavoriteBorder } from 'react-icons/md';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

const PinkCheckbox = withStyles({
  root: {
    color: "#444444",
    '&$checked': {
      color: "#eda1aa",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

function DonationPost(props) {
    const [liked, setLiked] = React.useState(false);
    const [heartCount, setHeartCount] = React.useState(props.heartCount);

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

    useEffect(() => {
      var donationRef = firebase.database().ref('/users-donations/' + props.uid + '/donations/' + props.donationId);
      donationRef.on('value', (snapshot) => {
        const data = snapshot.val();
        setHeartCount(data.heartCount);
        setLiked(data.hearts && data.hearts[props.currUid]);
      });
    }, []);

    function likePost() {
      // update heart button / count UI
      setLiked(!liked);

      // send like to database to persist
      firebase.database().ref('/users-donations/' + props.uid + '/donations/' + props.donationId).transaction((post) => {
        if (post) {
          if (post.hearts && post.hearts[props.currUid]) {
            post.heartCount--;
            post.hearts[props.currUid] = null;
          } else {
            post.heartCount++;
            if (!post.hearts) {
              post.hearts = {};
            }
            post.hearts[props.currUid] = true;
          }
        }
        return post;
      });

      firebase.database().ref('/donations/' + props.donationId).transaction((post) => {
        if (post) {
          if (post.hearts && post.hearts[props.currUid]) {
            post.heartCount--;
            post.hearts[props.currUid] = null;
          } else {
            post.heartCount++;
            if (!post.hearts) {
              post.hearts = {};
            }
            post.hearts[props.currUid] = true;
          }
        }
        return post;
      });
    }

    return (
        <div className="donationPost">
            {props.firstPost ? "" :
                <hr className="postDivider" />
            }
                <div className="picAndDonationContainer">
                    {props.authorPic ? <img className="authorPhoto" src={props.authorPic} alt={props.author}></img> : <img className="authorPhoto noProfilePic" src={genericProfilePic} alt={props.author}></img> }
                    <div className="donationContainer">
                        <div className="donationTitle"><b>{(props.uid === props.currUid) ? "You" : props.author}</b> gave {(props.uid === props.currUid) ? props.amount + " " : ""}soulsmiles to <b>{props.cause}.</b></div>
                        <div className="donationPostTime">{timeSince(props.timestamp)}</div>
                        <div className="donationMessage">{props.message}</div>
                        <div className="likesBar">
                          <PinkCheckbox checked={liked} onChange={(e) => likePost()} icon={<MdFavoriteBorder size={18}/>} checkedIcon={<MdFavorite size={18} />} className="heart" />
                          <div id="heartCount" className={liked ? "pink" : ""}>{heartCount}</div>
                        </div>
                    </div>
                </div>
        </div>
    );
  
}

export default DonationPost;
