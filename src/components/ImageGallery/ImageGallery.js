import { Component } from 'react';
import { fetchImages } from 'services/services';
import { FidgetSpinner } from 'react-loader-spinner';
import Loader from 'components/Loader/Loader';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default class ImageGallery extends Component {
  state = {
    images: null,
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevInputValue = prevProps.inputValue;
    const thisInputValue = this.props.inputValue;
    // console.log(prevInputValue);
    // console.log(thisInputValue);

    if (prevInputValue !== thisInputValue) {
      this.setState({ loading: true });
      fetchImages(thisInputValue)
        .then(data => {
          this.setState({ images: data.hits });
          console.log(data);
        })
        .catch(error => this.setState({ error: error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { images, error, loading } = this.state;

    return (
      <>
        {images && (
          <ul className={css.ImageGallery}>
            {this.state.images.map(
              ({ id, webformatURL, largeImageURL, tags }) => {
                return (
                  <ImageGalleryItem
                    key={id}
                    webformatURL={webformatURL}
                    largeURL={largeImageURL}
                    tags={tags}
                  />
                );
              }
            )}
          </ul>
        )}
        {loading && <Loader />}
        {error && <p>{error.message}</p>}
      </>
    );
  }
}
