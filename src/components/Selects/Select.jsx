import React from 'react';
import PropTypes from 'prop-types';

import { CheckIcon, Select as NBSelect } from 'native-base';

export const Select = ({ options, displayFunc, value, onChange, placeholder, isDisabled, height, fontSize, minWidth, maxWidth }) => (
  <NBSelect
    m={0.2}
    height={height}
    fontSize={fontSize}
    _item={{ pl: 52 }}
    _selectedItem={{ bg: '#A2F2D2', pl: 4, startIcon: <CheckIcon size='5' mt={1} /> }}
    variant='rounded'
    accessibilityLabel={placeholder}
    placeholder={placeholder}
    selectedValue={value}
    onValueChange={val => onChange(val)}
    isDisabled={isDisabled}
    minWidth={minWidth}
    maxWidth={maxWidth}
  >
    {Object.keys(options).map(opt => (
      <NBSelect.Item key={opt} label={displayFunc(opt)} value={options[opt]} />
    ))}
  </NBSelect>
);

Select.propTypes = {
  options: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  displayFunc: PropTypes.func,
  isDisabled: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Select.defaultProps = {
  isDisabled: false,
  displayFunc: x => x,
  height: 10,
  fontSize: 16,
  minWidth: 150,
  maxWidth: '100%',
};

export default Select;
