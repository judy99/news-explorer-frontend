import React from 'react';
import {TopMenuItems} from './Navigation/TopMenuItems.js';
import {Button} from './Button.js';


function Header1 () {
  const [clicked, setClicked] = React.useState(false);
  const [isLogged, setLoggedIn] = React.useState(true);
  const [btnValue, setBtnValue] = React.useState('Elis');
  const btnStyleLogout = 'btn btn-header btn-header_login btn__header';
  const btnStyleLogin = 'btn btn-header btn-header_logout btn__header btn__header_logout';

  function handleHamburgerMenuClick () {
    setClicked(!clicked);
  }

  function handleLogin () {
      window.alert('Logout...');
      setLoggedIn(false);
      setBtnValue('Sign in');
  };

  function handleLogout () {
    window.alert('Login...');
    setLoggedIn(true);
    setBtnValue('Name');
  };


  return (
  <header className="header" style={ clicked ? {backgroundColor:"#000"} : {backgroundColor:"transparent"} }>
    <div className="header__wrapper">
      <a href="/" className="logo header__logo">NewsExplorer</a>
      <div className={`burger-menu ${clicked ? 'burger-menu_active' : ''}`}  onClick={handleHamburgerMenuClick}></div>
      <nav className={`header__menu header__menu${clicked ? '_active' : ''}`}>
        <ul className="menu main-menu">
          {TopMenuItems.map((item, index) => {
            return (
              <li key={index} className={item.cWrapper}>
                <a className={item.cLink} href={item.url}>{item.title}</a>
              </li>
            );
          })}
        </ul>
        {isLogged ? <Button btnStyle={btnStyleLogin} onClick={handleLogin}>{btnValue}</Button> :
        <Button btnStyle={btnStyleLogout} onClick={handleLogout}>{btnValue}</Button>
        }

      </nav>
    </div>
  </header>
  );
}

export default Header1;
