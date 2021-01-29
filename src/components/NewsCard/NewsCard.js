import React from 'react';
import './NewsCard.css';

function NewsCard (props) {
  const [saved, setSaved]= React.useState(false);
  const [deleted, setDeleted]= React.useState(false);
  const onSave = () => {
    if (props.loggedIn) {
      setSaved(!saved);
      props.onCardSave(props.card);
    }
  }

  const onDelete = (e) => {
    e.stopPropagation();
    if (props.loggedIn) {
      setDeleted(true);
    }
  }

  return (
  <li className='news__item'>
    <div className='news__tools' style={{backgroundImage:`url(${props.card.urlToImage})`}}>
        <div className={`news__tooltip ${props.isMainPage && 'news__tooltip_hidden'} news__tooltip-keyword` } >{props.keyword}</div>
        <div className='news__tools-action'>
        { (!props.isMainPage) && <button className='btn-news news__icon-trash' onClick={onDelete}></button> }
        { (props.isMainPage) && <button className={`btn-news news__icon-save ${saved ? 'news__icon-save_marked' : 'news__icon-save_normal'}`} onClick={onSave}></button> }
        { (!props.loggedIn) && <span className='news__tooltip'>Sign in to save articles</span> }
        { (!props.isMainPage) &&  <span className='news__tooltip'>Remove from saved</span> }
        </div>
    </div>
    <div className='news__post'>
      <div className='news__date'>{new Date(props.card.publishedAt).toLocaleString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</div>
      <h3 className='news__title'>{props.card.title}</h3>
      <p className='news__text'>{props.card.content}</p>
      <div className='news__source'>{props.card.source.name}</div>
    </div>
  </li>
);
}

export default NewsCard;
