import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import isEmail from 'sane-email-validation';
import { browserHistory } from 'react-router';

// Fields
import InputField from 'presentationals/formFields/InputField';

// Actions
import { emailSigninUser } from 'actions/signinActions';

// Field validation
export function validate(values) {
  const { email, password } = values;

  const errors = {};

  if (!email || email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!isEmail(email)) {
    errors.email = 'Email is invalid';
  }

  if (!password || password.trim() === '') {
    errors.password = 'Password is required';
  }

  return errors;
}

// Submit validation
function validateAndSubmit(values, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(emailSigninUser({ values, resolve, reject }));
  });
}

// Form
function emailSigninForm(props) {
  return (
    <div>
      <h1>Sign in</h1>
      <form onSubmit={props.handleSubmit(validateAndSubmit)}>

        <Field component={InputField} name="email" placeholder="Email" />

        <Field
          component={InputField}
          name="password"
          placeholder="Password"
          type="password"
        />

        {props.error && <strong>{props.error}</strong>}

        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}

emailSigninForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

emailSigninForm.defaultProps = {
  error: '',
};

export default reduxForm({
  form: 'emailSignin',
  validate,
  getFormState: state => state.vendor.forms,
  onSubmitSuccess: () => browserHistory.push('/'),
})(emailSigninForm);
