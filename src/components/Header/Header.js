import React from 'react';
import { NavLink } from 'react-router-dom';
import {TopMenuItems} from '../Navigation/TopMenuItems.js';
import {Button} from '../Button/Button.js';
import BurgerMenu from '../BurgerMenu/BurgerMenu.js';
import {CurrentUserContext} from '../../contexts/CurrentUserContext.js';
import './Header.css';

function Header (props) {
  const currentUser = React.useContext(CurrentUserContext);
  const btnStyleLogout = 'btn-header btn-header_login';
  const btnStyleLogin = 'btn-header btn-header_logout';
  const btnThemeLight = 'btn-header_theme_light';

  // function handleHamburgerMenuClick () {
  //   props.setMobileMenuActive(!props.isMobileMenuActive);
  // }
  //
  function handleMenuItemClick () {
    props.setMobileMenuActive(false);
  }

  return (
  <header className={`header
    ${!props.isMainPage && ' articles-page__header'}
    ${(!props.isMainPage && props.isMobileMenuActive) && ' articles-page__header_active'}`}
    style={ (props.isMobileMenuActive && !props.isSingInPopup) ? {backgroundColor:'#1A1B22'} : {backgroundColor:'transparent'}} >

    <div className='header__wrapper'>

      <NavLink to='/' className={`logo header__logo ${!props.isMainPage && 'logo_theme_light' } `}>NewsExplorer</NavLink>

      <BurgerMenu isMainPage={props.isMainPage} isMobileMenuActive={props.isMobileMenuActive} isMobileMenuIcon={props.isMobileMenuIcon} setMobileMenuActive={props.setMobileMenuActive} />

      <nav className={`header__menu header__menu${props.isMobileMenuActive && '_active'}`}>
        <ul className='menu main-menu'>
          {
            props.loggedIn ?
              TopMenuItems.map((item, index) => {
                return (
                  <li key={index} className={item.cWrapper} onClick={handleMenuItemClick} >
                    <NavLink exact to={item.url}
                    className={`${item.cLink} ${!props.isMainPage && item.cLinkLight}` }
                    activeClassName={item.activeStyle}>{item.title}
                    </NavLink>
                  </li>
                );
              }) :
              TopMenuItems.filter((item) => item.forLoggedOnly === false).map((item, index) => {
                return (
                  <li key={index} className={item.cWrapper}>
                    <NavLink exact to={item.url} className={`${item.cLink} ${!props.isMainPage && item.cLinkLight}` } activeClassName={item.activeStyle}>{item.title}</NavLink>
                  </li>
                );
              })
          }
        </ul>
        {
          props.loggedIn ?
            <Button btnStyle={`${btnStyleLogin} ${!props.isMainPage && btnThemeLight}` } onClick={props.onLogoutBtn}>{currentUser.username}</Button>
            :
            <Button btnStyle={`${btnStyleLogout} ${!props.isMainPage && btnThemeLight}` } onClick={props.onLoginBtn}>Sign in</Button>
        }
      </nav>
    </div>
  </header>
  );
}

export default Header;
