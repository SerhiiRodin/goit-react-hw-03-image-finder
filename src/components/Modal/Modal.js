import { Component } from 'react';
import css from './Modal.module.css';

export default class Modal extends Component {
  state = {};

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
      if (event.code === 'Escape') {
        console.log("object");
      this.props.toggleModal();
    }
  };

  render() {
    return (
      <div className={css.Overlay}>
        <div className={css.Modal}>{this.props.children}</div>
      </div>
    );
  }
}
