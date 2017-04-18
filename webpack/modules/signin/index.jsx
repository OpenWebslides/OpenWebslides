import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import requestSignin from './actions'

// Allows granular control over the input fields
function renderInput ({ input, type, placeholder }) {
  return (
    <div>
      <input
        {...input}
        type={type}
        placeholder={placeholder}
      />
    </div>
  )
}

function SigninForm (props) {
  return (
    <div>
      <h1>Sign in</h1>
      <form onSubmit={props.handleSubmit(props.requestSignin)}>
        <Field name='email' placeholder='Email' component={renderInput} />
        <Field name='password' placeholder='Password' component={renderInput} type='password' />
        <button type='submit'>Sign in</button>
      </form>
    </div >
  )
}

SigninForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  requestSignin: PropTypes.func.isRequired
}

renderInput.propTypes = {
  input: PropTypes.objectOf(String).isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string.isRequired
}

renderInput.defaultProps = {
  type: 'text'
}

// SigninForm is wrapped by the redux-form higher-order component
const SigninReduxForm = reduxForm({ form: 'signin' })(SigninForm)

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ requestSignin }, dispatch)
}

const visibleSigninForm = connect(null, mapDispatchToProps)(SigninReduxForm)

export default visibleSigninForm
