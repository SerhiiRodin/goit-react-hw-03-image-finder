import css from './Button.module.css';

export default function Button({loadMoreClick}) {
  return (
    <button className={css.Button} type="button" onClick={loadMoreClick}>
      Load More
    </button>
  );
}
