import React from 'react';
import '../css/HowToUse.css';
import step1 from '../images/extension/step-1.jpeg';
import step2 from '../images/extension/step-2.jpeg';
import step3 from '../images/extension/step-3.png';
import step4 from '../images/extension/step-4.jpeg';
import step5 from '../images/extension/step-5.jpeg';
import step7 from '../images/extension/step-7.jpeg';
import share from '../images/extension/share.jpeg';

function HowToUse() {
  return (
    <>
    <header className="App-header">
        <span>How to use the Soul<span id="smile">smile</span> Club Extension</span>
    </header>
    <hr />
    <div>
        <h3 className="instruction"><span class="numberCircleLarge">1</span> Add the Soulsmile Club extension by clicking "Add to Chrome" at <a href="https://tiny.cc/soulsmile-extension">tiny.cc/soulsmile-extension</a>.</h3>
        <img className="example" src={step1}></img>
        <h3 className="instruction"><span class="numberCircleLarge">2</span> Click "Add extension" to give your consent to download.</h3>
        <img className="instruction example" src={step2}></img>
        <h3 className="instruction yay">You have successfully downloaded our extension!</h3>
        <h4 className="instruction yay">Make sure it's pinned to your toolbar if not already!</h4>
        <h5 className="instruction yay">We do not store any browser information or browsing history. 
        We ask to "read and change your data" on our partner websites <span id="bold">only</span>, 
        in order to display notifications and direct you to our affiliate links to earn 
        soul<span id="smile">smiles</span>. Also, we ask for permission to read your browsing history to determine 
        if you're currently on a partner site.</h5>
        <h5 className="instruction yay">Read more about our privacy policy <a href="/privacy-policy">here</a>.</h5>
    </div>
    <hr />
    <div>
        <h3 className="instruction"><span class="numberCircleLarge">3</span> Once downloaded, you can shop with any of the retailers 
        listed on <a href="/retailers">our website</a>.</h3>
        <img className="example" src={step3}></img>
        <h3 className="instruction"><span class="numberCircleLarge">4</span> When you visit a qualifying retailer website (i.e. <a href="https://www.girlfriend.com/" target="_blank" rel="noopener noreferrer"></a>girlfriend.com), 
        the following notification will appear.</h3>
        <img className="instruction example" src={step4}></img>
        <h3 className="instruction"><span class="numberCircleLarge">5</span> If you click "Yes," you will see a confirmation message.</h3>
        <img className="instruction example" src={step5}></img>
        <h3 className="instruction"><span class="numberCircleLarge">6</span> If you don't want to earn soulsmiles for this website, you can click "Remind me later."</h3>
        <h3 className="instruction"><span class="numberCircleLarge">7</span> To confirm you are earning soulsmiles with a site, click the Soulsmile icon within your toolbar.</h3>
        <img className="instruction example" src={step7}></img>
        <h3 className="instruction yay">Thanks for using the Soul<span id="smile">smile</span> Club browser extension! If you like it, be sure to share it with your family and friends :)</h3>
        <img className="instruction example" src={share}></img>
        <h4 className="instruction yay">Please send us your feedback anytime at <a href="https://tiny.cc/soulsmile-feedback" target="_blank" rel="noopener noreferrer">tiny.cc/soulsmile-feedback</a> so that we can make your experience with Soulsmile Club the best it can be!</h4>
    </div>
    
    </>
  );
}

export default HowToUse;
