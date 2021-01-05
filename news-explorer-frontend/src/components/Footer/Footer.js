import React from 'react';
import {BottomMenuItems} from '../Navigation/BottomMenuItems.js';
import {SocialMenuItems} from '../Navigation/SocialMenuItems.js';
import { Link } from 'react-router-dom';


function Footer () {
  var today = new Date();
  return (
    <footer className="footer">
      <p className="footer__copyright"> © { today.getFullYear() } Supersite, Powered by News API</p>
      <div className="footer__links">
        <ul className="menu foo-menu">
        { BottomMenuItems.map((item, index) => {
          return (
            <li key={index} className={item.cWrapper}>
              <Link className={item.cLink} to={item.url}>{item.title}</Link>
            </li>
          );
        }) }
        </ul>
        <ul className="menu foo-social">
        { SocialMenuItems.map((item, index) => {
          return (
            <li key={index} className={item.cWrapper}>
              <Link className={item.cLink} to={item.url}></Link>
            </li>
          );
        }) }
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
