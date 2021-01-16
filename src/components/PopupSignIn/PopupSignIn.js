import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';

function PopupSignIn(props) {
  const popupName = 'login';
  const popupTitle = 'Sign in';
  const popupBottomLink = 'Sign up';


  return (
    <>
    <PopupWithForm
      onPopupClose = {props.onPopupClose}
      name = {popupName}
      title = {popupTitle}
      linkName = {popupBottomLink}
      onClickLink = {props.handleClickLinkSignup}
      onSubmit = {props.onLogin}
      submitBtnState={props.submitBtnState}
      handleChangeEmail={props.handleChangeEmail}
      handleChangePassword={props.handleChangePassword}
      emailInputError = {props.emailInputError}
      passwordInputError = {props.passwordInputError} >

      <label htmlFor = "email-input" className = "popup-form__label login__label" > Email < /label>
      <input type = 'email' name = 'email' id = 'email-input' className = 'form__input popup-form__input login__email'
        placeholder = 'Enter email' onChange = {props.handleChangeEmail} noValidate / >
      <span id = 'email-input-error' className = 'form__input-error' > {props.emailInputError && props.emailInputError} < /span>
      <label htmlFor = "password-input" className = "popup-form__label login__label" > Password < /label>
      <input type = 'password' name = 'password' id = 'password-input' className = 'form__input popup-form__input login__password'
          placeholder = 'Enter password' onChange = {props.handleChangePassword} noValidate / >
      <span id = 'password-input-error' className = 'form__input-error' > {props.passwordInputError && props.passwordInputError} < /span>
    </PopupWithForm>
    </>
  );
}

export default PopupSignIn;
