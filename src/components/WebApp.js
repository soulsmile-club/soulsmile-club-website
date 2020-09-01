import React from 'react';
import '../css/WebApp.css';

function WebApp(props) {

  return (
    <div className="WebApp">
        {props.component}
    </div>
  );
}

export default WebApp;