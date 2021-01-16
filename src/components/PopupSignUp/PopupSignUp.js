import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';

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
      <label htmlFor="email-input" className="popup-form__label signup__label">Email</label>
      <input type='email' name='email' id='email-input' className='form__input popup-form__input signup__email' placeholder='Enter email' onChange={props.handleChangeEmail} noValidate />
      <span id='email-input-error' className='form__input-error'>{props.emailInputError && props.emailInputError}</span>

      <label htmlFor="password-input" className="popup-form__label signup__label">Password</label>
      <input type='password' name='password' id='password-input' className='form__input popup-form__input signup__password' placeholder='Enter password' onChange={props.handleChangePassword} noValidate />
      <span id='password-input-error' className='form__input-error'>{props.passwordInputError && props.passwordInputError}</span>

      <label htmlFor="username-input" className="popup-form__label signup__label">Username</label>
      <input type='username' name='username' id='username-input' className='form__input popup-form__input signup__username' placeholder='Enter your username' onChange={props.handleChangeUsername} noValidate />
      <span id='username-input-error' className='form__input-error'>{props.nameInputError && props.nameInputError}</span>
    </PopupWithForm>
    </>
  );
}

export default PopupSignUp;
