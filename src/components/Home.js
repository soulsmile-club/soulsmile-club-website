import React from 'react';
import soulsmile from '../images/soulsmile-1024.png';
import '../css/Home.css';
import Button from 'react-bootstrap/Button';

function Home() {
  return (
    <>
    <style type="text/css">
      {`
      .btn-round {
        border-radius: 50px;
        margin: 10px;
        color: #444444;
      }
      .btn-round:hover {
        background-color: #444444;
      }
      `}
    </style>
    <header className="App-header-home">
        <h1>soul<span id="smile">smile</span> club</h1>
        <h4 id="subtitle">Shop, Earn, Give.</h4>
        <img src={soulsmile} className="App-logo" alt="logo" />
        <p id="slogan">
            Introducing a new way to donate <br/>
            without spending extra. 
        </p>
        <p id="disclosure"><span id="bold">Disclosure: </span>
        <br/>As an affiliate of the brands listed under Retailers, Soulsmile Club earns from qualifying purchases. 
        <br/>However, instead of keeping these earnings, we donate all of it to causes listed below.</p>
        <Button variant="outline-secondary btn-round" size="lg" href="/how-it-works">Interested in learning more?</Button>{' '}
    </header>    
    </>
  );
}

export default Home;
