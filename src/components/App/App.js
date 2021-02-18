import React, {useRef} from 'react';
import { Route, Switch, BrowserRouter, Redirect, useHistory } from 'react-router-dom';
import './App.css';
import MainPage from '../MainPage/MainPage.js';
import {newsApi} from '../../utils/NewsApi.js';
import MainApi from '../../utils/MainApi.js';
import * as auth from '../../utils/auth.js';

import ArticlePage from '../ArticlePage/ArticlePage.js';
import {CurrentUserContext} from '../../contexts/CurrentUserContext.js';
import Footer from '../Footer/Footer.js';

import { MIN_LENGTH_NAME, MIN_LENGTH_PASSWORD } from '../../utils/consts.js';
import { httpStatusCode } from '../../utils/utils.js';

function App() {
  const ARTICLES_TO_SHOW = 3;
  const MAX_ARTICLES_TO_GET = 20;
  const SEARCH_RANGE_IN_DAYS = 7;

  const DELAY_REDIRECT = 1000;

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [newsCards, setNewsCards] = React.useState(new Array(0));
  const [savedArticles, setSavedArticles] = React.useState([]);

  const [cardsToShow, setCardsToShow] = React.useState(ARTICLES_TO_SHOW);

  const [currentUser, setCurrentUser] = React.useState({});
  const [token, setToken] = React.useState('');
  const [isMainPage, setMainPage] = React.useState(true);
  const [isSingInPopup, setSignInPopup] = React.useState(false);
  const [isSingUpPopup, setSignUpPopup] = React.useState(false);
  const [isMobileMenuActive, setMobileMenuActive] = React.useState(false);
  const [isMobileMenuIcon, setMobileMenuIcon] = React.useState(true);
  const [keyword, setKeyword] = React.useState('');
  const [keywordArray, setKeywordArray] = React.useState([]);
  const [isRegistrationSuccess, setRegistrationSuccess] = React.useState(false);
  const [isRegistrationPopup, setRegistrationPopup] = React.useState(false);
  const [isPopup, setPopup] = React.useState(isSingInPopup || isSingUpPopup || isRegistrationPopup);
  const [isSearching, setSearching] = React.useState(false);
  const [isNotFound, setNotFound] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [nameInputError, setNameInputError] = React.useState('');
  const [emailInputError, setEmailInputError] = React.useState('');
  const [passwordInputError, setPasswordInputError] = React.useState('');
  const [formError, setFormError] = React.useState('');
  const [nameInput, setNameInput] = React.useState('');
  const [passwordInput, setPasswordInput] = React.useState('');
  const [emailInput, setEmailInput] = React.useState('');

  const [isRegestered, setIsRegistered] = React.useState(false);

  const [searchInput, setSearchInput] = React.useState('');
  const [searchInputError, setSearchInputError] = React.useState('');

  const [submitBtnState, setSubmitBtnState] = React.useState(false);

  const firstRender = useRef(true);
  const [isErrorMessage, setErrorMessage] = React.useState('');

  const history = useHistory();

  const mainApi = new MainApi({
  baseUrl: 'http://localhost:5000',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
});

  // const currentUser = React.useContext(CurrentUserContext);

  // React.useEffect(() => {
  //     if (loggedIn && token)
  //     {
  //       setIsLoading(true);
  //       mainApi.getUserInfo()
  //       .then((data) => {
  //         // console.log('data from getUserInfo: ', data);
  //         setCurrentUser(data);
  //         // console.log('current user is0000 : ', currentUser);
  //         // setCards(data[0]);
  //       })
  //       .catch((err) => console.log(err))
  //       .finally(() => setIsLoading(false))
  //   }
  // }, [token, loggedIn]);



// *** auth copy
function handleSignup(email, password, name) {
    auth.register(email, password, name)
    .then((res) => {
      console.log('register res:', res);
      if (res instanceof Error) {
        if (res.message === String(httpStatusCode.BAD_REQUEST)) {
          setIsRegistered(false);
          setFormError('This email is not available');
          throw new Error('One of the fields was filled in incorrectly');
        }
      else {
        // setFormError('');
        setSignUpPopup(false);
        setRegistrationPopup(true);
        setRegistrationSuccess(true);
        setIsRegistered(true);
        return res;
      }
  }
})
    .then((res) => {
      console.log('sign up', res);
      if (!(res instanceof Error)) {
        setTimeout(() => {
          handlePopupClose();
          // history.push('/signin');
        }, DELAY_REDIRECT);
      }
    })
    .catch((err) => console.log(err))
    .finally(() => setFormError(''));
}

function handleLogin(email, password) {
  setIsLoading(true);
  auth.authorize(email, password)
  .then((data) => {
    console.log('user data after login', data);
      if (data instanceof Error) {
        setLoggedIn(false);
        if (data.message === String(httpStatusCode.BAD_REQUEST))
          throw new Error('One or more of the fields were not provided.');
        if (data.message === String(httpStatusCode.UNAUTHORIZED))
          throw new Error('The user with the specified email not found.');
      }
      else if (data.token) {
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
        setToken(data.token);
        // console.log('token after sign in', token);
        // setCurrentUser({ _id, email, name });
        // setUsername(username);
        handlePopupClose();
        // history.push("/");
        return;
      } else {
        console.log('no token yet. need to go to user data');
      }
  })
  .catch((err) => console.log(err))
  .finally(() => setIsLoading(false));
}

React.useEffect(() => {
  const jwt = localStorage.getItem('jwt');
  console.log('jwt', jwt);
  if (jwt) {
        setIsLoading(true);
        auth.getContent(jwt)
        .then((res) => {
          if (res instanceof Error) {
            if (res.message === String(httpStatusCode.UNAUTHORIZED))
              throw new Error('The provided token is invalid.');
          }
            setLoggedIn(true);
            setCurrentUser(res);
            setToken(jwt);
            console.log('current user in jwt: ', currentUser);
          })
        // .then(() => history.push('/'))
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false))
  }
  else {
    // history.push('/signin');
    setIsLoading(false);
    console.log('no logged user ');
  }
}, []);

// after change token get usef info
React.useEffect(() => {
    if (loggedIn) {
      // trying to get current user
      console.log('************* trying to get current user with token', token);
      auth.getContent(localStorage.getItem('jwt'))
      .then((user) => {
        console.log('user is: ', user);
        setCurrentUser(user);
      })
      .catch((err) => console.log(err)
    );
  } else {
    console.log('token=', token);
  }
}, [loggedIn]);

// get all saved articles after having currentUser
React.useEffect(() => {
    // setIsLoading(true);
    if (loggedIn) {
      console.log('before getting saved articles');
      console.log('useEffect current user = ', currentUser);
      console.log('useEffect id = ', currentUser._id);

      mainApi.getSavedArticles(currentUser._id)
      .then((res) => {
        console.log('res saved articles: ', res);
        setSavedArticles(res);
      })
      .catch((err) => console.log(err)
    );
  } else {
    console.log('no saved articles');
  }
}, [currentUser]);

  React.useEffect(() => {
    if (loggedIn) {
      const keywords = savedArticles.map((item) => item.keyword.toLowerCase());
      const uniqueKeywords = [...new Set(keywords)];
      setKeywordArray(uniqueKeywords);
      console.log('keywordArray:::', uniqueKeywords);
    }
  }, [savedArticles]);

  React.useEffect(() => {
    setNewsCards([]);
  }, [isMainPage, loggedIn]);


// logout the website
  function handleLogoutBtn () {
    localStorage.removeItem('jwt');
    setMobileMenuActive(false);
    setMobileMenuIcon(true);
    setLoggedIn(false);
    setCurrentUser({});
    setNewsCards([]);
    // history.push('/');
  };

// open sign in popup
  function handleLoginBtn () {
    setSignInPopup(true);
    setMobileMenuActive(false);
    // setLoggedIn(true);
    setMobileMenuIcon(false);
  };

// login to the website
  // function handleLogin () {
    // handlePopupClose();
    // setMobileMenuActive(false);
    // setMobileMenuIcon(true);
    // setLoggedIn(true);
    // setCurrentUser(currentUser);
  // }


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
    setFormError('');
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
    // console.log(e.target.value);
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
        pageSize: MAX_ARTICLES_TO_GET,
      })
      .then(res => {
        if (res.articles.length !== 0) {
          const result = res.articles.map((item) => {
            return {
              author: item.author,
              title: item.title,
              text: item.content,
              date: item.publishedAt,
              source: item.source.name,
              link: item.url,
              image: item.urlToImage,
             }
          });

          setNewsCards(result);
          setNotFound(false);
          setKeyword(searchInput);
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
          // setKeyword('');
      });
    } else {
      setSearchInputError('Please enter a keyword');
      setSearching(false);
      setKeyword('');
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

  function handleShowMore () {
    setCardsToShow((numArticles) => {
      return numArticles += ARTICLES_TO_SHOW;
    });
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


// save article
// click on flag icon
function onCardSave (article) {
  console.log('article', article);

  mainApi.addArticle(article).then((res) => {
    console.log('res article: ', res);
    setSavedArticles([...savedArticles, res]);
  })
    .catch((err) => {
      console.log('article inside error: ', article);
      console.log(err)})
    .finally(() => {});
}

// click on trash can icon
function onCardDelete (article) {
  setIsLoading(true);
    mainApi.removeArticle(article._id).then(() => {

    // Create a new array based on the existing one and removing a card from it
      const newArticles = savedArticles.filter((art) => art._id !== article._id);
    // Update the state
    console.log('article._id', article._id);
      setSavedArticles(newArticles);
    })
    .catch((err) => console.log(err))
    .finally(() => setIsLoading(false))
}

  return (
  <div className='page'>
  <BrowserRouter>
  <CurrentUserContext.Provider value={currentUser} >
  <Switch>
  <Route exact path='/'>
    <MainPage
    loggedIn={loggedIn}
    isLoading={isLoading}
    onLoginBtn={handleLoginBtn}
    onLogoutBtn={handleLogoutBtn}
    // onLogin={handleLogin}
    newsCards={newsCards}
    isMainPage={isMainPage}
    setMainPage={setMainPage}
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
    onShowMore={handleShowMore}

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
    cardsToShow={cardsToShow}

    keyword={keyword}
    savedArticles={savedArticles}
    setSavedArticles={setSavedArticles}

    handleSignup={ () => handleSignup(emailInput, passwordInput, nameInput) }
    handleLogin={ () => handleLogin(emailInput, passwordInput) }

    />
    </Route>

    <Route exact path='/saved-news'>
      { !loggedIn && <Redirect to='/' /> }
      <ArticlePage
      loggedIn={loggedIn}
      isLoading={isLoading}
      onLogoutBtn={handleLogoutBtn}
      isMainPage={isMainPage}
      setMainPage={setMainPage}
      isMobileMenuActive={isMobileMenuActive}
      setMobileMenuActive={setMobileMenuActive}
      isMobileMenuIcon={isMobileMenuIcon}
      setMobileMenuIcon={setMobileMenuIcon}
      setKeywordArray={setKeywordArray}
      keywordArray={keywordArray}
      keyword={keyword}
      savedArticles={savedArticles}
      setSavedArticles={setSavedArticles}
      onCardDelete={onCardDelete}

      // curUser={testUser._id}
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
