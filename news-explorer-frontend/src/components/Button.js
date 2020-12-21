import React from 'react';

export const Button = (props) => {

  return (
    <button className={props.btnStyle} onClick={props.onClick}>
      {props.children}
    </button>
  )
}
