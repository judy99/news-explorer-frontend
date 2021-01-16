import React from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext.js';

function SavedNewsHeader (props) {
  const currentUser = React.useContext(CurrentUserContext);
  const NUM_KEYWORDS = 2;

  function keywordArrayToShow () {
    if (props.keywordArray.length > NUM_KEYWORDS) {
      return props.keywordArray.slice(0, NUM_KEYWORDS).join(',');
    } else {
      return props.keywordArray.join(',');
    }
  }
  var otherKeywordNums = props.keywordArray.length - NUM_KEYWORDS;

  return (
    <div className="articles-page__info">
      <p className="articles-page__saved">Saved articles</p>
      <h2 className="heading articles-page__heading">{currentUser ? currentUser.username : ''}, you have {props.articleNumber} saved articles</h2>
      <div className="articles-page__keyword">
        <span className="articles-page__keywords-by">By keywords:&nbsp;</span>
        <span className="articles-page__keywords">{keywordArrayToShow()}, and {otherKeywordNums} other</span>
      </div>
    </div>
  );
}

export default SavedNewsHeader;
