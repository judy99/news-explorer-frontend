import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage.js';
import ArticlePage from './components/ArticlePage/ArticlePage.js';
import ProtectedRoute from './components/ProtectedRoute';
import {CurrentUserContext} from './contexts/CurrentUserContext.js';
import Header from './components/Header/Header.js';
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

  function handleLogoutBtn () {
    setLoggedIn(false);
    setCurrentUser(null);
    setMobileMenuActive(false);
    setMobileMenuIcon(true);
  };

  function handleLoginBtn () {
    setSignInPopup(true);
    setMobileMenuActive(false);
    setLoggedIn(true);
    setMobileMenuIcon(false);
    setCurrentUser('Elise123');
  };

  function handleLogin () {
    handlePopupClose();
    setMobileMenuActive(false);
    setMobileMenuIcon(true);
  }

  function handleLogout () {
    setLoggedIn(false);
    setCurrentUser(null);
    setMobileMenuIcon(true);
  }

  function handlePopupClose () {
    setSignInPopup(false);
    setSignUpPopup(false);
    setMobileMenuIcon(true);
    setRegistrationPopup(false);
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


  function handleClickLinkSignup () {
    setSignUpPopup(true);
    setSignInPopup(false);
    setMobileMenuIcon(false);
    // fetch
    setRegistrationSuccess(true);
  }

  function handleClickLinkSignin (e) {
    handlePopupClose();
    setSignInPopup(true);
    setMobileMenuIcon(false);
  }


// TODO
  function handleRegistration (e) {
    // get info from server successfully (user info)
      e.preventDefault();
      setSignUpPopup(false);
      setRegistrationPopup(true);
      setRegistrationSuccess(true);
  }

  return (
  <BrowserRouter>
  <CurrentUserContext.Provider value={currentUser} >
  <Switch>
  <Route exact path="/">
    <MainPage
    loggedIn={loggedIn}
    onLoginBtn={handleLoginBtn}
    onLogoutBtn={handleLogoutBtn}
    onLogin={handleLogin}
    onLogout={handleLogout}
    newsCards={News}
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
    isPopup={isPopup}
    handleRegistration={handleRegistration}
    />
    </Route>

    <Route exact path='/saved-news'>
      <ArticlePage
      loggedIn={loggedIn}
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
