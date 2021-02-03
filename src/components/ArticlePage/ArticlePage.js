import React from 'react';
import Header from '../Header/Header.js';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';
import SavedNews from '../SavedNews/SavedNews.js';
import './ArticlePage.css';
import {mainApi} from '../../utils/MainApi.js';

function ArticlePage(props) {

  //   React.useEffect(() => {
  //     mainApi.getSavedArticles(props.curUser).then((res) => {
  //       console.log('res saved articles: ', typeof res);
  //       console.log('res saved articles: ', res);
  //       props.setSavedArticles(res);
  //       console.log('SavedArticles: ', props.savedArticles);
  //     })
  //     .catch((err) => console.log(err)
  //   );
  // }, [props.savedArticles, props.curUser]);


  return (
    <div className='page__top articles-page__top'>
      <Header
      loggedIn={props.loggedIn}
      onLogoutBtn={props.onLogoutBtn}
      onLogout={props.onLogout}
      isMainPage={props.isMainPage}
      isMobileMenuActive={props.isMobileMenuActive}
      setMobileMenuActive={props.setMobileMenuActive}
      isMobileMenuIcon={props.isMobileMenuIcon}
      setMobileMenuIcon={props.setMobileMenuIcon} />

      <SavedNewsHeader
      // articleNumber={props.articleNumber}
      keywordArray={props.keywordArray}
      savedArticles={props.savedArticles}
      // keywordArrayNumber={props.keywordArrayNumber}
       />

      <main className='main'>
        <SavedNews
        // newsCards={props.newsCards}
        onCardDelete={props.onCardDelete}
        isMainPage={props.isMainPage}
        loggedIn={props.loggedIn}
        savedArticles={props.savedArticles}
        keyword={props.keyword}
        keywordArray={props.keywordArray}
         />
      </main>
    </div>
  );
}

export default ArticlePage;
