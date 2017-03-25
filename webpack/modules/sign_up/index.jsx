import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import requestSignup from './actions';

class SignUp extends Component {

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.submit)}>
          <h4>Signup!</h4>
          <label htmlFor="email">Email</label>
          <Field
            name="email"
            type="text"
            id="email"
            className="email"
            label="Email"
            component="input"
          />
          <label htmlFor="password">Password</label>
          <Field
            name="password"
            type="password"
            className="password"
            label="Password"
            component="input"
          />
          <label htmlFor="password_confirmation">Confirm Password</label>
          <Field
            name="password_confirmation"
            type="password"
            className="password"
            label="Confirm Password"
            component="input"
          />
          <button action="submit">SIGNUP</button>
        </form>
      </div>
    );
  }
}

SignUp.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};


function mapStateToProps({ signUp }) {
  return { signUp };
}

const connected = connect(mapStateToProps, { requestSignup })(SignUp);

const formed = reduxForm({
  form: 'signUp',
})(connected);

export default formed;
