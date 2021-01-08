import React from 'react';
import { NavLink } from 'react-router-dom';
import {TopMenuItems} from '../Navigation/TopMenuItems.js';
import {Button} from '../Button.js';
import {CurrentUserContext} from '../../contexts/CurrentUserContext.js';


function Header (props) {
  const currentUser = React.useContext(CurrentUserContext);
  // const [clicked, setClicked] = React.useState(false);
  // const [isMobileMenuActive, setMobileMenuActive] = React.useState(false);

  const btnStyleLogout = 'btn btn-header btn-header_login btn__header';
  const btnStyleLogin = 'btn btn-header btn-header_logout btn__header btn__header_logout';
  const btnThemeLight = 'btn-header_theme_light';

  function handleHamburgerMenuClick () {
    props.setMobileMenuActive(!props.isMobileMenuActive);
  }

  function handleMenuItemClick () {
    props.setMobileMenuActive(false);
    // props.setMobileMenuIcon(false);
  }

  return (
  <header className={`header
    ${!props.isMainPage && 'articles-page__header'}
    ${(!props.isMainPage && props.isMobileMenuActive) && 'articles-page__header_active'}`}
    style={ (props.isMobileMenuActive && !props.isSingInPopup) ? {backgroundColor:"#000"} : {backgroundColor:"transparent"}}
    >
    <div className="header__wrapper">
      <NavLink to="/" className={`logo header__logo ${!props.isMainPage && 'logo_theme_light' } `}  >NewsExplorer</NavLink>
      <div className={`burger-menu ${(props.isMobileMenuActive) ? 'burger-menu_active' : ''} ${!props.isMainPage && 'burger-menu_theme_light' }`}
        onClick={handleHamburgerMenuClick}
        style={ !props.isMobileMenuIcon ? {display:'none'} : {} }
        ></div>
      <nav className={`header__menu header__menu${props.isMobileMenuActive && '_active'}`}>
        <ul className="menu main-menu">
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
            })
            :
            TopMenuItems.filter((item) => item.forLoggedOnly === false).map((item, index) => {
            return (
              <li key={index} className={item.cWrapper}>
                <NavLink exact to={item.url} className={`${item.cLink} ${!props.isMainPage && item.cLinkLight}` } activeClassName={item.activeStyle}>{item.title}</NavLink>
              </li>
            );
          }
          )
        }
        </ul>
        {props.loggedIn ? <Button btnStyle={`${btnStyleLogin} ${!props.isMainPage && btnThemeLight}` } onClick={props.onLogoutBtn}>{currentUser}</Button> :
        <Button btnStyle={`${btnStyleLogout} ${!props.isMainPage && btnThemeLight}` } onClick={props.onLoginBtn}>Sign in</Button>
        }

      </nav>
    </div>
  </header>
  );
}

export default Header;
