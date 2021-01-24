import React from 'react';
import Popup from '../Popup/Popup.js';
import PopupBottomLink from '../PopupBottomLink/PopupBottomLink.js';
import PopupHeader from '../PopupHeader/PopupHeader.js';
import PopupButton from '../PopupButton/PopupButton.js';
import  './PopupWithForm.css';

function PopupWithForm (props) {
  const resetForm = (e) => {
    e.currentTarget.reset();
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      props.onSubmit();
      resetForm(e);
    };

  return (
    <Popup onPopupClose={props.onPopupClose} submitBtnState={props.submitBtnState} >
      <form title={props.title} className={`form popup-form ${props.name}`} name={props.name} id={props.name} onSubmit={props.submitBtnState ? handleSubmit : undefined } >
        <PopupHeader title={props.title} popupType={props.popupType} />

        {props.children}

        <span id='form-input-error' className='form__input-error'>{props.formError}</span>
        <PopupButton name={props.name} submitBtnState={props.submitBtnState} title={props.title}/>
      </form>
      <span className='popup-form__bottom'>or
        <PopupBottomLink onClickLink={props.onClickLink} linkName={props.linkName} />
      </span>
    </Popup>
  );
}

export default PopupWithForm;
