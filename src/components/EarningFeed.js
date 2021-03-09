import React, { useEffect } from 'react';
import firebase from './Firebase.js';
import EarningPost from './EarningPost.js';
import '../css/Feed.css';
import InfiniteScroll from 'react-infinite-scroll-component';

const numPostsAtOneTime = 3;

function EarningFeed() {
    const [posts, setPosts] = React.useState([]);
    const [uid, setUid] = React.useState('');
    const [allPosts, setAllPosts] = React.useState([]);
    const [hasMore, setHasMore] = React.useState(false);
    const [numPostsShowing, setNumPostsShowing] = React.useState(numPostsAtOneTime);

    useEffect(() => {
        console.log("new feed");
        firebase.auth().onAuthStateChanged(function(user) {
            console.log("auth state changed");
            if (user) {
                fetchAllPosts(user);
                setUid(user.uid);
            } else {
                console.log('no user found');
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
        firebase.database().ref('/users-earnings/' + user.uid).once('value').then(function(snapshot) {
              if (snapshot.exists() && snapshot.val()) {
                setAllPosts(Object.values(snapshot.val()).sort(function (a, b) {
                    return ((a.timestamp > b.timestamp) ? -1 : (a.timestamp < b.timestamp) ? 1 : 0);
                }));
              }
        });
    }

    function fetchData () {
        if (allPosts.length > numPostsShowing) {
            console.log("show more!");
            setPosts(allPosts.slice(0, numPostsShowing));
            setHasMore(true);
            setNumPostsShowing(numPostsShowing + numPostsAtOneTime);
        } else {
            console.log("show all");
            setPosts(allPosts);
            setHasMore(false);
        }
    }

    return (
        <div className="feed">
            <div className="feedTitle">Earning History</div>
            {allPosts.length === 0 ? 
                <div id="noPostsMessage">You have not yet earned any soulsmiles! Shop on our <a href="http://tiny.cc/soulsmile-extension" target="_blank" rel="noopener noreferrer">Chrome extension</a> to see soulsmiles come in from your daily purchases.</div>
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
                (index === 0) ? <EarningPost key={index} currUid={uid} firstPost={true} uid={donation.uid} amount={donation.amount} cause={donation.cause} author={donation.retailer} authorPic="https://welltodocareers.com/wp-content/uploads/job-manager-uploads/company_logo/2020/07/Girlfriend-Collective-300x300.png" timestamp={donation.payment_timestamp} heartCount={donation.heartCount} /> :
                <EarningPost key={index} currUid={uid} firstPost={false} uid={donation.uid} amount={donation.amount} cause={donation.cause} author={donation.retailer} authorPic="https://welltodocareers.com/wp-content/uploads/job-manager-uploads/company_logo/2020/07/Girlfriend-Collective-300x300.png" timestamp={donation.timestamp} heartCount={donation.heartCount} />
              ))}
            </InfiniteScroll>}
        </div>
    );
  
}

export default EarningFeed;
