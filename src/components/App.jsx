import { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    inputValue: "",
  };

  handleFormSubmit = inputValue => {
    this.setState({ inputValue });
  };

  render() {
    return (
      <div>
        <Searchbar handleFormSubmit={this.handleFormSubmit} />
        <ImageGallery inputValue={this.state.inputValue} />
      </div>
    );
  }
}
