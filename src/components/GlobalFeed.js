import React, { useEffect } from 'react';
import firebase from './Firebase.js';
import DonationPost from './DonationPost.js';
import '../css/Feed.css';
import InfiniteScroll from 'react-infinite-scroll-component';

const numPostsAtOneTime = 10;

function GlobalFeed() {
    const [posts, setPosts] = React.useState([]);
    const [uid, setUid] = React.useState('');
    const [allPosts, setAllPosts] = React.useState([]);
    const [hasMore, setHasMore] = React.useState(false);
    const [numPostsShowing, setNumPostsShowing] = React.useState(numPostsAtOneTime);

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

    useEffect(() => {
        if (allPosts.length > numPostsShowing) {
            setPosts(allPosts.slice(0, numPostsShowing));
            setHasMore(true);
            setNumPostsShowing(numPostsShowing + numPostsAtOneTime);
        } else {
            setPosts(allPosts);
        }
    }, [allPosts]);

    function fetchAllPosts(user) {
        firebase.database().ref('/donations').once('value').then(function(snapshot) {
              if (snapshot.exists() && snapshot.val()) {
                setAllPosts(Object.entries(snapshot.val()).sort(function (a, b) {
                    return ((a[1].timestamp > b[1].timestamp) ? -1 : (a[1].timestamp < b[1].timestamp) ? 1 : 0);
                }).filter(donation => donation[1].public));
              }
        });
    }

    function fetchData () {
        if (allPosts.length > numPostsShowing) {
            setPosts(allPosts.slice(0, numPostsShowing));
            setHasMore(true);
            setNumPostsShowing(numPostsShowing + numPostsAtOneTime);
        } else {
            setPosts(allPosts);
            setHasMore(false);
        }
    }

    return (
        <div className="feed">
            <div className="feedTitle">Global Soulsmile Club Community</div>
            {allPosts.length === 0 ? 
                <div id="noPostsMessage">There are no public donations from the Soulsmile Club community yet. Give soulsmiles now to be the first!</div>
            : <InfiniteScroll
              className="scrollContainer"
              dataLength={posts.length}
              next={fetchData}
              hasMore={hasMore}
              loader={<h4>Loading more posts...</h4>}
              scrollThreshold={0.8}
              endMessage={<></>
              }>
              {posts.length === 0 ? "" : posts.map((donation, index) => (
                (index === 0) ? <DonationPost key={index} currUid={uid} firstPost={true} uid={donation[1].uid} amount={donation[1].amount} cause={donation[1].cause} author={donation[1].author} authorPic={donation[1].authorPic} timestamp={donation[1].timestamp} heartCount={donation[1].heartCount} message={donation[1].message} donationId={donation[0]} /> :
                <DonationPost key={index} currUid={uid} firstPost={false} uid={donation[1].uid} amount={donation[1].amount} cause={donation[1].cause} author={donation[1].author} authorPic={donation[1].authorPic} timestamp={donation[1].timestamp} heartCount={donation[1].heartCount} message={donation[1].message} donationId={donation[0]} />
              ))}
            </InfiniteScroll>}
        </div>
    );
  
}

export default GlobalFeed;
