import React from 'react';


function NewsCard (props) {
  return (
  <li className="news__item">
    <div className="news__tools">
    {
      !props.isMainPage &&
      ( <>
        <div className="news__tooltip news__tooltip-keyword">keyword</div>
        <div className="news__tools-action">
          <button className="btn btn-news news__icon-trash"></button>
          <span className="news__tooltip">Remove from saved</span>
        </div>
        </>
      )
    }

    { (props.isMainPage && !props.loggedIn) &&
      (
        <>
        <div className="news__tooltip news__tooltip_hidden news__tooltip-keyword">keyword</div>
        <div className="news__tools-action">
        <button className="btn btn-news news__icon-save"></button>
        <span className="news__tooltip">Sign in to save articles</span>
      </div>
      </>
    )
    }

    </div>
    <div className="news__post">
      <div className="news__date">{props.card.date}</div>
      <h3 className="news__title">{props.card.title}</h3>
      <p className="news__text">{props.card.content}</p>
      <div className="news__source">{props.card.source}</div>
    </div>
  </li>
);
}

export default NewsCard;
