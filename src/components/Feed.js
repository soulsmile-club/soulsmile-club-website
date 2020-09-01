import React, { useEffect } from 'react';
import firebase from './Firebase.js';
import '../css/ProfileCard.css';
import InfiniteScroll from 'react-infinite-scroll-component';

function Feed(props) {
    const [posts, setPosts] = React.useState([]);
    const [allPosts, setAllPosts] = React.useState([]);
    const [hasMore, setHasMore] = React.useState(false);
    const [numPostsShowing, setNumPostsShowing] = React.useState(2);

    useEffect(() => {
        if (props.title === "Giving History") {
            firebase.auth().onAuthStateChanged(function(user) {
                console.log("auth state changed");
                if (user) {
                    fetchAllPosts(user);
                } else {
                    console.log('no user found');
                    window.location.href = "/login";
                }
            });
        } else if (props.title === "Earning History") {

        } else if (props.title === "Global Soulsmile Club Community") {

        }
    }, []);

    useEffect(() => {
        if (allPosts.length > numPostsShowing) {
            setPosts(allPosts.slice(numPostsShowing));
            setHasMore(true);
            setNumPostsShowing(numPostsShowing + 2);
        } else {
            setPosts(allPosts);
        }
    }, [allPosts]);

    function fetchAllPosts(user) {
        if (props.title === "Giving History") {
            firebase.database().ref('/users-donations/' + user.uid + '/donations').once('value').then(function(snapshot) {
                  if (snapshot.exists() && snapshot.val()) {
                    console.log(snapshot.val());
                    setAllPosts(Object.values(snapshot.val()).sort(function (a, b) {
                        return ((a.timestamp > b.timestamp) ? -1 : (a.timestamp < b.timestamp) ? 1 : 0);
                    }));
                  }
            });
        }
    }

    function fetchData () {
        console.log(allPosts.length);
        console.log(numPostsShowing);
        console.log(hasMore);
        if (allPosts.length > numPostsShowing) {
            setPosts(allPosts.slice(numPostsShowing));
            setHasMore(true);
            setNumPostsShowing(numPostsShowing + 2);
        } else {
            setPosts(allPosts);
            setHasMore(false);
        }
    }

    return (
        <div className="feed">
            <div className="feedTitle">{props.title}</div>
            <InfiniteScroll
              dataLength={posts.length}
              next={fetchData}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              // height={40}
              endMessage={
                <p style={{textAlign: 'center'}}>
                  <b>Yay! You have seen it all</b>
                </p>
              }>
              {posts.map((donation, index) => (
                <div style={{margin: "200px"}} key={index}>You gave ${donation.amount} to cause {donation.cause} on {new Date(donation.timestamp).toString()}.</div>
              ))}
            </InfiniteScroll>
        </div>
    );
  
}

export default Feed;
