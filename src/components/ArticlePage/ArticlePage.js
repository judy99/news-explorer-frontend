import React from 'react';
import Header from '../Header/Header.js';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';
import SavedNews from '../SavedNews/SavedNews.js';
import './ArticlePage.css';

function ArticlePage(props) {
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
      articleNumber={props.articleNumber}
      keywordArray={props.keywordArray}
      keywordArrayNumber={props.keywordArrayNumber} />

      <main className='main'>
        <SavedNews
        newsCards={props.newsCards}
        onCardDelete={props.onCardDelete}
        isMainPage={props.isMainPage}
        loggedIn={props.loggedIn} />
      </main>
    </div>
  );
}

export default ArticlePage;
