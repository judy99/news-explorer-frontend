import React from 'react';
import NewsCard from '../NewsCard/NewsCard.js';
import { MAX_PICS_MAINPAGE } from '../../utils/consts.js';

function NewsCardList (props) {
  const arrLength = props.isMainPage ? MAX_PICS_MAINPAGE : props.newsCards.length;
  return (
    <ul className="news">
    {
      props.newsCards.slice(0, arrLength).map( item => {
        return <NewsCard card={item} key={item._id} onCardSave={props.onCardSave} onCardDelete={props.onCardDelete} isMainPage={props.isMainPage} loggedIn={props.loggedIn} />})
    }
    </ul>
);
}

export default NewsCardList;
