import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList.js';
import About from '../About/About.js';
import {Button} from '../Button.js';


function Main (props) {
  const btnStyleShow = 'btn search-result__btn';
  function handleShowMore () {

  }

  return (
    <main className="main">
      <section className="search-results">
        <h2 className="heading search-results__heading">Search results</h2>
        <NewsCardList newsCards={ props.newsCards } onCardSave={props.onCardSave} isMainPage={props.isMainPage} />
        <Button btnStyle={btnStyleShow} onClick={handleShowMore}>Show more</Button>
      </section>
      <About />
    </main>
  );
}
export default Main;
