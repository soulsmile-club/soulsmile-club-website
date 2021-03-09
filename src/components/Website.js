import React from 'react';
import '../css/App.css';
import SoulsmileNavbar from './SoulsmileNavbar';
import SoulsmileFooter from './SoulsmileFooter';

function Website(props) {

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
    <div className="App">
      <SoulsmileNavbar />
      <div className="content">
        {props.component}
      </div>
      <SoulsmileFooter />
    </div>
    </>
  );
}

export default Website;
