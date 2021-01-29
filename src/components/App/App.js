import React, {useRef} from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';
import MainPage from '../MainPage/MainPage.js';
import {newsApi} from '../../utils/NewsApi.js';
import ArticlePage from '../ArticlePage/ArticlePage.js';
import {CurrentUserContext} from '../../contexts/CurrentUserContext.js';
import Footer from '../Footer/Footer.js';
import { MIN_LENGTH_NAME, MIN_LENGTH_PASSWORD } from '../../utils/consts.js';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [newsCards, setNewsCards] = React.useState(new Array(0));
  const [currentUser, setCurrentUser] = React.useState({});
  const [isMainPage, setMainPage] = React.useState(true);
  const [isSingInPopup, setSignInPopup] = React.useState(false);
  const [isSingUpPopup, setSignUpPopup] = React.useState(false);
  const [isMobileMenuActive, setMobileMenuActive] = React.useState(false);
  const [isMobileMenuIcon, setMobileMenuIcon] = React.useState(true);
  const [keywordArray, setKeywordArray] = React.useState(['Nature', 'Yellowstone', 'Photographer', 'Animals', 'Birds']);
  const [articleNumber, setArticleNumber] = React.useState(keywordArray.length);
  const [isRegistrationSuccess, setRegistrationSuccess] = React.useState(false);
  const [isRegistrationPopup, setRegistrationPopup] = React.useState(false);
  const [isPopup, setPopup] = React.useState(isSingInPopup || isSingUpPopup || isRegistrationPopup);
  const [isSearching, setSearching] = React.useState(false);
  const [isNotFound, setNotFound] = React.useState(false);
  // const [username, setUsername] = React.useState('');
  const [nameInputError, setNameInputError] = React.useState('');
  const [emailInputError, setEmailInputError] = React.useState('');
  const [passwordInputError, setPasswordInputError] = React.useState('');
  const [formError, setFormError] = React.useState('');
  const [nameInput, setNameInput] = React.useState('');
  const [passwordInput, setPasswordInput] = React.useState('');
  const [emailInput, setEmailInput] = React.useState('');

  const [searchInput, setSearchInput] = React.useState('');
  const [searchInputError, setSearchInputError] = React.useState('');

  const [submitBtnState, setSubmitBtnState] = React.useState(false);

  const firstRender = useRef(true);
  const [isErrorMessage, setErrorMessage] = React.useState('');

  // const [deleteCard, setDeleteCard] = React.useState(null);

  const testUser1 = {id: 1, username: 'EliseTest1', login: 'elisetest1@test.com'};

  // keyword — the word by which the articles are searched. A string, required field.
  // title — an article title (string, required).
  // text — the article text (string, required).
  // date — the article date (string, required).
  // source — the article source (string, required).
  // link — a link to the article (string, required, must be a URL address).
  // image — a link to the image for the article (string, required, must be a URL address).
  // owner — the _id of the user who saved the article. You need to set the default behavior so that the database doesn't return this field.

  // const NewsEmpty = [];

  const MAX_ARTICLES_TO_SHOW = 20;
  const SEARCH_RANGE_IN_DAYS = 7;

  // const News = [
  //   {
  //     _id: 1,
  //     keyword: 'Nature',
  //     date: 'November 4, 2020',
  //     title: 'Everyone Needs a Special "Sit Spot" in Nature',
  //     text: 'Ever since I read Richard Louv\'s influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find',
  //     source: 'treehugger',
  //     link: 'https://images.unsplash.com/photo-1590013330451-3946e83e0392',
  //     owner: [1,2,3],
  //   },
  //   {
  //     _id: 2,
  //     keyword: 'Nature',
  //     date: 'November 5, 2020',
  //     title: 'Nature makes you better',
  //     text: 'We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the way dappled sunlight dances through leaves.',
  //     source: 'national geographic',
  //     link: '/static/media/image_08.f7744e35.jpg',
  //     owner: [1,2,3],
  //
  //   },
  //   {
  //     _id: 3,
  //     keyword: 'Park',
  //     date: 'November 6, 2020',
  //     title: 'Nostalgic Photos of Tourists in U.S. National Parks',
  //     text: 'Uri Løvevild Golman and Helle Løvevild Golman are National Geographic Explorers and conservation photographers who just completed a project and book they call their love letter to...',
  //     source: 'national geographic',
  //     link: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f',
  //     owner: [1],
  //
  //   },
  //   {
  //     _id: 4,
  //     keyword: 'Nature',
  //     date: 'November 7, 2020',
  //     title: 'Grand Teton Renews Historic Crest Trail',
  //     text: '“The linking together of the Cascade and Death Canyon trails, at their heads, took place on October 1, 1933, and marked the first step in the realization of a plan whereby the hiker will be...',
  //     source: 'National parks traveler',
  //     link: 'https://images.unsplash.com/photo-1508007226633-b7de6a10cb16',
  //     owner: [2],
  //
  //   },
  //   {
  //   _id: 5,
  //   keyword: 'Birds',
  //   date: 'March 16, 2020',
  //   title: 'Scientists Don\'t Know Why Polaris Is So Weird ',
  //   text: 'Humans have long relied on the starry sky to push into new frontiers, sail to the very edge of the world and find their way back home again. Even animals look to the stars to guide them. ',
  //   source: 'treehugger',
  //   link: '/static/media/image_08.f7744e35.jpg',
  //   owner: [1],
  // },
  //
  // ];

// logout the website
  function handleLogoutBtn () {
    setLoggedIn(false);
    setCurrentUser(null);
    setMobileMenuActive(false);
    setMobileMenuIcon(true);
  };

// open sign in popup
  function handleLoginBtn () {
    setSignInPopup(true);
    setMobileMenuActive(false);
    // setLoggedIn(true);
    setMobileMenuIcon(false);
  };

// login to the website
  function handleLogin () {
    handlePopupClose();
    setMobileMenuActive(false);
    setMobileMenuIcon(true);
    setLoggedIn(true);
    setCurrentUser(testUser1);
  }


  function handlePopupClose () {
    setSignInPopup(false);
    setSignUpPopup(false);
    setMobileMenuIcon(true);
    setRegistrationPopup(false);
    setEmailInput('');
    setEmailInputError('');
    setPasswordInput('');
    setPasswordInputError('');
    setNameInput('');
    setNameInputError('');
    setSubmitBtnState(false);
  }

  const validateName = (input) => {
    return (input.length < MIN_LENGTH_NAME) ? false : true;
  }

  const validateEmail = (input) => {
    return (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(input.trim())) ? false : true;
  }

  const validatePassword = (input) => {
    return (input.length < MIN_LENGTH_PASSWORD) ? false : true;
  }

  function handleChangeEmail (e) {
    if (validateEmail(e.target.value)) {
      setEmailInput(e.target.value);
      setEmailInputError('');
    } else {
      setEmailInputError('Invalid email.');
    }
  }

  function handleChangePassword (e) {
    if (validatePassword(e.target.value)) {
      setPasswordInput(e.target.value);
      setPasswordInputError('');
    } else {
      setPasswordInputError('Invalid password.');
    }
  }

  function handleChangeUsername (e) {
    console.log(e.target.value);
    if (validateName(e.target.value)) {
      setNameInput(e.target.value);
      setNameInputError('');
    } else {
      setNameInputError('Invalid username.');
    }
  }

  React.useEffect(() => {
    const handleOutsidePressed = (e) => {
      if (e.target.classList.contains('popup_opened')) {
        handlePopupClose();
      }
    }
    window.addEventListener('click', handleOutsidePressed);
    return () => window.removeEventListener('click', handleOutsidePressed);
  }, [isPopup]);

  React.useEffect(() => {
    const handleEscPressed = (e) => {
      if (e.key === 'Escape') {
        handlePopupClose();
      }
    }
    window.addEventListener('keydown', handleEscPressed);
    return () => window.removeEventListener('keydown', handleEscPressed);
  }, [isPopup]);

  React.useEffect( () => setPopup(isSingInPopup || isSingUpPopup || isRegistrationPopup)
, [isSingInPopup, isSingUpPopup, isRegistrationPopup]);

// click link on popup
  function handleClickLinkSignup () {
    handlePopupClose();
    setSignUpPopup(true);
    setMobileMenuIcon(false);
    setSubmitBtnState(false);
  }

// click link on popup
  function handleClickLinkSignin () {
    handlePopupClose();
    setSignInPopup(true);
    setMobileMenuIcon(false);
    setSubmitBtnState(false);
  }

// click on Sign Up button on Sign Up popup
  function handleRegistration () {
    // api
    setSignUpPopup(false);
    setRegistrationPopup(true);
    setRegistrationSuccess(true);
  }

// click to search by keyword
  function handleSubmitSearch (e) {
    e.preventDefault();

    if (searchInput !== '') {
      setSearching(true);
      setSearchInputError('');

      let currentDate = new Date();

      newsApi.getCardsByKeyword({
        q: searchInput,
        apiKey: 'c61a554213c94eaf86690e2d6782eeb1',
        from: encodeURIComponent(new Date(currentDate.setDate(currentDate.getDate() - SEARCH_RANGE_IN_DAYS)).toISOString()),
        to: encodeURIComponent(new Date().toISOString()),
        pageSize: MAX_ARTICLES_TO_SHOW,
      })
      .then(res => {
        if (res.articles.length !== 0) {
          setNewsCards(res.articles);
          setNotFound(false);

        } else {
          setSearching(false);
          setNotFound(true);
        }
        setErrorMessage('');
      })
        .catch((err) => {
          console.log(err);
          setErrorMessage('Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.');
          setNotFound(false);
        })
        .finally(() => {
          setSearching(false);
      });
    } else {
      setSearchInputError('Please enter a keyword');
      setSearching(false);
    }
  }

  function handleChangeSearch (e) {
    console.log(e.target.value);
    if (e.target.value.trim() !== '') {
      setSearchInput(e.target.value);
      setSearchInputError('');
    } else {
      setSearchInput('');
      setSearchInputError('Please enter a keyword');
    }

  }

  React.useEffect(() => {
    // skip validation on first render
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const validateSignInForm = () => {
      return ((passwordInputError !== '' || emailInputError !== '') || (passwordInput === '' || emailInput === ''));
    }

    const validateSignUpForm = () => {
      return ((passwordInputError !== '' || emailInputError !== '' || nameInputError !== '') || (passwordInput === '' || emailInput === '' || nameInput === ''));
    }



    if (isSingUpPopup) {
      if (validateSignUpForm()) {
        setSubmitBtnState(false);
      } else
      {
        setSubmitBtnState(true);
      }
    }

    if (isSingInPopup) {
      if (validateSignInForm()) {
        setSubmitBtnState(false);
      } else
      {
        setSubmitBtnState(true);
      }
    }
}, [isSingInPopup, isSingUpPopup, emailInputError, passwordInputError, nameInputError, emailInput, passwordInput, nameInput]);


// card
function onCardSave () {
  // api
  // POST /articles
}

function onCardDelete (card) {
  // api
  // DELETE /articles/articleId
}

  return (
  <div className='page'>
  <BrowserRouter>
  <CurrentUserContext.Provider value={currentUser} >
  <Switch>
  <Route exact path='/'>
    <MainPage
    loggedIn={loggedIn}
    onLoginBtn={handleLoginBtn}
    onLogoutBtn={handleLogoutBtn}
    onLogin={handleLogin}
    newsCards={newsCards}
    // newsCards={News}
    isMainPage={isMainPage}
    isSingInPopup={isSingInPopup}
    isSingUpPopup={isSingUpPopup}
    onPopupClose={handlePopupClose}
    handleClickLinkSignup={handleClickLinkSignup}
    handleClickLinkSignin={handleClickLinkSignin}
    isMobileMenuActive={isMobileMenuActive}
    setMobileMenuActive={setMobileMenuActive}
    isMobileMenuIcon={isMobileMenuIcon}
    setMobileMenuIcon={setMobileMenuIcon}
    isRegistrationSuccess={isRegistrationSuccess}
    isRegistrationPopup={isRegistrationPopup}
    handleRegistration={handleRegistration}

    handleChangeEmail={handleChangeEmail}
    handleChangePassword={handleChangePassword}
    handleChangeUsername={handleChangeUsername}

    formError={formError}
    nameInputError={nameInputError}
    passwordInputError={passwordInputError}
    emailInputError={emailInputError}

    nameInput={nameInput}
    passwordInput={passwordInput}
    emailInput={emailInput}

    submitBtnState={submitBtnState}

    isSearching={isSearching}
    onSubmitSearch={handleSubmitSearch}
    isNotFound={isNotFound}
    isErrorMessage={isErrorMessage}
    searchInput={searchInput}
    searchInputError={searchInputError}
    handleChangeSearch={handleChangeSearch}
    setSearchInputError={setSearchInputError}

    onCardSave={onCardSave}
    onCardDelete={onCardDelete}
    />
    </Route>

    <Route exact path='/saved-news'>
      { !loggedIn && <Redirect to='/' /> }
      <ArticlePage
      loggedIn={loggedIn}
      onLogoutBtn={handleLogoutBtn}
      isMainPage={!isMainPage}
      isMobileMenuActive={isMobileMenuActive}
      setMobileMenuActive={setMobileMenuActive}
      isMobileMenuIcon={isMobileMenuIcon}
      setMobileMenuIcon={setMobileMenuIcon}
      articleNumber={articleNumber}
      keywordArray={keywordArray}
      newsCards={newsCards}
      />
    </Route>
  </Switch>
  < /CurrentUserContext.Provider>
  <Footer />
  </BrowserRouter>
  </div>
  );
}

export default App;
