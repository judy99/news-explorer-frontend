import React from 'react';
import SearchResult from '../SearchResult/SearchResult.js';
import MainPageTop from '../MainPageTop/MainPageTop.js';
import About from '../About/About.js';
import PopupSignIn from '../PopupSignIn/PopupSignIn.js';
import PopupSignUp from '../PopupSignUp/PopupSignUp.js';
import PopupInfo from '../PopupInfo/PopupInfo.js';
import Preloader from '../Preloader/Preloader.js';
import Spinner from '../Spinner/Spinner.js';

import NotFound from '../NotFound/NotFound.js';
import ErrorMessage from '../ErrorMessage/ErrorMessage.js';
import './MainPage.css';

function MainPage (props) {
  React.useEffect(() => {
    props.setMainPage(true);
  }, []);


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
      onSubmitSearch={props.onSubmitSearch}
      searchInputError={props.searchInputError}
      handleChangeSearch={props.handleChangeSearch}
      searchInput={props.searchInput}
      setSearchInputError={props.setSearchInputError} />

      <main className='main'>
        { props.isLoading && <Spinner /> }
        { props.isSearching && <Preloader /> }
        { props.isNotFound && <NotFound title='Nothing found' text='Sorry, but nothing matched your search terms.'/>}
        { props.isErrorMessage && <ErrorMessage isErrorMessage={props.isErrorMessage}/>}

        { (!props.isNotFound && !props.isErrorMessage && props.newsCards.length ) ?
          <SearchResult loggedIn={props.loggedIn} newsCards={props.newsCards}
          isMainPage={props.isMainPage} cardsToShow={props.cardsToShow}
          onCardSave={props.onCardSave} onCardDelete={props.onCardDelete}
          onShowMore={props.onShowMore} keyword={props.keyword}
          savedArticles={props.savedArticles} setSavedArticles={props.setSavedArticles} />
         : null
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
