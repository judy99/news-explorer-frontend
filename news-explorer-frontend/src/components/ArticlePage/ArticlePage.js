import React from 'react';
import Header from '../Header/Header.js';

function ArticlePage(props) {
  return (
    <div className="page__top articles-page__top">
      <Header
      loggedIn={props.loggedIn}
      isMainPage={props.isMainPage}
      isMobileMenuActive={props.isMobileMenuActive}
      setMobileMenuActive={props.setMobileMenuActive}
      isMobileMenuIcon={props.isMobileMenuIcon}
      setMobileMenuIcon={props.setMobileMenuIcon}
      
      />
      <h1>ArticlePage</h1>
    </div>
  );
}

export default ArticlePage;
