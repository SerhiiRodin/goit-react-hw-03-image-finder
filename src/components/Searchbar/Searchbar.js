import { Component } from 'react';
import { ReactComponent as ImgSearch } from './search.svg';

import css from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    inputValue: '',
    hits: null,
  };

  handleChange = event => {
    // console.log(event.target.value);
    this.setState({ inputValue: event.target.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.inputValue.trim() === '') {
      return alert('Enter a keyword to search for a picture.');
    }

    this.props.handleFormSubmit(this.state.inputValue.trim());
    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css['SearchForm-button']}>
            <span>
              <ImgSearch fill="black" width="25" height="25" />
            </span>
          </button>

          <input
            className={css['SearchForm-input']}
            onChange={this.handleChange}
            type="text"
            placeholder="Search images and photos"
            value={this.state.inputValue}
          />
        </form>
      </header>
    );
  }
}
