import React from 'react';
import PropTypes from 'prop-types';
import SelectHandler from '../SelectHandler';
import Option from '../Option';
import { optionType } from '../Option/types';

const OptionGroup = ({
  options,
  selectHandler,
}) => (
  <div>
    { options.filter(option => !selectHandler.isOptionSelected(option)).map(option => (
      <Option
        key={option.value}
        option={option}
        onClick={clickedOption => selectHandler.selectOption(clickedOption)}
      />
    )) }
  </div>
);

OptionGroup.propTypes = {
  selectHandler: PropTypes.instanceOf(SelectHandler).isRequired,
  options: PropTypes.arrayOf(optionType),
};

OptionGroup.defaultProps = {
  options: [],
};

export default OptionGroup;
