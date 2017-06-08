import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import isEmail from 'sane-email-validation';

// Fields
import inputField from 'presentationals/formFields/InputField';
import newPasswordField from 'presentationals/formFields/NewPasswordField';

// Presentationals
import SignupConfirmation from 'presentationals/SignupConfirmation';

// Actions
import { signupUser } from 'actions/signupActions';
import { checkEmail } from 'actions/checkEmailActions';

// Field validation
export function validate(values) {
  const { email, password, passwordConfirmation, firstName, lastName } = values;

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
    errors.firstName = 'First name is required';
  }

  if (!lastName || lastName.trim() === '') {
    errors.lastName = 'Last name is required';
  }

  if (!passwordConfirmation || passwordConfirmation.trim() === '') {
    errors.passwordConfirmation = 'Password confirmation is required';
  }

  if (
    passwordConfirmation &&
    passwordConfirmation.trim() !== '' &&
    password &&
    password.trim() !== '' &&
    password !== passwordConfirmation
  ) {
    errors.password = 'Password and password confirmation do not match';
  }
  return errors;
}

// Async email availability validation
export function asyncValidate({ email }, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(checkEmail({ email, resolve, reject }));
  });
}

// Submit Validation
function validateAndSubmit(values, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(signupUser({ values, resolve, reject }));
  });
}

// Form
class SignupForm extends Component {
  componentDidMount() {
    if (this.props.isAuthenticated) {
      browserHistory.push('/');
    }
  }

  render() {
    if (this.props.submitSucceeded) {
      return <SignupConfirmation />;
    }

    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(validateAndSubmit)}
          className="o_form"
        >
          <div className="o_form__wrapper">

            <div className="o_form__header">
              <h1 className="title">Sign up</h1>
            </div>

            <Field component={inputField} name="email" label="Email" />

            <Field component={inputField} name="firstName" label="First name" />

            <Field component={inputField} name="lastName" label="Last name" />

            <Field
              component={newPasswordField}
              name="password"
              label="Password"
            />

            <Field
              component={inputField}
              name="passwordConfirmation"
              label="Confirm password"
              type="password"
            />

            <p className="o_form__buttons o_buttons-row">
              <span className="o_buttons-row__list">
                <span className="o_buttons-row__item">
                  <button type="submit" className="o_button">Sign up</button>
                </span>
              </span>
            </p>

          </div>
        </form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const signupReduxForm = reduxForm({
  form: 'signupForm',
  asyncValidate,
  asyncBlurFields: ['email'],
  validate,
  getFormState: state => state.vendor.forms,
})(SignupForm);

function mapStateToProps(state) {
  return {
    isAuthenticated: state.app.authentication.isAuthenticated,
  };
}

export default connect(mapStateToProps)(signupReduxForm);
