import React from 'react';
import './Popup.css';

function Popup (props) {
  return (
    <div className='popup popup_opened' >
      <div className='popup__container'>
          <span className='popup__close' onClick={props.onPopupClose}>+</span>
          <div className='main-popup'>
          <div className='main-popup__container'>
            {props.children}
          </div>
          </div>
      </div>
    </div>
  );
}

export default Popup;
