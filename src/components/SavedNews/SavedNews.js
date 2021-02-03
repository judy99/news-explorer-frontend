import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList.js';
import NewsCard from '../NewsCard/NewsCard.js';
import NotFound from '../NotFound/NotFound.js';
import './SavedNews.css';

function SavedNews (props) {
  return (
    <>
    { props.savedArticles.length > 0 ?
      <section className='saved-results'>
        <NewsCardList savedArticles={props.savedArticles} onCardSave={props.onCardSave} onCardDelete={props.onCardDelete} isMainPage={props.isMainPage} loggedIn={props.loggedIn} keyword={props.keyword}  >
        {
          // props.savedArticles.slice(0, props.cardsToShow).map( (item, index) => {
            props.savedArticles.map( (item, index) => {
              return <NewsCard card={item} key={index} onCardDelete={props.onCardDelete} isMainPage={props.isMainPage} loggedIn={props.loggedIn} savedArticles={props.savedArticles} keyword={props.keyword} />})
        }
        </NewsCardList>
      </section> :
        <NotFound />
    }
    </>
  );
}
export default SavedNews;
