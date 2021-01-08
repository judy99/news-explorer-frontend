import React from 'react';

function PopupInfo (props) {
  return (
    <div className={`popup ${props.isRegistrationPopup && 'popup_opened'}`}>
        <div className="popup__container">
          <span className="popup__close" onClick={props.onPopupClose}>+</span>
          <div className='main-popup'>
          <div className='main-popup__container'>
          <div className='popup-form popup-info'>
            <h2 className="popup-form__heading">{props.title}</h2>
          </div>
          <span className="popup-form__bottom">or <input type="button" className={`link popup-form__link`} onClick={props.onClickLink} value={props.linkName} /></span>
          </div>
          </div>
        </div>
      </div>
  );
}

export default PopupInfo;
