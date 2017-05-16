import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import isEmail from 'sane-email-validation';
import { browserHistory } from 'react-router';
import i18n from 'i18next';
import { translate } from 'react-i18next';

// Fields
import InputField from 'presentationals/formFields/InputField';

// Actions
import { emailSigninUser } from 'actions/signinActions';

// Field validation
export function validate(values) {
  const { email, password } = values;

  const errors = {};

  if (!email || email.trim() === '') {
    errors.email = i18n.t('formErrors:emailRequired');
  } else if (!isEmail(email)) {
    errors.email = i18n.t('formErrors:emailInvalid');
  }

  if (!password || password.trim() === '') {
    errors.password = i18n.t('formErrors:passwordRequired');
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
function EmailSigninForm(props) {
  const { t } = props;
  return (
    <div>
      <h1>{t('signin:signin')}</h1>
      <form onSubmit={props.handleSubmit(validateAndSubmit)}>

        <Field component={InputField} name="email" placeholder={t('email')} />

        <Field
          component={InputField}
          name="password"
          placeholder={t('password')}
          type="password"
        />

        {props.error && <strong>{props.error}</strong>}

        <button type="submit">{t('signin:signin')}</button>
      </form>
    </div>
  );
}

EmailSigninForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

EmailSigninForm.defaultProps = {
  error: '',
};

export default reduxForm({
  form: 'emailSignin',
  validate,
  getFormState: state => state.vendor.forms,
  onSubmitSuccess: () => browserHistory.push('/'),
})(translate()(EmailSigninForm));
