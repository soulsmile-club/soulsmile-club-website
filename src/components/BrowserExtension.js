import React from 'react';
import '../css/BrowserExtension.css';
import extension from '../images/extension.jpeg';
import Button from 'react-bootstrap/Button';

function BrowserExtension() {
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
    <header className="App-header"></header>
    <div className="flex-container-browser">
        <div>
            <img id="extension" src={extension}></img>
        </div>
        <div>
            <h1 className="browser">The Soul<span id="smile">smile</span> Club extension is here.</h1>
            <h5 className="browser">Donate to COVID-19 relief and BLM causes, without spending extra.</h5>
            <h5 className="browser">Our privacy policy can be found <a href="/privacy-policy">here</a>.</h5>
            <Button variant="outline-secondary btn-round" size="lg" href="http://tiny.cc/soulsmile-extension" target="_blank" rel="noopener noreferrer">Get Extension</Button>{' '}
        </div>
    </div>

    </>
  );
}

export default BrowserExtension;