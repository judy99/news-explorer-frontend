import React from 'react';
import './BurgerMenu.css';

function BurgerMenu (props) {
  function handleHamburgerMenuClick () {
    props.setMobileMenuActive(!props.isMobileMenuActive);
  }

  return (
    <div className={`burger-menu ${(props.isMobileMenuActive) ? 'burger-menu_active' : ''} ${!props.isMainPage && 'burger-menu_theme_light' }`}
      onClick={handleHamburgerMenuClick}
      style={ !props.isMobileMenuIcon ? {display:'none'} : {} } >
    </div>
  );
}
export default BurgerMenu;
