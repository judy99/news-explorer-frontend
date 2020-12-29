import React from 'react';
import NewsCard from '../NewsCard/NewsCard.js';

function NewsCardList (props) {

  return (
    <ul className="news">
    {
      props.newsCards.map( item => {
        return <NewsCard card={item} key={item._id} onCardSave={props.onCardSave} isMainPage={props.isMainPage} /> }
      )
    }
    </ul>
);
}

export default NewsCardList;
