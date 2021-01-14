import React from 'react';

function SearchForm(props) {
  return (
      <form action="#" method="post" name={props.name} className={`form ${props.name}`} onSubmit={props.onSubmitSearch} noValidate >
        <input type="text" name="search-input" className="form__input search-form__input" placeholder="Enter topic" />
        <input type="submit" name={props.name} className={`btn form__btn-submit ${props.name}__btn-submit`} value={props.value} />
      </form>
  );
}

export default SearchForm;
