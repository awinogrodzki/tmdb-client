import React from 'react';
import PropTypes from 'prop-types';
import styles from './Value.css';

const Value = ({ option, onDelete }) => (
  <div className={styles.container}>
    <button
      data-test="Value.deleteButton"
      className={styles.deleteButton}
      onMouseDown={() => onDelete(option)}
      onTouchStart={() => onDelete(option)}
    />
    <span className={styles.label}>{option.label}</span>
  </div>
);

Value.propTypes = {
  onDelete: PropTypes.func,
  option: PropTypes.shape({
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

Value.defaultProps = {
  onDelete: () => {},
};

export default Value;
