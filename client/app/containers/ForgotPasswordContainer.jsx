import { reduxForm } from 'redux-form';
import isEmail from 'sane-email-validation';

import { forgotPassword } from 'actions/forgotPasswordActions';

import ForgotPasswordForm from 'presentationals/components/forgot-password/ForgotPasswordForm';

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
    dispatch(forgotPassword({ values, resolve, reject }));
  });
}

export default reduxForm({
  form: 'forgotPassword',
  validate,
  onSubmit: validateAndSubmit,
  getFormState: state => state.vendor.forms,
})(ForgotPasswordForm);
