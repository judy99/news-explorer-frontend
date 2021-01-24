import React from 'react';
import './FormField.css';

function FormField(props) {

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      <label htmlFor = {`${props.nameField}-input`} className = {`popup-form__label ${props.typeField}__label`} > {capitalizeFirstLetter(props.nameField)} < /label>
      <input type = {props.nameField} name = {props.nameField} id = {`${props.nameField}-input`} className = {`form__input popup-form__input ${props.typeField}__${props.nameField}`}
        placeholder = {`Enter ${props.nameField}`} onChange = {props.handleChange} required noValidate / >
      <span id = {`${props.nameField}-input-error`} className = 'form__input-error' > {props.inputError && props.inputError} < /span>
    </>
  );
}

export default FormField;
