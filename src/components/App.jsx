import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    inputValue: '',
  };

  handleFormSubmit = inputValue => {
    this.setState({ inputValue });
  };

  render() {
    return (
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <Searchbar handleFormSubmit={this.handleFormSubmit} />
        <ImageGallery inputValue={this.state.inputValue} />
        <ToastContainer />
      </div>
    );
  }
}
