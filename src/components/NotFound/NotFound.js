import React from 'react';
import './NotFound.css'

function NotFound (props) {
  return (
    <section className='searching-for'>
      <div className='searching-for__results searching-for__results_no'>
        <h3 className='searching-for__heading'>Nothing found</h3>
        <p className='searching-for__text'>Sorry, but nothing matched your search terms.</p>
      </div>
    </section>
  );
}
export default NotFound;
