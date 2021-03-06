import React from 'react';
import SearchResult from '../SearchResult/SearchResult.js';
import MainPageTop from '../MainPageTop/MainPageTop.js';
import About from '../About/About.js';
import PopupSignIn from '../PopupSignIn/PopupSignIn.js';
import PopupSignUp from '../PopupSignUp/PopupSignUp.js';
import PopupInfo from '../PopupInfo/PopupInfo.js';
import Preloader from '../Preloader/Preloader.js';
import './MainPage.css';

function MainPage (props) {
  return (
    <>
      <MainPageTop
      loggedIn={props.loggedIn}
      onLogoutBtn={props.onLogoutBtn}
      onLoginBtn={props.onLoginBtn}
      isMainPage={props.isMainPage}
      isMobileMenuActive={props.isMobileMenuActive}
      setMobileMenuActive={props.setMobileMenuActive}
      isMobileMenuIcon={props.isMobileMenuIcon}
      setMobileMenuIcon={props.setMobileMenuIcon}
      onSubmitSearch={props.onSubmitSearch} />

      <main className='main'>
        { props.isSearching ? <Preloader /> :
          <SearchResult loggedIn={props.loggedIn} newsCards={props.newsCards} isMainPage={props.isMainPage} onCardSave={props.onCardSave} onCardDelete={props.onCardDelete} />
        }
      </main>
      <About />

      { props.isSingInPopup &&
        <PopupSignIn
        onPopupClose={props.onPopupClose}
        handleClickLinkSignup={props.handleClickLinkSignup}
        onLogin={props.onLogin}
        submitBtnState={props.submitBtnState}
        setSubmitBtnState = {props.setSubmitBtnState}

        emailInputError={props.emailInputError}
        passwordInputError={props.passwordInputError}

        emailInput={props.emailInput}
        passwordInput={props.passwordInput}

        handleChangeEmail={props.handleChangeEmail}
        handleChangePassword={props.handleChangePassword} >
        </PopupSignIn>
      }

      { props.isSingUpPopup &&
        <PopupSignUp
        onPopupClose={props.onPopupClose}
        handleClickLinkSignin={props.handleClickLinkSignin}
        handleRegistration={props.handleRegistration}
        submitBtnState={props.submitBtnState}
        emailInputError={props.emailInputError}
        passwordInputError={props.passwordInputError}
        nameInputError={props.nameInputError}

        emailInput={props.emailInput}
        passwordInput={props.passwordInput}
        nameInput={props.nameInput}

        handleChangeEmail={props.handleChangeEmail}
        handleChangePassword={props.handleChangePassword}
        handleChangeUsername={props.handleChangeUsername} >
        </PopupSignUp>
      }

      { (props.isRegistrationSuccess && props.isRegistrationPopup) &&
        <PopupInfo
        linkName='Sign in'
        title='Registration successfully completed!'
        onClickLink={props.handleClickLinkSignin}
        onPopupClose={props.onPopupClose} />
      }
    </>
  );
}
export default MainPage;
