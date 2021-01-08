import React from 'react';

function PopupWithForm (props) {

  return (
    <div className={`popup ${(props.isSingInPopup || props.isSingUpPopup) && 'popup_opened'}`} >
        <div className="popup__container">
          <span className="popup__close" onClick={props.onPopupClose}>+</span>
          <div className='main-popup'>
          <div className='main-popup__container'>
          <form title={props.title} className={`form popup-form ${props.name}`} name={props.name} id={props.name} onSubmit={props.onSubmit}>
            <h2 className="popup-form__heading">{props.title}</h2>

            {props.children}

            <input type="submit" name={props.name} className={`btn form__btn-submit popup-form__btn-submit ${props.name}__btn-submit form__submit_disabled`} value={props.title} />
          </form>
          <span className="popup-form__bottom">or <input type="button" className={`link popup-form__link`} onClick={props.onClickLink} value={props.linkName} /></span>
          </div>
          </div>
        </div>
      </div>
  );
}

export default PopupWithForm;
// name = signup or login
