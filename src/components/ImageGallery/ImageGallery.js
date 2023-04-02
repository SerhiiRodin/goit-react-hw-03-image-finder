import { Component } from 'react';
import { fetchImages } from 'services/services';
import Loader from 'components/Loader/Loader';
import css from './ImageGallery.module.css';
import { toast } from 'react-toastify';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';

export default class ImageGallery extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    page: 1,
    disabledBtn: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevInputValue = prevProps.inputValue;
    const thisInputValue = this.props.inputValue;
    const page = this.state.page;
    // console.log(prevInputValue);
    // console.log(thisInputValue);
    // console.log(page);
    if (
      prevInputValue === thisInputValue &&
      this.state.page !== prevState.page &&
      this.state.page === 1
    ) {
      console.log('запрос');
      this.onFetchInfo();
    }

    if (prevInputValue !== thisInputValue && this.state.page !== 1) {
      console.log('Сброс параметров при новом запросе');
      this.setState({ images: [], page: 1 });
      }
      
      if (prevInputValue !== thisInputValue && this.state.page === 1) {
          console.log('выполняется при первом запросе');
          this.onFetchInfo();
      }

      if (prevState.page !== this.state.page && this.state.page !== 1) {
          console.log('выполняется при смене page');
          this.onFetchInfo();
      }

    if (prevInputValue !== thisInputValue) {
      this.setState({ loading: true, error: null, images: [] });
      this.onFetchInfo();

      //     fetchImages(thisInputValue, page)
      //       .then(data => {
      //         this.setState({ images: data.hits });
      //         console.log(data);
      //       })
      //       .catch(error => this.setState({ error: error }))
      //       .finally(() => this.setState({ loading: false }));
    }
  }

  onFetchInfo = () => {
    fetchImages(this.props.inputValue, this.state.page)
      .then(data => {
        this.setState({ images: data.hits });
        console.log(data);
      })
      .catch(error => this.setState({ error: error }))
      .finally(() => this.setState({ loading: false }));
  };

  loadMoreClick = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };

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

        <Button loadMoreClick={this.loadMoreClick} />
      </>
    );
  }
}
