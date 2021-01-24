import React from 'react';
import './PopupInfo.css';
import Popup from '../Popup/Popup.js';
import PopupBottomLink from '../PopupBottomLink/PopupBottomLink.js';
import PopupHeader from '../PopupHeader/PopupHeader.js';


function PopupInfo (props) {
  return (
    <Popup onPopupClose={props.onPopupClose}>
      <PopupHeader popupType='popup-info' title={props.title} />
      <span className='popup-form__bottom popup-info__bottom'>
        <PopupBottomLink popupType='popup-info' onClickLink={props.onClickLink} linkName='Sign in'/>
      </span>
    </Popup>
  );
}
export default PopupInfo;
