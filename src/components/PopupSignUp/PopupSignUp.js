import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import FormField from '../FormField/FormField.js';


function PopupSignUp(props) {
  const popupName = 'signup';
  const popupTitle = 'Sign up';
  const popupBottomLink = 'Sign in';

  return (
    <>
    <PopupWithForm
      onPopupClose = {props.onPopupClose}
      name={popupName} title={popupTitle}
      linkName={popupBottomLink}
      onClickLink={props.handleClickLinkSignin}
      onSubmit={props.handleRegistration}
      submitBtnState={props.submitBtnState}
      emailInputError={props.emailInputError}
      passwordInputError={props.passwordInputError}
      nameInputError={props.nameInputError}
      handleChangeEmail={props.handleChangeEmail}
      handleChangePassword={props.handleChangePassword}
      handleChangeUsername={props.handleChangeUsername} >

      <FormField nameField='email' typeField='signup' handleChange={props.handleChangeEmail} inputError={props.emailInputError} />
      <FormField nameField='password' typeField='signup' handleChange={props.handleChangePassword} inputError={props.passwordInputError} />
      <FormField nameField='username' typeField='signup' handleChange={props.handleChangeUsername} inputError={props.nameInputError} />

    </PopupWithForm>
    </>
  );
}

export default PopupSignUp;
