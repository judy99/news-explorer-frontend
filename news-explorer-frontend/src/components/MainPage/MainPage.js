import React from 'react';
import Header from '../Header/Header.js';
import Search from '../Search/Search.js';
import Main from '../Main/Main.js';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import PopupInfo from '../PopupInfo/PopupInfo.js';



function MainPage (props) {

  return (
  <>
    <div className="page__top" onKeyPress={props.onKeyPress} tabIndex='0'>
      <Header
      loggedIn={props.loggedIn}
      onLogoutBtn={props.onLogoutBtn}
      onLoginBtn={props.onLoginBtn}
      isMainPage={props.isMainPage}
      isMobileMenuActive={props.isMobileMenuActive}
      setMobileMenuActive={props.setMobileMenuActive}
      isMobileMenuIcon={props.isMobileMenuIcon}
      setMobileMenuIcon={props.setMobileMenuIcon}
      />
      <Search />
      <Main loggedIn={props.loggedIn} newsCards={props.newsCards} isMainPage={props.isMainPage}/>
    </div>
    <PopupWithForm isSingInPopup={props.isSingInPopup} onPopupClose={props.onPopupClose} name='login' title='Sign in' linkName='Sign up' onClickLink={props.handleClickLinkSignup} onSubmit={props.handleSign} isPopup={props.isPopup}>
      <label htmlFor="email-input" className="popup-form__label login__label">Email</label>
      <input type='email' name='email' id='email-input' className='form__input popup-form__input login__email' placeholder='Enter email' onChange={props.handleChangeEmail} required />
      <span id='email-input-error' className='form__input-error'></span>

      <label htmlFor="password-input" className="popup-form__label login__label">Password</label>
      <input type='password' name='password' id='password-input' className='form__input popup-form__input login__password' placeholder='Enter password' onChange={props.handleChangePassword} required />
      <span id='password-input-error' className='form__input-error'></span>
    </PopupWithForm>

    <PopupWithForm isSingUpPopup={props.isSingUpPopup}
    onPopupClose={props.onPopupClose}
    name='signup' title='Sign up'
    linkName='Sign in'
    onClickLink={props.handleClickLinkSignin}
    onSubmit={props.handleRegistration}
    isPopup={props.isPopup}
    >
      <label htmlFor="email-input" className="popup-form__label signup__label">Email</label>
      <input type='email' name='email' id='email-input' className='form__input popup-form__input signup__email' placeholder='Enter email' onChange={props.handleChangeEmail} required />
      <span id='email-input-error' className='form__input-error'></span>

      <label htmlFor="password-input" className="popup-form__label signup__label">Password</label>
      <input type='password' name='password' id='password-input' className='form__input popup-form__input signup__password' placeholder='Enter password' onChange={props.handleChangePassword} required />
      <span id='password-input-error' className='form__input-error'></span>

      <label htmlFor="username-input" className="popup-form__label signup__label">Username</label>
      <input type='username' name='username' id='username-input' className='form__input popup-form__input signup__username' placeholder='Enter your username' onChange={props.handleChangeUsername} required />
      <span id='username-input-error' className='form__input-error'></span>
    </PopupWithForm>

    <PopupInfo
    isRegistrationSuccess={props.isRegistrationSuccess}
    isRegistrationPopup={props.isRegistrationPopup}
    linkName="Sign in"
    title="Registration successfully completed!"
    onClickLink={props.onClickLink}
    onPopupClose={props.onPopupClose}
    isPopup={props.isPopup} />
  </>
  );
}
export default MainPage;
