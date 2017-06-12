import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import InputField from 'presentationals/objects/form-fields/InputField';

export default function ResetPasswordForm(props) {
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
      <form className="o_form" onSubmit={props.handleSubmit}>
        <div className="o_form__wrapper">

          <div className="o_form__header">
            <h1 className="title">Reset Password</h1>
          </div>

          <Field component={InputField} name="email" label="Email" />

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
