import { Component } from 'react';
import { fetchImages } from 'services/services';
import Loader from 'components/Loader/Loader';
import css from './ImageGallery.module.css';
import { toast } from 'react-toastify';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';

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
      this.setState({ loading: true, error: null, images: null });
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
                    largeImageURL={largeImageURL}
                    tags={tags}
                  />
                );
              }
            )}
          </ul>
        )}
        {loading && <Loader />}
        {error && <p>{error.message}</p>}
            {/* {error && toast.error('xcvxcvx')} */}
            
            <Button/>
      </>
    );
  }
}
