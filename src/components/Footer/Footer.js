import React from 'react';
import BottomMenuItems from '../Navigation/BottomMenuItems.js';
import {SocialMenuItems} from '../Navigation/SocialMenuItems.js';
import './Footer.css';

function Footer () {
  var today = new Date();
  return (
    <footer className='footer'>
      <p className='footer__copyright'> © { today.getFullYear() } Supersite, Powered by News API</p>
      <div className='footer__links'>
        <ul className='foo-menu'>
        { BottomMenuItems.map((item, index) => {
          return (
            <li key={index} className={item.cWrapper}>
              <a className={item.cLink} href={item.url}
              target={`${item.url !== '/' ? '_blank' : '_self'}`} rel='noreferrer'>{item.title}</a>
            </li>
          );
        }) }
        </ul>
        <ul className='foo-social'>
        { SocialMenuItems.map((item, index) => {
          return (
            <li key={index} className={item.cWrapper}>
              <a className={item.cLink} href={item.url} target='_blank' rel='noreferrer'> </a>
            </li>
          );
        }) }
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
