import React from 'react';
import '../css/Vision.css';

function Vision() {
  return (
    <>
    <header className="App-header">
        <span>Our Vision</span>
    </header>
    <hr/>
    <span id="title">The world as we know it.</span>
    <p id="problem">
    <span id="bold">Money is flawed.</span><br/>
    As consumers, we often choose to buy a $5 cup of coffee 
    rather than to give it to disaster relief. <br/>
    We click into Wikipedia every day
    but close their banner pleading for contributions. <br/>
    We depend on charities to 
    save the world but we don't donate. 
    </p>
    <p id="problem">
        We do care, but <span className="underline">it stings to give real 
        money away.</span><br/>
        What if there is a way to make people less stingy? <br/>
        What if there 
        is a currency that has no value except when it is given away?
    </p>
    <p id="problem">
        <span id="bold">What if there is a way to bridge consumerism and 
        social consciousness?</span>
    </p>
    <span id="title">Introducing Soul<span id="smile">smile</span> Club.</span>
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

export default Vision;
