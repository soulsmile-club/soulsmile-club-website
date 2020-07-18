import React from 'react';
import '../css/PrivacyPolicy.css';

function PrivacyPolicy() {
  return (
    <>
    <header className="App-header">
        <span>Privacy Policy</span>
    </header>
    <hr/>
    <div className="privacy">
        <h3 className="heading">Data We Collect</h3>
        <p id="info">Account Information</p>
        <ul>
            <li>Email (optional)</li>
            <ul>
                <li>You can choose to provide your email to set up a Soulsmile account. 
                    With a Soulsmile account, you can have soulsmiles 
                    credited to your account as you shop. 
                    You can later give these soulsmiles away</li>
            </ul>
            <li>Social media profile e.g. Facebook (optional)
                <ul>
                    <li>Linking your social media profile grants Soulsmile access 
                        to the profile, but only as allowed by your permission settings 
                        and that platform’s terms of service. Soulsmile does not track 
                        any of your social media activity, and we cannot post anything 
                        on your behalf.</li>
                </ul>
            </li>
            <li>Shopping and usage data related to the “shop, earn, give” process of 
                Soulsmile Club</li>
                <ul>
                    <li>In order to credit the right amount of soulsmiles to your 
                    account, we track the items you purchase 
                    at our pre-approved sites and their prices.</li>
                    <li>However, this shopping and usage data is only associated with users in an anonymized form and 
                        deleted as soon as they are no longer necessary.</li>
                </ul>
        </ul>
        <h3 className="heading">Your Choice</h3>
        <p id="info">You can also choose not to link your email and Facebook profile to 
        Soulsmile Club, in which case your soulsmiles 
        will be automatically given to the causes you choose at the point of purchase. If you do not indicate your 
        preference, the commission will be channelled towards a common pool of donations divided 
        among all the organizations Soulsmile Club works with.</p>

        <h3 className="heading">Data we do not collect</h3>
        <p id="info">
        Soulsmile Club accesses your open tabs in order to detect whether you are on a Soulsmile Club partner shopping 
        site. Aside from these partner shopping sites, Soulsmile Club does not collect or store 
        any browsing history or tab information.</p>
        <p id="info">
        Soulsmile extension asks for permission to "read and change data" and see the browsing 
        history for partner shopping sites. We record the timestamp of your latest visit to the 
        website in order to determine when we should redirect to our affiliate link. We do not 
        see or store any browsing history beyond this.</p>
        <p id="info">
        On Soulsmile Club partner shopping sites, we access when and what you buy in order to 
        correctly credit you with soulsmiles. This information is stored with anonymity and only 
        for a fixed retention period, beyond which it will be deleted.</p>
        <p id="info">
        Soulsmile Club cannot see and does not collect your browsing history or emails on any 
        site that is not a partner shopping site.</p>
        <p id="info">
        Soulsmile Club cannot see and does not collect your payment card data.</p>

        <h3 className="heading">Our principles regarding use of user data</h3>
        <p id="info">Soulsmile Club does not sell users' personal information.</p>
        <p id="info">User data is stored with anonymity. We only store your personal 
        identifiers in a way that is not openly viewable to anyone, including those working 
        on behalf of Soulsmile Club.</p>
        <p id="info">User data is retained for a certain period of time, after 
        which it will be deleted and no longer accessible.</p>
        <p id="bold-important">By downloading this extension, you are giving us your consent that 
        this Soulsmile Club extension may insert, append, or redirect the URL of the current 
        tab to one of our affiliate links. Soulsmile Club earns commission on qualifying 
        purchases from our affiliate retailers as a result of using these links. We direct 
        ALL proceeds towards the causes listed on our website. If, at any time, you decide to 
        revoke this consent, you may remove the chrome extension from your browser.
        </p>
    </div>
    </>
  );
}

export default PrivacyPolicy;
