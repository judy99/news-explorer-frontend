import React, {useRef} from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage.js';
import ArticlePage from './components/ArticlePage/ArticlePage.js';
// import ProtectedRoute from './components/ProtectedRoute';
import {CurrentUserContext} from './contexts/CurrentUserContext.js';
// import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';


function App() {

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [newsCards, setNewsCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isArticlePage, setArticlePage] = React.useState(false);
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


  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  const [nameInputError, setNameInputError] = React.useState('');
  const [emailInputError, setEmailInputError] = React.useState('');
  const [passwordInputError, setPasswordInputError] = React.useState('');
  const [formError, setFormError] = React.useState('');

  const [nameInput, setNameInput] = React.useState('');
  const [passwordInput, setPasswordInput] = React.useState('');
  const [emailInput, setEmailInput] = React.useState('');

  const [submitBtnState, setSubmitBtnState] = React.useState(false);

  const firstRender = useRef(true);

  const MIN_LENGTH_NAME = 2;
  const MIN_LENGTH_PASSWORD = 8;

  const testUser1 = {username: 'EliseTest1', login: 'elisetest1@test.com'};
  const testUser2 = {username: 'Elise2', login: 'elise2@test.com'};

  const News = [
    {
      _id: 1,
      date: 'November 4, 2020',
      title: 'Everyone Needs a Special "Sit Spot" in Nature',
      content: 'Ever since I read Richard Louv\'s influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find',
      source: 'treehugger',
      saved: false,
    },
    {
      _id: 2,
      date: 'November 5, 2020',
      title: 'Nature makes you better',
      content: 'We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the way dappled sunlight dances through leaves.',
      source: 'national geographic',
      saved: false,

    },
    {
      _id: 3,
      date: 'November 6, 2020',
      title: 'Nostalgic Photos of Tourists in U.S. National Parks',
      content: 'Uri Løvevild Golman and Helle Løvevild Golman are National Geographic Explorers and conservation photographers who just completed a project and book they call their love letter to...',
      source: 'national geographic',
      saved: false,

    },
    {
      _id: 4,
      date: 'November 7, 2020',
      title: 'Grand Teton Renews Historic Crest Trail',
      content: '“The linking together of the Cascade and Death Canyon trails, at their heads, took place on October 1, 1933, and marked the first step in the realization of a plan whereby the hiker will be...',
      source: 'National parks traveler',
      saved: false,

    },
    {
    _id: 5,
    date: 'March 16, 2020',
    title: 'Scientists Don\'t Know Why Polaris Is So Weird ',
    content: 'Humans have long relied on the starry sky to push into new frontiers, sail to the very edge of the world and find their way back home again. Even animals look to the stars to guide them. ',
    source: 'treehugger',
    saved: false,
    }

  ];

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
    // resetForm();
  }

  const validateName = (input) => {
    return (input.length < MIN_LENGTH_NAME) ? false : true;
  }
  //
  const validateEmail = (input) => {
    return (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(input.trim())) ? false : true;
  }
  //
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

// todo: while registering
  function checkUsername () {
    // check if the username already exist
    // get username if it does not exist in db
    if (username) {
      setFormError('');
    } else {
      setFormError('This username is not available.');
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

// ???
  React.useEffect( () => setPopup(isSingInPopup || isSingUpPopup || isRegistrationPopup)
, [isSingInPopup, isSingUpPopup, isRegistrationPopup]);

// click link on popup
  function handleClickLinkSignup () {
    handlePopupClose();
    setSignUpPopup(true);
    // setSignInPopup(false);
    setMobileMenuIcon(false);
    setSubmitBtnState(false);
    // fetch
    // setRegistrationSuccess(true);
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
    // get info from server successfully (user info)
      // e.preventDefault();
      setSignUpPopup(false);
      setRegistrationPopup(true);
      setRegistrationSuccess(true);
  }

// click to search by keyword
  function handleSubmitSearch (e) {
    e.preventDefault();
    setSearching(true);
    setTimeout(function() {
      setSearching(false);
      setNewsCards(News);
      // setNotFound(true);
    }
    , 3000);


    // call API

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


  return (
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
      newsCards={News}
      />
    </Route>
  </Switch>
  < /CurrentUserContext.Provider>
  <Footer />
  </BrowserRouter>
  );
}

export default App;
