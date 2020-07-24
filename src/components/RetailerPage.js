import React, {useEffect} from 'react';
import '../css/RetailerPage.css';

function RetailerPage(props) {

    const [activated, setActivated] = React.useState(false);

    function activateDonations() {
        setActivated(true);
        setTimeout(function() {
            console.log("ended");
            window.location.href=props.retailerInfo["link"];
        }, 1100);
    }

    var checkmark = (<>
        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
        <div id="earningMessage">You are now earning soul<span id="smile">smiles</span> for {props.retailerName}!</div>
        </>
    );

    return (
        <>
        <header className="App-header">
            <span>Start earning soul<span id="smile">smiles</span> with {props.retailerName}.</span>
        </header>
        <hr/>
        {activated ? checkmark : <button onClick={activateDonations} type='button' className='btn btn-secondary' id='activateButton'>Earn Soulsmiles</button>}
        <div id="strippedUrl" hidden={true}>{props.retailerInfo["domain"]}</div>
        </>
    );
}

export default RetailerPage;
