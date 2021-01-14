import React from 'react';
import Header from '../Header/Header.js';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';
import NewsCardList from '../NewsCardList/NewsCardList.js';


function ArticlePage(props) {
  return (
    <div className="page__top articles-page__top">
      <Header
      loggedIn={props.loggedIn}
      onLogoutBtn={props.onLogoutBtn}
      onLogout={props.onLogout}
      isMainPage={props.isMainPage}
      isMobileMenuActive={props.isMobileMenuActive}
      setMobileMenuActive={props.setMobileMenuActive}
      isMobileMenuIcon={props.isMobileMenuIcon}
      setMobileMenuIcon={props.setMobileMenuIcon}
      />

      <SavedNewsHeader
      articleNumber={props.articleNumber}
      keywordArray={props.keywordArray}
      keywordArrayNumber={props.keywordArrayNumber}  />

      <main className="main">
      <div className="search-results">
      <NewsCardList
      newsCards={props.newsCards}
      onCardDelete={props.onCardDelete}
      isMainPage={props.isMainPage} />
      </div>
      </main>

    </div>

  );
}

export default ArticlePage;
