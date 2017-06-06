import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import isEmail from 'sane-email-validation';

// Fields
import inputField from 'presentationals/formFields/InputField';

// Actions
import { forgotPassword } from 'actions/forgotPasswordActions';

// Field validation
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

// Submit validation
function validateAndSubmit(values, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(forgotPassword({ values, resolve, reject }));
  });
}

// Form
function ResetPasswordForm(props) {
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
      <form className="o_form" onSubmit={props.handleSubmit(validateAndSubmit)}>
        <div className="o_form__wrapper">

          <div className="o_form__header">
            <h1 className="title">Reset Password</h1>
          </div>

          <Field component={inputField} name="email" label="Email" />

          <p className="o_form__buttons o_buttons-row">
            <span className="o_buttons-row__list">
              <span className="o_buttons-row__item">
                <button type="submit" className="o_button">Submit</button>
              </span>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

ResetPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'requetResetPassword',
  validate,
  getFormState: state => state.vendor.forms,
})(ResetPasswordForm);
