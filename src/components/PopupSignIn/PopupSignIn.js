import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import FormField from '../FormField/FormField.js';

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
      onSubmit = {props.handleLogin}
      submitBtnState={props.submitBtnState}
      handleChangeEmail={props.handleChangeEmail}
      handleChangePassword={props.handleChangePassword}
      emailInputError = {props.emailInputError}
      passwordInputError = {props.passwordInputError} >

      <FormField nameField='email' typeField='login' handleChange={props.handleChangeEmail} inputError={props.emailInputError} />
      <FormField nameField='password' typeField='login' handleChange={props.handleChangePassword} inputError={props.passwordInputError} />

    </PopupWithForm>
    </>
  );
}

export default PopupSignIn;
