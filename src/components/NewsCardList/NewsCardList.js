import React from 'react';
import './NewsCardList.css';

function NewsCardList (props) {
  return (
    <ul className='news'>
    {
      props.children
    }
    </ul>
);
}

export default NewsCardList;
