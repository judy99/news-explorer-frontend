import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';

function Search() {
  return (
    <section className="search">
      <h1 className="search__heading">What's going on in the world?</h1>
      <p className="search__subheading">Find the latest news on any topic and save them in your personal account.</p>
        <SearchForm name='search-form' value='Search'/>
    </section>
  );
}

export default Search;
