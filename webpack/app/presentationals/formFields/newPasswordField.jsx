import React from 'react';
import PropTypes from 'prop-types';

function checkPasswordStrength(passwordFieldValue) {
  const value = passwordFieldValue.trim();

  if (value.length >= 6 && value.length < 8) {
    return <div> Mediocre... </div>;
  }
  if (value.length >= 8) {
    return <div>There you go!</div>;
  }
  return <div> Too short!</div >;
}

function passwordField(
  { input, placeholder, meta: { touched, active, error } }) {
  return (
    <div>
      <input
        {...input}
        type="password"
        placeholder={placeholder}
      />
      {!active && touched && error && <span>{error}</span>}
      {active && checkPasswordStrength(input.value)}
    </div>
  );
}

passwordField.propTypes = {
  input: PropTypes.objectOf(String).isRequired,
  meta: PropTypes.objectOf(Boolean).isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default passwordField;
