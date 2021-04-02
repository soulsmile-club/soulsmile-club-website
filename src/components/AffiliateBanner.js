import React from 'react';
import '../css/AffiliateBanner.css';
import ExtensionTemp from '../images/extension_temp.jpeg';
import Button from 'react-bootstrap/Button';

function AffiliateBanner() {
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
    <div>
        <div>
            <img id="affImg" alt="" src={ExtensionTemp}></img>
        </div>
        <div id="affButton">
            <Button variant="outline-secondary btn-round" size="lg" href="http://tiny.cc/soulsmile-extension" target="_blank" rel="noopener noreferrer">Shop at affiliate with soulsmile</Button>{' '}
        </div>
    </div>

    </>
  );
}

export default AffiliateBanner;