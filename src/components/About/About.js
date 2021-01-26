import React from 'react';
import author from '../../images/temp/author.png';
import './About.css';

function About () {
  return (
    <section className='about'>
      <img className='about__avatar' src={author} alt='Author' />
      <div className='about__info'>
        <h2 className='heading about__heading'>About the author</h2>
        <p className='about__text'>This block describes the project author. Here you should indicate your name, what you do, and which development technologies you know.</p>
        <p className='about__text'>You can also talk about your experience with Practicum, what you learned there, and how you can help potential customers.</p>
      </div>
    </section>
  );
}
export default About;
