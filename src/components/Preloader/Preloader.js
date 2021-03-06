import React from 'react';
import './Preloader.css';

function Preloader (props) {
  return (
    <section className='searching-for'>
      <div className='searching-for__results'>
        <div className='searching-for__spinner'>
          <i className='circle-preloader'></i>
        </div>
        <p className='searching-for__text'>Searching for news...</p>
      </div>
    </section>
  );
}

export default Preloader;
