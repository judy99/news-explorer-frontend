import React from 'react';
import './PopupHeader.css';

function PopupHeader (props) {
  return (
      <div className={`popup-form ${props.popupType}`}>
        <h2 className={`popup-form__heading ${props.popupType}__heading`}>{props.title}</h2>
      </div>
  );
}
export default PopupHeader;
