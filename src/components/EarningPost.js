import React from 'react';
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

function EarningPost(props) {

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

    return (
        <div className="donationPost">
            {props.firstPost ? "" :
                <hr className="postDivider" />
            }
                <div className="picAndDonationContainer">
                    {props.authorPic ? <img className="authorPhoto" src={props.authorPic} alt={props.author}></img> : <img className="authorPhoto noProfilePic" src={genericProfilePic} alt={props.author}></img> }
                    <div className="donationContainer">
                        <div className="donationTitle"><b>You</b> earned {props.amount * 10} soulsmiles from <b>{props.author}.</b></div>
                        <div className="donationPostTime">{timeSince(props.timestamp)}</div>
                        <div className="donationMessage">{props.message}</div>
                    </div>
                </div>
        </div>
    );
  
}

export default EarningPost;
