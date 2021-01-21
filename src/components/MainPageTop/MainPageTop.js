import React from 'react';
import Header from '../Header/Header.js';
import Search from '../Search/Search.js';
import './MainPageTop.css';

function MainPageTop (props) {
  return (
    <>
      <div className='page__top' onKeyPress={props.onKeyPress} tabIndex='0'>
        <Header
        loggedIn={props.loggedIn}
        onLogoutBtn={props.onLogoutBtn}
        onLoginBtn={props.onLoginBtn}
        isMainPage={props.isMainPage}
        isMobileMenuActive={props.isMobileMenuActive}
        setMobileMenuActive={props.setMobileMenuActive}
        isMobileMenuIcon={props.isMobileMenuIcon}
        setMobileMenuIcon={props.setMobileMenuIcon} />
        <Search onSubmitSearch={props.onSubmitSearch} />
      </div>
    </>
  );
}
export default MainPageTop;
