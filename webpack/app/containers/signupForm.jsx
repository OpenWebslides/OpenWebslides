import React from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import isEmail from 'sane-email-validation';

// Input Fields
import inputField from 'presentationals/formFields/inputField';
import newPasswordField from 'presentationals/formFields/newPasswordField';

// Presentationals
import SignupConfirmation from 'presentationals/signup/signupConfirmation';

// Actions
import { signupUser } from 'actions/signupActions';
import { checkEmailAvailable } from 'actions/serverValidationActions';

// Field validation
export function validate(values) {
  const {
    email,
    password,
    passwordConfirmation,
    firstName,
    lastName } = values;

  const errors = {};

  if (!email || email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!isEmail(email)) {
    errors.email = 'Email is invalid';
  }

  if (!password || password.trim() === '') {
    errors.password = 'Password is required';
  }

  if (!firstName || firstName.trim() === '') {
    errors.firstName = 'First Name is required';
  }

  if (!lastName || lastName.trim() === '') {
    errors.lastName = 'Last Name is required';
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

// Async email availability validation
export function asyncValidate({ email }, dispatch) {
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
    return <SignupConfirmation />;
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
          component={inputField}
          name="firstName"
          placeholder="First Name"
        />

        <Field
          component={inputField}
          name="lastName"
          placeholder="Last Name"
        />

        <Field
          component={newPasswordField}
          name="password"
          placeholder="Password"
          type="password"
        />

        <Field
          component={inputField}
          name="passwordConfirmation"
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
