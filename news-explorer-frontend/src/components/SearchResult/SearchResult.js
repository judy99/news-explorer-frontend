import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList.js';
// import NotFound from '../NotFound/NotFound.js';
import {Button} from '../Button.js';

function SearchResult (props) {
  const btnStyleShow = 'btn search-result__btn';
  function handleShowMore () {
  }

  return (
    <main className="main">
    { props.newsCards.length > 0 &&
      <section className="search-results">
        <h2 className="heading search-results__heading">Search results</h2>
        <NewsCardList newsCards={ props.newsCards } onCardSave={props.onCardSave} onCardDelete={props.onCardDelete} isMainPage={props.isMainPage} loggedIn={props.loggedIn}  />
        <Button btnStyle={btnStyleShow} onClick={handleShowMore}>Show more</Button>
      </section>
    }
    </main>
  );
}
export default SearchResult;
