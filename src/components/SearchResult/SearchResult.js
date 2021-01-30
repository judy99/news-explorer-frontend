import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList.js';
import {Button} from '../Button/Button.js';
// import NotFound from '../NotFound/NotFound.js';
import './SearchResult.css';

function SearchResult (props) {
  const btnStyleShow = 'search-result__btn';
  return (
      <section className='search-results'>
        {props.isMainPage ? <h2 className='heading search-results__heading'>Search results</h2> : null}
        <NewsCardList newsCards={ props.newsCards } cardsToShow={props.cardsToShow} onCardSave={props.onCardSave} onCardDelete={props.onCardDelete} isMainPage={props.isMainPage} loggedIn={props.loggedIn}  />
        { props.newsCards.length >  props.cardsToShow ?
          <Button btnStyle={btnStyleShow} onClick={props.onShowMore}>Show more</Button>
        : null }
      </section>
  );
}
export default SearchResult;
