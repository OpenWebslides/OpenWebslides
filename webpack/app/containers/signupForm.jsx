import React from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import isEmail from 'sane-email-validation';

import inputField from 'presentationals/formFields/inputField';
import newPasswordField from 'presentationals/formFields/newPasswordField';

import { signupUser } from 'actions/signupActions';
import { checkEmailAvailable } from 'actions/serverValidationActions';

// Field validation
function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!isEmail(values.email)) {
    errors.email = 'Email is invalid';
  }

  if (!values.password || values.password.trim() === '') {
    errors.password = 'Password is required';
  }

  if (!values.confirm_password || values.password.trim() === '') {
    errors.confirm_password = 'Password confirmation is required';
  }

  if (
    values.confirm_password &&
    values.confirm_password.trim() !== '' &&
    values.password &&
    values.password.trim() !== '' &&
    values.password !== values.confirm_password) {
    errors.password = 'Password and password confirmation do not match';
  }
  return errors;
}

// Aync email availability validation
function asyncValidate({ email }, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(checkEmailAvailable({ email, resolve, reject }));
  });
}

// Submit Validation
function validateAndSubmit(values, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(signupUser({ values, resolve, reject }));
  });
}

// Form
function SignupForm(props) {
  if (props.submitSucceeded) {
    return (
      <div>
        <h3>We sent you a mail</h3>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={props.handleSubmit(validateAndSubmit)}>

        <Field
          component={inputField}
          name="email"
          placeholder="Email"
        />

        <Field
          component={newPasswordField}
          name="password"
          placeholder="Password"
          type="password"
        />

        <Field
          component={inputField}
          name="confirm_password"
          placeholder="Confirm Password"
          type="password"
        />

        <button type="submit">Sign up</button>
      </form>
    </div >
  );
}

SignupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'signupForm',
  asyncValidate,
  asyncBlurFields: ['email'],
  validate,
  getFormState: state => state.vendor.forms,
})(SignupForm);
