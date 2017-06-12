import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Link, Redirect } from 'react-router-dom';

import InputField from 'presentationals/objects/form-fields/InputField';

function EmailSigninForm(props) {
  const { t } = props;

  if (props.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <form className="o_form" onSubmit={props.handleSubmit}>
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
  error: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

EmailSigninForm.defaultProps = {
  error: '',
};

export default EmailSigninForm;
