import React from 'react';
import './ErrorMessage.css';

function ErrorMessage (props) {
  return (
    <section className='error-message'>
      <div className='error-message__results'>
        <p className='error-message__text'>{props.isErrorMessage}</p>
      </div>
    </section>
  );
}

export default ErrorMessage;
