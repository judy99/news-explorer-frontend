import React from 'react';
import './NewsCard.css';
import {CurrentUserContext} from '../../contexts/CurrentUserContext.js';

function NewsCard (props) {
  const [saved, setSaved]= React.useState(false);
  const [deleted, setDeleted]= React.useState(false);

  // const [title, keyword, owner, text, date, source, link, image] =
  //   { props.card.title, props.keyword, "5fc56a42f9eb4b959febf0dd", props.card.content,
  //     props.card.publishedAt, props.card.source.name, props.card.url, props.card.urlToImage }


  const onSave = (e) => {
    console.log('e onSave click: ', e);
    e.stopPropagation();
    e.preventDefault();

    if (props.loggedIn && !saved) {
      // props.onCardSave(props.card);
      props.onCardSave({
          title: props.card.title,
          keyword: props.keyword,
          owner: '5fc56a42f9eb4b959febf0dd',
          text: props.card.text,
          date: props.card.date,
          source: props.card.source,
          link: props.card.link,
          image: props.card.image,
      });
      setSaved(!saved);
    }
  }

  const onDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (props.loggedIn) {
      setSaved(!saved);
      setDeleted(true);
      props.onCardDelete(props.card);
    }
  }

  const onCardClick = (e) => {
    e.preventDefault();
    window.open(props.card.link);
  }

  return (
  <li className='news__item' onClick={onCardClick}>
    <div className='news__tools' style={{backgroundImage:`url(${props.card.image})`}}>
        <div className={`news__tooltip ${props.isMainPage && 'news__tooltip_hidden'} news__tooltip-keyword`} >{props.card.keyword}</div>
        <div className='news__tools-action'>
        { (!props.isMainPage) && <button className='btn-news news__icon-trash' onClick={onDelete}></button> }
        { (props.isMainPage) && <button className={`btn-news news__icon-save ${saved ? 'news__icon-save_marked' : 'news__icon-save_normal'}`} onClick={onSave}></button> }
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
