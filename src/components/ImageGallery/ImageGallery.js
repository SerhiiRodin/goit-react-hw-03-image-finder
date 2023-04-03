import { Component } from 'react';
import { fetchImages } from 'services/services';
import Loader from 'components/Loader/Loader';
import css from './ImageGallery.module.css';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Notify } from 'notiflix';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';

export default class ImageGallery extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    page: 1,
    disabled: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevInputValue = prevProps.inputValue;
    const thisInputValue = this.props.inputValue;
    // const page = this.state.page;

    if (
      prevInputValue === thisInputValue &&
      this.state.page !== prevState.page &&
      this.state.page === 1
    ) {
      console.log('новый запрос после сброса  параметров');
      this.onFetchInfo();
    }

    if (prevInputValue !== thisInputValue && this.state.page !== 1) {
      console.log('Сброс параметров при новом запросе');
      this.setState({ images: [], page: 1, disabled: false });
    }

    if (prevInputValue !== thisInputValue && this.state.page === 1) {
      console.log('выполняется при первом запросе');
      this.setState({
        page: 1,
        error: null,
        // images: [],
        loading: true,
        disabled: false,
      });
      this.onFetchInfo();
    }

    if (prevState.page !== this.state.page && this.state.page !== 1) {
      console.log('выполняется при смене page');
      // console.log(prevState.images);
      // console.log(this.state.images);
      this.setState({
        loading: true,
        error: null,
        // images: [],
        disabled: false,
      });
      this.onFetchInfo();
    }
  }

  onFetchInfo = () => {
    fetchImages(this.props.inputValue, this.state.page)
      .then(data => {
        this.setState(prev => ({ images: [...prev.images, ...data.hits] }));
        // console.log(data);
        // console.log(data.hits.length);

        if (data.hits.length === 12) {
          this.setState({ disabled: true });
        } else {
          this.setState({ disabled: false });
        }
      })
      .catch(error =>
        this.setState({ error: error, disabled: false, images: [] })
      )
      .finally(() => this.setState({ loading: false }));
  };

  loadMoreClick = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };

  render() {
    const { images, error, loading, disabled } = this.state;

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
        {/* {error && toast.error(`${error.message}`)} */}
        {/* {error && Notify.failure(`${error.message}`)} */}

        {disabled && <Button loadMoreClick={this.loadMoreClick} />}
      </>
    );
  }
}
