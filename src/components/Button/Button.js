import React from 'react';
import './Button.css';

export const Button = (props) => {
  return (
    <button type='button' className={`btn ${props.btnStyle}`} onClick={props.onClick}>
      {props.children}
    </button>
  )
};
