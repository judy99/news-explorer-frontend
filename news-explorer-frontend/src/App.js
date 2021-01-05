import React from 'react';
import MainPage from './components/MainPage/MainPage.js';
import ArticlePage from './components/ArticlePage/ArticlePage.js';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import {CurrentUserContext} from './contexts/CurrentUserContext.js';
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
      title: 'Everyone Needs a Special "Sit Spot" in Nature',
      content: 'Ever since I read Richard Louv\'s influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find',
      source: 'treehugger',
      saved: false,

    },
    {
      _id: 3,
      date: 'November 6, 2020',
      title: 'Everyone Needs a Special "Sit Spot" in Nature',
      content: 'Ever since I read Richard Louv\'s influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find',
      source: 'treehugger',
      saved: false,

    },
    {
      _id: 4,
      date: 'November 7, 2020',
      title: 'Everyone Needs a Special "Sit Spot" in Nature',
      content: 'Ever since I read Richard Louv\'s influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find',
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
  }

  function handleClickLinkSignup () {
    setSignUpPopup(true);
    setSignInPopup(false);
    setMobileMenuIcon(false);
  }

  function handleClickLinkSignin (e) {
    handlePopupClose();
    setSignInPopup(true);
    setMobileMenuIcon(false);
  }

  // function keywordArrayToString () {
  //   return keywordArray.join(',');
  // }

  return (
  <BrowserRouter>
  <Switch>
  <CurrentUserContext.Provider value={currentUser} >
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
    />
    </Route>

    <ProtectedRoute path='/saved-news'
      component={ArticlePage}
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

    < /CurrentUserContext.Provider>
  </Switch>
  <Footer />
  </BrowserRouter>
  );
}

export default App;
