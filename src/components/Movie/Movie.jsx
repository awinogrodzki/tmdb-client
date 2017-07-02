import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { t } from 'services/translate';
import styles from './Movie.css';

class Movie extends React.Component {
  constructor(props) {
    super(props);

    this.containerRef = null;
  }

  onClick() {
    this.containerRef && this.props.onClick(this.containerRef);
  }

  setContainerRef(ref) {
    this.containerRef = ref;
  }

  renderImage(url) {
    if (!url) {
      return (
        <div
          data-test="Movie.emptyImage"
          className={styles.emptyImage}
        />
      );
    }

    return (
      <img data-test="Movie.image" src={url} />
    );
  }

  render() {
    return (
      <div
        ref={ref => this.setContainerRef(ref)}
        className={classNames({
          [styles.container]: true,
          [this.props.className]: !!this.props.className,
        })}
      >
        <div
          className={styles.wrapper}
        >
          <div
            className={styles.image}
            onClick={() => this.onClick()}
            role="button"
          >
            { this.renderImage(this.props.imageUrl) }
          </div>
          <div className={styles.content}>
            <h4 className={styles.originalTitle}>{ this.props.originalTitle }</h4>
            { this.props.originalTitle !== this.props.title
                && <h6 className={styles.title}>{ this.props.title }</h6> }
            <ul className={styles.data}>
              <li className={styles.dataItem}>{`${t('movie.voteAverage')}:`} <strong>{this.props.voteAverage}</strong></li>
              <li className={styles.dataItem}><strong>{this.props.voteCount}</strong> {t('movie.voteCount')}</li>
              {
                this.props.releaseDate !== null &&
                <li className={styles.dataItem}>{t('movie.releaseDate')} <strong>{this.props.releaseDate.toLocaleDateString()}</strong></li>
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

Movie.propTypes = {
  title: PropTypes.string,
  originalTitle: PropTypes.string,
  imageUrl: PropTypes.string,
  voteAverage: PropTypes.number,
  voteCount: PropTypes.number,
  releaseDate: PropTypes.instanceOf(Date),
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Movie.defaultProps = {
  title: null,
  originalTitle: null,
  imageUrl: null,
  voteAverage: null,
  voteCount: null,
  releaseDate: null,
  className: null,
  onClick: () => {},
};

export default Movie;
