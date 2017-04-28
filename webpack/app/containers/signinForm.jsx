import React from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import isEmail from 'sane-email-validation';
import { browserHistory } from 'react-router';

// Input Fields
import inputField from 'presentationals/formFields/inputField';

// Actions
import { signinUser } from 'actions/signinActions';

// Field validation
function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!isEmail(values.email.trim())) {
    errors.email = 'Email is invalid';
  }

  if (!values.password || values.password.trim() === '') {
    errors.password = 'Password is required';
  }

  return errors;
}

// Submit validation
function validateAndSubmit(values, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(signinUser({ values, resolve, reject }));
  });
}

// Form
function SigninForm(props) {
  return (
    <div>
      <h1>Sign in</h1>
      <form onSubmit={props.handleSubmit(validateAndSubmit)}>

        <Field
          component={inputField}
          name="email"
          placeholder="Email"
        />

        <Field
          component={inputField}
          name="password"
          placeholder="Password"
          type="password"
        />

        {props.error && <strong>{props.error}</strong>}

        <button type="submit">Sign in</button>
      </form>
    </div >
  );
}

SigninForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

export default reduxForm({
  form: 'signin',
  validate,
  getFormState: state => state.vendor.forms,
  onSubmitSuccess: () => browserHistory.push('/'),

})(SigninForm);

