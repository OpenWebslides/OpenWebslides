import { reduxForm } from 'redux-form';

import { resetPassword } from 'actions/resetPasswordActions';

import ResetPasswordForm from 'presentationals/components/reset-password/ResetPasswordForm';

export function validate(values) {
  const { password, passwordConfirmation } = values;

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
    password !== passwordConfirmation
  ) {
    errors.password = 'Password and password confirmation do not match';
  }

  return errors;
}

function validateAndSubmit(resetPasswordToken, values, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(resetPassword({ resetPasswordToken, values, resolve, reject }));
  });
}

export default reduxForm({
  form: 'resetPassword',
  validate,
  onSubmit: validateAndSubmit,
  getFormState: state => state.vendor.forms,
})(ResetPasswordForm);
