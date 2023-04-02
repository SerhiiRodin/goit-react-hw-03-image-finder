import { Component } from 'react';
import css from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  state = {};

  render() {
    return (
      <li className={css.ImageGalleryItem}>
        <img
          src={this.props.webformatURL}
          alt={this.props.tags}
          className={css['ImageGalleryItem-image']}
        />
      </li>
    );
  }
}
