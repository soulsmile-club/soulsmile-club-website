import React from 'react';
import '../css/RetailerPage.css';

function RetailerPage(props) {

    const [activated, setActivated] = React.useState(false);
    function activateDonations() {
        setActivated(true);
        setTimeout(function() {
            console.log("ended");
            // window.location.href=props.retailerLink;
        }, 1100);
    }

    var checkmark = (<>
        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
        <div id="earningMessage">You are now earning soul<span id="smile">smiles</span> for {props.retailerName}!</div>
        </>
    );

    var activateButton = (
        <>
        <button onClick={activateDonations} type='button' className='btn' id='activateButton'>Click here to <br/> earn soul<span id="smile">smiles</span>!</button>
        <div id="disclosureMessage"><b>Disclosure:</b> As an affiliate of this retailer, Soulsmile Club earns commission from qualifying purchases. 
        By clicking the button above, you are giving us your consent to direct you to our affiliate link. 
        However, instead of keeping the commission, we donate all of it to the causes listed <a href="/causes" target="_blank" rel="noopener noreferrer">here</a>.</div>
        </>
    );

    return (
        <>
        <header className="App-header">
            <span>Start earning soul<span id="smile">smiles</span> with {props.retailerName}.</span>
        </header>
        <hr/>
        {activated ? checkmark : activateButton}
        <div id="strippedUrl" hidden={true}>{props.retailerDomain}</div>
        </>
    );
}

export default RetailerPage;
