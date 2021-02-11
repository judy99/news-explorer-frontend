import React, {useRef} from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';
import MainPage from '../MainPage/MainPage.js';
import {newsApi} from '../../utils/NewsApi.js';
import {mainApi} from '../../utils/MainApi.js';

import ArticlePage from '../ArticlePage/ArticlePage.js';
import {CurrentUserContext} from '../../contexts/CurrentUserContext.js';
import Footer from '../Footer/Footer.js';

import { MIN_LENGTH_NAME, MIN_LENGTH_PASSWORD } from '../../utils/consts.js';

function App() {
  const ARTICLES_TO_SHOW = 3;
  const MAX_ARTICLES_TO_GET = 20;
  const SEARCH_RANGE_IN_DAYS = 7;

  const testUser = {
  _id:"5fc56a42f9eb4b959febf0dd",
  name:"test1",
  email:"test1@mail.com",
}

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [newsCards, setNewsCards] = React.useState(new Array(0));
  const [savedArticles, setSavedArticles] = React.useState([]);

  const [cardsToShow, setCardsToShow] = React.useState(ARTICLES_TO_SHOW);

  const [currentUser, setCurrentUser] = React.useState({});
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

  // const testUser1 = {id: 1, username: 'EliseTest1', login: 'elisetest1@test.com'};

  // keyword — the word by which the articles are searched. A string, required field.
  // title — an article title (string, required).
  // text — the article text (string, required).
  // date — the article date (string, required).
  // source — the article source (string, required).
  // link — a link to the article (string, required, must be a URL address).
  // image — a link to the image for the article (string, required, must be a URL address).
  // owner — the _id of the user who saved the article. You need to set the default behavior so that the database doesn't return this field.

  // React.useEffect(() => {
  //   if (isLoading) {
  //     return <Spinner />
  //   }
  // }, [isLoading]
  // );

React.useEffect(() => {
// get all saved articles at first rendering
    // setIsLoading(true);
    if (loggedIn) {
      mainApi.getSavedArticles(testUser._id).then((res) => {
        console.log('res saved articles: ', res);
        setSavedArticles(res);
        // setKeywordArray(res.map((item) => item.keyword));
      })
      .catch((err) => console.log(err)
      // .finally(() => setIsLoading(false))
    );
    }
}, [testUser._id, loggedIn]);

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
    setCurrentUser(testUser);
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

// React.useEffect(() => {
//   console.log('keyword array in useEffect App', keywordArray);
//   if (loggedIn) {
//     if (keyword !== '') {
//       keywordArray.every((item) => item !== keyword);
//       setKeywordArray(...keywordArray, keyword);
//     }
//   }
// }, [savedArticles]);

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
      // ???
      // setKeyword(searchInput);


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

          // setNewsCards(res.articles);
          setNewsCards(result);
          setNotFound(false);
          setKeyword(searchInput);
        } else {
          setSearching(false);
          setNotFound(true);
          // setKeyword('');
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

  // console.log('article: ', typeof (article));
  // const {keyword, title, text, date, source, link, image, owner} = article;
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
    onLogin={handleLogin}
    newsCards={newsCards}
    // newsCards={News}
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
      // articleNumber={articleNumber}
      keywordArray={keywordArray}
      keyword={keyword}
      // newsCards={newsCards}
      savedArticles={savedArticles}
      setSavedArticles={setSavedArticles}
      onCardDelete={onCardDelete}

      curUser={testUser._id}
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
