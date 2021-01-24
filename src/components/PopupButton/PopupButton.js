import React from 'react';
import './PopupButton.css';

function PopupButton (props) {
  return (
    <input type='submit' name={props.name} className={`btn form__btn-submit popup-form__btn-submit ${props.name}__btn-submit ${!props.submitBtnState ? 'form__submit_disabled' : '' }`} value={props.title} />
  );
}
export default PopupButton;
