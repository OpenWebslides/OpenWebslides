import React from 'react';
import PropTypes from 'prop-types';

import InputField from './InputField';

function checkPasswordStrength(passwordFieldValue) {
  // #TODO add this to extraErrors
  const value = passwordFieldValue.trim();

  if (value.length >= 6 && value.length < 8) {
    return <div> Mediocre... </div>;
  }
  if (value.length >= 8) {
    return <div>There you go!</div>;
  }
  return <div> Too short!</div>;
}

function NewPasswordField(props) {
  const newProps = {
    ...props,
    type: 'password',
  };
  return (
    <div>
      <InputField {...newProps} />
      {props.meta.active && checkPasswordStrength(props.input.value)}
    </div>
  );
}

NewPasswordField.propTypes = {
  // type: PropTypes.string,
  // label: PropTypes.string.isRequired,
  // placeholder: PropTypes.string,
  input: PropTypes.objectOf(String).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    active: PropTypes.bool,
    error: PropTypes.string,
    extraErrors: PropTypes.arrayOf(String),
  }).isRequired,
};

NewPasswordField.defaultProps = {
  type: 'text',
  placeholder: '',
};

export default NewPasswordField;
