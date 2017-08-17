import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Redirect } from 'react-router-dom';

import InputField from 'presentationals/objects/form-fields/InputField';
import NewPasswordField from 'presentationals/objects/form-fields/NewPasswordField';

import SignupConfirmation from './SignupConfirmation';

function SignupForm(props) {
  if (props.isAuthenticated) {
    return <Redirect to="/" />;
  }

  if (props.submitSucceeded) {
    return <SignupConfirmation />;
  }

  return (
    <div>
      <form onSubmit={props.handleSubmit} className="o_form">
        <div className="o_form__wrapper">

          <div className="o_form__header">
            <h1 className="title">Sign up</h1>
          </div>

          <Field component={InputField} name="email" label="Email" />

          <Field component={InputField} name="firstName" label="First name" />

          <Field component={InputField} name="lastName" label="Last name" />

          <Field
            component={NewPasswordField}
            name="password"
            label="Password"
          />

          <Field
            component={InputField}
            name="passwordConfirmation"
            label="Confirm password"
            type="password"
          />

          <Field
            component={InputField}
            name="tosAccepted"
            label="I accept the Terms of Service"
            type="checkbox"
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

SignupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default SignupForm;
