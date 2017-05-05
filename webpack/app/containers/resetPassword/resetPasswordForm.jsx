import React from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';

// Fields
import inputField from 'presentationals/formFields/inputField';
import newPasswordField from 'presentationals/formFields/newPasswordField';

// Actions
import { resetPassword } from 'actions/resetPasswordActions';

// Field validation
export function validate(values) {
  const {
    password,
    passwordConfirmation,
  } = values;

  const errors = {};

  if (!password || password.trim() === '') {
    errors.password = 'Password is required';
  }

  if (!passwordConfirmation || passwordConfirmation.trim() === '') {
    errors.passwordConfirmation = 'Password Confirmation is required';
  }

  if (
    passwordConfirmation &&
    passwordConfirmation.trim() !== '' &&
    password &&
    password.trim() !== '' &&
    password !== passwordConfirmation) {
    errors.password = 'Password and password confirmation do not match';
  }

  return errors;
}

// Submit validation
function validateAndSubmit(resetPasswordToken, values, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(resetPassword({ resetPasswordToken, values, resolve, reject }));
  });
}

// Form
function resetPasswordForm(props) {
  const resetPasswordToken = props.location.query.reset_password_token;

  if (!resetPasswordToken) {
    return (
      <h2>No password reset token was provided.</h2>
    );
  }

  if (props.submitSucceeded) {
    return (
      <h2>Your password has been successfully reset!</h2>
    );
  }

  return (
    <div>

      <form
        className="red"
        onSubmit={props.handleSubmit(validateAndSubmit.bind(null, resetPasswordToken))}
      >

        <Field
          component={newPasswordField}
          name="password"
          placeholder="Password"
          type="password"
          classname="red"
        />

        <Field
          component={inputField}
          name="passwordConfirmation"
          placeholder="Confirm Password"
          type="password"
        />

        {props.error && <strong>{props.error}</strong>}

        <button type="submit">Sign up</button>

      </form>

    </div >
  );
}


resetPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  location: PropTypes.objectOf(Object),
  error: PropTypes.string,
  submitSucceeded: PropTypes.bool.isRequired,
};

resetPasswordForm.defaultProps = {
  location: { query: '' },
  error: '',
};

export default reduxForm({
  form: 'resetPassword',
  validate,
  getFormState: state => state.vendor.forms,
})(resetPasswordForm);

