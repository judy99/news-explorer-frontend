import React from 'react';
import './NotFound.css'

function NotFound (props) {
  return (
    <section className='searching-for'>
      <div className='searching-for__results searching-for__results_no'>
        <h3 className='searching-for__heading'>{props.title}</h3>
        <p className='searching-for__text'>{props.text}</p>
      </div>
    </section>
  );
}
export default NotFound;
