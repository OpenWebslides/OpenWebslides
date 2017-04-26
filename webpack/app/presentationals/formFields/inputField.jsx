import React from 'react';
import PropTypes from 'prop-types';

function inputField(
  { input, placeholder, type, meta: { touched, error, active } }) {
  return (
    <div>
      <input
        {...input}
        type={type}
        placeholder={placeholder}
      />
      {!active && error && touched && <span>{error}</span>}
    </div>
  );
}

inputField.propTypes = {
  input: PropTypes.objectOf(String).isRequired,
  meta: PropTypes.objectOf(String).isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
};

inputField.defaultProps = {
  type: 'text',
};

export default inputField;
