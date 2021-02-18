import React from 'react';
import './NewsCard.css';
import Spinner from '../Spinner/Spinner.js';
import {CurrentUserContext} from '../../contexts/CurrentUserContext.js';

function NewsCard (props) {
  const [saved, setSaved] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (props.loggedIn && props.savedArticles.length) {
      setSaved(props.savedArticles.some(element => element.link === props.card.link));
    }
  });

  const onSave = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (props.loggedIn && !saved) {
      props.onCardSave({
          title: props.card.title,
          keyword: props.keyword,
          owner: currentUser._id,
          text: props.card.text,
          date: props.card.date,
          source: props.card.source,
          link: props.card.link,
          image: props.card.image,
      });
      setSaved(true);
    } else

    if (props.loggedIn && saved) {
      props.setSavedArticles(props.savedArticles.filter(item => item.link !== props.card.link));
      setSaved(false);
    }
  }

  const onDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setSaved(false);
    props.onCardDelete(props.card);
  }

  const onCardClick = (e) => {
    e.preventDefault();
    window.open(props.card.link);
  }

  return (
  <li className='news__item' onClick={onCardClick}>
  { props.isLoading && <Spinner />}
    <div className='news__tools' style={{backgroundImage:`url(${props.card.image})`}}>
        <div className={`news__tooltip ${props.isMainPage && 'news__tooltip_hidden'} news__tooltip-keyword`} >{props.card.keyword}</div>
        <div className='news__tools-action'>
        { (!props.isMainPage) && <button className='btn-news news__icon-trash' onClick={onDelete}></button> }
        { (props.isMainPage) && <button className={`btn-news news__icon-save ${ saved ? 'news__icon-save_marked' : 'news__icon-save_normal'}`} onClick={onSave}></button> }
        { (!props.loggedIn) && <span className='news__tooltip'>Sign in to save articles</span> }
        { (!props.isMainPage) &&  <span className='news__tooltip'>Remove from saved</span> }
        </div>
    </div>
    <div className='news__post'>
      <div className='news__date'>{new Date(props.card.date).toLocaleString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</div>
      <h3 className='news__title'>{props.card.title}</h3>
      <p className='news__text'>{props.card.text}</p>
      <div className='news__source'>{props.card.source}</div>
    </div>
  </li>
);
}

export default NewsCard;
