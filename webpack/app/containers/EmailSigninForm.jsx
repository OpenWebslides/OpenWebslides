import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import isEmail from 'sane-email-validation';
import { Link, browserHistory } from 'react-router';
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
      <form className="o_form" onSubmit={props.handleSubmit(validateAndSubmit)}>
        <div className="o_form__wrapper">

          <div className="o_form__header">
            <h1 className="title">{t('signin:signin')}</h1>
          </div>

          <Field component={InputField} name="email" label={t('email')} />

          <Field
            component={InputField}
            name="password"
            label={t('password')}
            type="password"
          />

          {props.error && <strong>{props.error}</strong>}

          <p className="o_form__buttons o_buttons-row">
            <span className="o_buttons-row__list">
              <span className="o_buttons-row__item">
                <button type="submit" className="o_button">
                  {t('signin:signin')}
                </button>
              </span>
              <span className="o_buttons-row__item">
                <Link className="o_button" to="/forgot_password">
                  {t('forgotPassword')}
                </Link>
              </span>
            </span>
          </p>

        </div>
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
  onSubmitSuccess: () => browserHistory.push('/app'),
})(translate()(EmailSigninForm));
