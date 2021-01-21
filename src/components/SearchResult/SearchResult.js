import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList.js';
import {Button} from '../Button/Button.js';
import NotFound from '../NotFound/NotFound.js';
import './SearchResult.css';

function SearchResult (props) {
  const btnStyleShow = 'search-result__btn';
  function handleShowMore () {}
  return (
    <>
    { props.newsCards.length > 0 ?
      <section className='search-results'>
        {props.isMainPage ? <h2 className='heading search-results__heading'>Search results</h2> : null}
        <NewsCardList newsCards={ props.newsCards } onCardSave={props.onCardSave} onCardDelete={props.onCardDelete} isMainPage={props.isMainPage} loggedIn={props.loggedIn}  />
        <Button btnStyle={btnStyleShow} onClick={handleShowMore}>Show more</Button>
      </section> :
        <NotFound />
    }
    </>
  );
}
export default SearchResult;
