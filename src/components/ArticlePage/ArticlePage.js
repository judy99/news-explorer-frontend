import React, {useState, useEffect} from 'react';
import Header from '../Header/Header.js';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';
import SavedNews from '../SavedNews/SavedNews.js';
import './ArticlePage.css';

function ArticlePage(props) {

  useEffect(() => {
    props.setMainPage(false);
  }, []);

  return (
    <div className='page__top articles-page__top'>
      <Header
      loggedIn={props.loggedIn}
      onLogoutBtn={props.onLogoutBtn}
      onLogout={props.onLogout}
      isMainPage={props.isMainPage}
      isMobileMenuActive={props.isMobileMenuActive}
      setMobileMenuActive={props.setMobileMenuActive}
      isMobileMenuIcon={props.isMobileMenuIcon}
      setMobileMenuIcon={props.setMobileMenuIcon} />

      <SavedNewsHeader
      keywordArray={props.keywordArray}
      savedArticles={props.savedArticles}
      loggedIn={props.loggedIn}
       />

      <main className='main'>
        <SavedNews
        onCardDelete={props.onCardDelete}
        isMainPage={props.isMainPage}
        loggedIn={props.loggedIn}
        savedArticles={props.savedArticles}
        keyword={props.keyword}
        keywordArray={props.keywordArray}
        isLoading={props.isLoading}
         />
      </main>
    </div>
  );
}

export default ArticlePage;
