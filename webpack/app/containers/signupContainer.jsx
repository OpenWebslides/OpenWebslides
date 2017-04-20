import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import requestSignup from 'actions/signupActions';

// Allows granular control over the input fields
function renderInput({ input, type, placeholder }) {
  return (
    <div>
      <input
        {...input}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}

function SignupForm(props) {
  console.log(process.env.API_URL);
  return (
    <div>
      <h1>Sign in</h1>
      <form onSubmit={props.handleSubmit(props.requestSignup)}>
        <Field name="email" placeholder="Email" component={renderInput} />
        <Field name="password" placeholder="Password" component={renderInput} type="password" />
        <Field
          name="password_confirmation"
          placeholder="Confirm Password"
          component={renderInput} type="password"
        />
        <button type="submit">Sign up</button>
      </form>
    </div >
  );
}

SignupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  requestSignup: PropTypes.func.isRequired,
};

renderInput.propTypes = {
  input: PropTypes.objectOf(String).isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
};

renderInput.defaultProps = {
  type: 'text',
};

// SignupForm is wrapped by the redux-form higher-order component
const SignupReduxForm = reduxForm({ form: 'signup' })(SignupForm);

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ requestSignup }, dispatch);
}

const visibleSignupForm = connect(null, mapDispatchToProps)(SignupReduxForm);

export default visibleSignupForm;
