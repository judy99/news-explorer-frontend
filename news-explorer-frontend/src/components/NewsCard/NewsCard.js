import React from 'react';


function NewsCard (props) {

  const [saved, setSaved]= React.useState(false);
  const [deleted, setDeleted]= React.useState(false);

  const onSave = () => {
    // mark card as saved
    // add userId in saved array [id1, id2, ..., ]
    if (props.loggedIn) {
      setSaved(!saved);
      props.onCardSave(props.card);
    }
  }

  const onDelete = (e) => {
    e.stopPropagation();
    if (props.loggedIn) {
      setDeleted(true);
      props.onCardDelete(props.card);
    }
  }

  return (
  <li className="news__item">
    <div className="news__tools" style={{backgroundImage:`url(${props.card.link})`}}>
        <div className={`news__tooltip ${props.isMainPage && 'news__tooltip_hidden'} news__tooltip-keyword` } >{props.card.keyword}</div>
        <div className="news__tools-action">
        { (!props.isMainPage) && <button className="btn btn-news news__icon-trash" onClick={onDelete}></button> }
        { (props.isMainPage) && <button className={`btn btn-news news__icon-save ${saved ? 'news__icon-save_marked' : 'news__icon-save_normal'}`} onClick={onSave}></button> }
        { (!props.loggedIn) && <span className="news__tooltip">Sign in to save articles</span> }
        { (!props.isMainPage) &&  <span className="news__tooltip">Remove from saved</span> }
        </div>
    </div>
    <div className="news__post">
      <div className="news__date">{props.card.date}</div>
      <h3 className="news__title">{props.card.title}</h3>
      <p className="news__text">{props.card.text}</p>
      <div className="news__source">{props.card.source}</div>
    </div>
  </li>
);
}

export default NewsCard;
