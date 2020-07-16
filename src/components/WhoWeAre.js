import React from 'react';
import '../css/WhoWeAre.css';

function WhoWeAre() {
  return (
    <>
    <header className="App-header">
        <p>Introducing Soul<span id="smile">smile</span> Club.</p>
    </header>
    <hr />
    <h4 id="subtitle">We envision a world where everyday consumerism can fuel social change.</h4>
    <div className="flex-container-who">
        <div>
            <iframe title="soulsmile-club" width="500px" height="450px" src="https://www.youtube.com/embed/JdltLFMyDcQ">
            </iframe>
        </div>
        <div>
            <p>Imagine you are a Soulsmile consumer. When you start 
            shopping online through this website or the browser extension, 
            Soul<span id="smile">smile</span> Club earns commission, also known as 
            soul<span id="smile">smiles</span>, on your qualifying purchases as a "thank you" 
            from the retailer.</p>
            <p>Instead of keeping them, we direct all the commission 
            we receive towards organizations working on the most pressing humanitarian 
            issues today.</p>
            <p>This way, you can give back to your community without 
            spending extra, and impactful organizations can get real financial support.</p>
        </div>
    </div>
    </>
  );
}

export default WhoWeAre;
