import React from 'react';
import '../css/Inspiration.css';

function Inspiration() {
  return (
    <>
    <header className="App-header">
        <p>The world as we know it.</p>
    </header>
    <hr/>
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
    
    </>
  );
}

export default Inspiration;
