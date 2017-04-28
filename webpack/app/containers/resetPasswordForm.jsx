import React from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import isEmail from 'sane-email-validation';

// Input Fields
import inputField from 'presentationals/formFields/inputField';

// Actions
import { resetPassword } from 'actions/resetPasswordActions';

function validate(values) {
  const { email } = values;
  const errors = {};

  if (!email || email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!isEmail(email.trim())) {
    errors.email = 'Email is invalid';
  }

  return errors;
}

function validateAndSubmit(values, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(resetPassword({ values, resolve, reject }));
  });
}

function resetPasswordForm(props) {
  if (props.submitSucceeded) {
    return (
      <div>
        <h4>
          If the account was registered with us,
          you will receive an email with further instructions
        </h4>
      </div>
    );
  }

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={props.handleSubmit(validateAndSubmit)}>

        <Field
          component={inputField}
          name="email"
          placeholder="Email"
        />

        <button type="submit">Submit</button>
      </form>
    </div >
  );
}

resetPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'resetPassword',
  validate,
  getFormState: state => state.vendor.forms,
})(resetPasswordForm);
