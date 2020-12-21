import React from 'react';
import {TopMenuItems} from '../Navigation/TopMenuItems.js';

function Header() {
  const [clicked, setClicked] = React.useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  function handleHamburgerMenuClick () {
    setClicked(!clicked);
  }

  return (
  <header className="header" style={ clicked ? {backgroundColor:"#000"} : {backgroundColor:"transparent"} }>
    <div className="header__wrapper">
      <a href="/" className="logo header__logo">NewsExplorer</a>


      <nav className="header__menu">
        <ul className="menu main-menu">
          {TopMenuItems.map((item, index) => {
            return (
              <li key={index} className={item.cWrapper}>
                <a className={item.cLink} href={item.url}>{item.title}</a>
              </li>
            );
          })}
        </ul>
        <button className="btn btn__header btn__header_logout">Elise Elise</button>
      </nav>


      <div className={`burger-menu header__burger-menu${clicked ? '_active' : ''}`}  onClick={handleHamburgerMenuClick}></div>

    </div>
    <nav className={`header__menu-mobile header__menu-mobile${clicked ? '_active' : ''}`}>
      <ul class="menu mobile-menu">
      {TopMenuItems.map((item, index) => {
        return (
          <li key={index} className={`${item.cWrapper} mobile-menu__item`}>
            <a className={ `${item.cLink} mobile-menu__link`} href={item.url}>{item.title}</a>
          </li>
        );
      })}
      </ul>
      <button class="btn btn__header mobile-menu__btn btn__header_logout">Elise Elise</button>
    </nav>

  </header>
  );
}

export default Header;
