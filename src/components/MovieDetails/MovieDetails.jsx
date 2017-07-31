import React from 'react';
import classNames from 'classnames';
import IMDBLogo from 'resources/images/imdb_logo.svg';
import RatingBar from 'components/RatingBar';
import Gallery, { GalleryNav } from 'components/Gallery';
import { t } from 'services/translate';
import { movieDetailsPropTypes } from './types';
import styles from './MovieDetails.css';

const renderLinks = (title, items) => {
  if (!items.length) {
    return null;
  }

  return (
    <div data-test="MovieDetails.links" className={classNames(styles.row, styles.links)}>
      <h4 className={styles.rowTitle}>{title}</h4>
      { items.map(item => (
        <a
          data-test="MovieDetails.link"
          key={item.id}
          className={styles.link}
        >{item.name}</a>
      )) }
    </div>
  );
};

class MovieDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedImageId: null,
      isGalleryVisible: false,
    };

    this.onImageClick = this.onImageClick.bind(this);
    this.onThumbnailClick = this.onThumbnailClick.bind(this);
  }

  onImageClick() {
    this.setState({ isGalleryVisible: false });
  }

  onThumbnailClick(id) {
    this.setState({ selectedImageId: id, isGalleryVisible: true });
  }

  getThumbnails() {
    return this.props.images.map(({ id, thumbnailUrl: url }) => ({ id, url }));
  }

  render() {
    return (
      <article
        className={classNames({
          [styles.container]: true,
          [styles.isGalleryVisible]: this.state.isGalleryVisible,
        })}
      >
        <div
          className={styles.wrapper}
        >
          <div
            className={styles.galleryContainer}
          >
            { this.props.images.length &&
              <Gallery
                selectedImageId={this.state.selectedImageId}
                images={this.props.images}
                onImageClick={this.onImageClick}
                onThumbnailClick={this.onThumbnailClick}
                thumbnails={this.getThumbnails()}
                navClassName={styles.galleryNav}
              />
            }
          </div>
          <div className={styles.detailsContainer}>
            { this.props.image &&
            <div data-test="MovieDetails.image" className={styles.image}>
              <img src={this.props.image} />
            </div>
              }
            <div className={styles.contentWrapper}>
              <div className={styles.titleContainer}>
                <h2 className={styles.originalTitle}>{this.props.originalTitle}</h2>
                { this.props.title !== this.props.originalTitle &&
                  <span
                    data-test="MovieDetails.title"
                    className={styles.title}
                  >
                    {this.props.title}
                  </span>
                }
              </div>
              <div className={classNames(styles.row, styles.content)}>
                {this.props.overview}
              </div>
              { this.props.images.length &&
              <div className={styles.row}>
                <GalleryNav
                  selectedImageId={this.state.selectedImageId}
                  images={this.getThumbnails()}
                  onImageClick={this.onThumbnailClick}
                />
              </div> }
              <div className={styles.ratingBar}>
                <RatingBar
                  title={t('movieDetails.rating')}
                  value={this.props.voteAverage}
                  maxValue={10}
                />
                <span className={styles.votes}><strong>{this.props.voteCount}</strong> {t('movieDetails.votes')}</span>
              </div>
              {
                  this.props.imdbUrl &&
                  <a
                    data-test="MovieDetails.imdbUrl"
                    rel="noopener noreferrer"
                    href={this.props.imdbUrl}
                    target="_blank"
                    className={styles.iconLink}
                  >
                    <IMDBLogo />
                  </a>
                }
              {renderLinks(t('movies.genres'), this.props.genres)}
              {renderLinks(t('movieDetails.directors'), this.props.directors)}
              {renderLinks(t('movieDetails.writers'), this.props.writers)}
              {renderLinks(t('movieDetails.cast'), this.props.cast)}
            </div>
          </div>
        </div>
      </article>
    );
  }
}

MovieDetails.propTypes = movieDetailsPropTypes;

MovieDetails.defaultProps = {
  originalTitle: null,
  title: null,
  imdbUrl: null,
  overview: null,
  image: null,
  voteAverage: 0,
  voteCount: 0,
  genres: [],
  directors: [],
  writers: [],
  cast: [],
  images: [],
};

export default MovieDetails;
