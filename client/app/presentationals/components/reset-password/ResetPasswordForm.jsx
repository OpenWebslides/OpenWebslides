import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Field } from 'redux-form';

import InputField from 'presentationals/objects/form-fields/InputField';
import NewPasswordField from 'presentationals/objects/form-fields/NewPasswordField';

class ResetPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetPasswordToken = queryString.parse(
      this.props.location.search,
    ).reset_password_token;
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    if (!this.resetPasswordToken) {
      return <h2>No password reset token was provided.</h2>;
    }

    if (this.props.submitSucceeded) {
      return <h2>Your password has been successfully reset!</h2>;
    }

    return (
      <div>

        <form className="red" onSubmit={this.handleSubmit}>

          <Field
            component={NewPasswordField}
            name="password"
            placeholder="Password"
            type="password"
            classname="red"
          />

          <Field
            component={InputField}
            name="passwordConfirmation"
            placeholder="Confirm Password"
            type="password"
          />

          {this.props.error && <strong>{this.props.error}</strong>}

          <button type="submit">Sign up</button>

        </form>

      </div>
    );
  }
}

ResetPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  location: PropTypes.objectOf(Object),
  error: PropTypes.string,
  values: PropTypes.objectOf(Object).isRequired,
  dispatch: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
};

ResetPasswordForm.defaultProps = {
  location: { query: '' },
  error: '',
};

export default ResetPasswordForm;
