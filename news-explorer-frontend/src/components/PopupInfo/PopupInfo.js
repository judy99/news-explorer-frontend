import React from 'react';

function PopupInfo (props) {
  return (
    <div className='popup popup_opened'>
        <div className='popup__container popup__container_info'>
          <span className='popup__close' onClick={props.onPopupClose}>+</span>
          <div className='main-popup'>
          <div className='main-popup__container'>
          <div className='popup-form popup-info'>
            <h2 className='popup-form__heading popup-info__heading'>{props.title}</h2>
          </div>
          <span className='popup-form__bottom popup-info__bottom'><input type='button' className={`link popup-form__link popup-info__link`} onClick={props.onClickLink} value={props.linkName} /></span>
          </div>
          </div>
        </div>
      </div>
  );
}

export default PopupInfo;
