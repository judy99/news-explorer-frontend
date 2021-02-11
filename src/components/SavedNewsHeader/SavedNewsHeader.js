import React, {useEffect, useState} from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext.js';
import './SavedNewsHeader.css';

function SavedNewsHeader (props) {
  const currentUser = React.useContext(CurrentUserContext);
  const NUM_KEYWORDS = 2;

  const [keyAmount, setKeyAmount] = useState(props.keywordArray.length - NUM_KEYWORDS);

  useEffect(() => {
      setKeyAmount(props.keywordArray.length - NUM_KEYWORDS);
  }, [props.keywordArray]);

  return (
    <div className='articles-page__info'>
      <p className='articles-page__saved'>Saved articles</p>
      <h2 className='heading articles-page__heading'>{currentUser ? currentUser.name : ''}, you have {props.savedArticles.length} saved articles</h2>
      <div className='articles-page__keyword'>
      { !(keyAmount < -1) && <span className='articles-page__keywords-by'>By keywords:&nbsp;</span> }
        <span className='articles-page__keywords'>
          { keyAmount === -1 && props.keywordArray[0]}
          { keyAmount === 0 && `${props.keywordArray[0]} and ${props.keywordArray[1]}`}
          { keyAmount > 0 && `${props.keywordArray.slice(0, NUM_KEYWORDS).join(', ')},  and ${keyAmount} other`}
          </span>
      </div>
    </div>
  );
}

export default SavedNewsHeader;
