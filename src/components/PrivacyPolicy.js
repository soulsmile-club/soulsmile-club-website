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
        <h3 className="heading">Use of external tools on our website and browser extension</h3>
        <p id="info">The controller has integrated the component Google Analytics (with anonymisation function) on this website and extension.</p>
        <p id="info">Google Analytics is a web analytics service. Web analysis is the gathering, collection and analysis of data about the behavior of visitors to websites and extension. Among other things, a web analysis service collects data on which website and extension a data subject has come to a website and extension from (so-called referrers), which subpages of the website and extension were accessed or how often and for which period of time a subpage was viewed. A web analysis is mainly used to optimize a website and extension and for the cost-benefit analysis of Internet advertising.</p>
        <p id="info">The operator of the Google Analytics component is Google Inc., 1600 Amphitheatre Pkwy, Mountain View, CA 94043-1351, USA.</p>
        <p id="info">Google Analytics uses cookies. The information generated by the cookie about your use of this website and extension is usually transmitted to a Google server in the USA and stored there. Google might transfer the personal information collected via this technical procedure to third parties.</p>
        <p id="info">As IP anonymization is activated on our website and extension, your IP address will be shortened by Google within Member States of the European Union or other states in agreement with the European Economic Area. Only in exceptional cases, the full IP address is sent to and shortened by a Google server in the USA. On behalf of the operator of the website and extension, Google will use this information to evaluate your use of the website, compile reports on website and extension activity and to provide further services related to website and extension and internet use to us. The IP address transferred through your browser to Google Analytics will not be combined with other data held by Google.</p>
        <p id="info">In addition, this website and extension uses the Analytics feature UserID to track interaction data. This User ID will be additionally anonymized and encrypted and will not be linked with other data.</p>
        <p id="info">You can prevent the storage of cookies by a corresponding setting of your browser software; however, please note that if you do this, you may not be able to use all the features of this website and extension to the fullest extent possible.</p>
        <p id="info">In addition, you may prevent the collection of the data generated by the cookie and related to your use of the website and extension (including your IP address) by Google as well as the processing of this data by Google by downloading and installing the browser plug-in available under the following link: <a href="https://tools.google.com/dlpage/gaoptout?hl=en">https://tools.google.com/dlpage/gaoptout?hl=en</a></p>
        <p id="info">This browser add-on informs Google Analytics via JavaScript that no data and information about website and extension visits may be transmitted to Google Analytics.</p>
        <p id="info">In addition, a cookie already set by Google Analytics can be deleted at any time via the Internet browser or other software programs.</p>
        <p id="info">Further information and Google‘s applicable privacy regulations can be found at <a href="https://policies.google.com/privacy?hl=en">https://policies.google.com/privacy?hl=en</a> and <a href="https://marketingplatform.google.com/about/">https://marketingplatform.google.com/about/</a> The following link provides a further explanation of Google Analytics <a href="https://marketingplatform.google.com/about/">https://marketingplatform.google.com/about/</a></p>
        <p id="info">Our website and extension also uses Google Analytics performance reports relating to demographics and interests and reports on Google Display Network impressions. You can disable Google Analytics for display advertising and customize the ads on the Google Display Network by visiting the ad settings at this link: <a href="https://adssettings.google.com">https://adssettings.google.com</a></p>
    </div>
    </>
  );
}

export default PrivacyPolicy;
