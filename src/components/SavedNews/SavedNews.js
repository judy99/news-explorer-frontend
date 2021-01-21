import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList.js';
import NotFound from '../NotFound/NotFound.js';
import './SavedNews.css';

function SavedNews (props) {
  return (
    <>
    { props.newsCards.length > 0 ?
      <section className='saved-results'>
        <NewsCardList newsCards={ props.newsCards } onCardSave={props.onCardSave} onCardDelete={props.onCardDelete} isMainPage={props.isMainPage} loggedIn={props.loggedIn}  />
      </section> :
        <NotFound />
    }
    </>
  );
}
export default SavedNews;
