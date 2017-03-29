import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import requestSignin from './actions';

class Signin extends Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  submit(values) {
    this.props.requestSignin(values);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <h1>SIGN IN</h1>
        <label htmlFor="email">Email</label>
        <Field
          name="email"
          type="text"
          id="email"
          className="email"
          component="input"
        />
        <label htmlFor="password">Password</label>
        <Field
          name="password"
          type="password"
          id="password"
          className="password"
          component="input"
        />
        <button action="submit">SIGN IN</button>
      </form>
    );
  }
}

Signin.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  requestSignin: PropTypes.func.isRequired,
};

function mapStateToProps({ signin }) {
  return { signin };
}


const connected = connect(mapStateToProps, { requestSignin })(Signin);

const formed = reduxForm({
  form: 'signin',
})(connected);

export default formed;

