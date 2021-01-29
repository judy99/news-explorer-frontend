import React from 'react';
import './SearchForm.css';

function SearchForm(props) {

  function handleFocusSearch () {
    props.setSearchInputError('');
  }

  return (
      <form action='#' method='post' name={props.name} className={`form ${props.name}`} onSubmit={props.onSubmitSearch} noValidate >
        <input type='text' name='search-input' className='form__input search-form__input' placeholder={ `${ props.searchInputError !== '' ? '' : 'Enter topic' } ` } onChange={props.handleChangeSearch} onFocus={handleFocusSearch} />
        { (props.searchInputError !== '' || props.searchInput === '') && <span id='form-input-error' className='form__input-error search-form__input-error'>{props.searchInputError}</span> }
        <input type='submit' name={props.name} className={`btn form__btn-submit ${props.name}__btn-submit`} value={props.value} />
      </form>
  );
}

export default SearchForm;
