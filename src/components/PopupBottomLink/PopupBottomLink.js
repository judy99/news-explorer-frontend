import React from 'react';
import './PopupBottomLink.css';

function PopupBottomLink (props) {
  return (
    <input type='button' className={`popup-form__link ${props.popupType}__link`} onClick={props.onClickLink} value={props.linkName} />
  );
}
export default PopupBottomLink;
