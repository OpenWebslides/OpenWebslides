import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import isEmail from 'sane-email-validation';

import { signupUser } from 'actions/signupActions';

import SignupForm from 'presentationals/components/signup/SignupForm';

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

function validateAndSubmit(values, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(signupUser({ values, resolve, reject }));
  });
}

const connectedForm = reduxForm({
  form: 'signupForm',
  validate,
  onSubmit: validateAndSubmit,
  getFormState: state => state.vendor.forms,
})(SignupForm);

function mapStateToProps(state) {
  return {
    isAuthenticated: state.app.authentication.isAuthenticated,
  };
}

export default connect(mapStateToProps)(connectedForm);
