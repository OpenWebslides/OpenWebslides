import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import requestSignup from './actions'

class Signup extends Component {
  constructor (props) {
    super(props)

    this.submit = this.submit.bind(this)
  }

  submit (values) {
    this.props.requestSignup(values)
  }

  render () {
    const { handleSubmit } = this.props

    return (
      <div>
        <form onSubmit={handleSubmit(this.submit)}>
          <h4>Signup!</h4>
          <label htmlFor='email'>Email</label>
          <Field
            name='email'
            type='text'
            id='email'
            className='email'
            label='Email'
            component='input'
          />
          <label htmlFor='password'>Password</label>
          <Field
            name='password'
            type='password'
            className='password'
            label='Password'
            component='input'
          />
          <label htmlFor='password_confirmation'>Confirm Password</label>
          <Field
            name='password_confirmation'
            type='password'
            className='password'
            label='Confirm Password'
            component='input'
          />
          <button action='submit'>SIGNUP</button>
        </form>
      </div>
    )
  }
}

Signup.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  requestSignup: PropTypes.func.isRequired
}

function mapStateToProps ({ signup }) {
  return { signup }
}

const connected = connect(mapStateToProps, { requestSignup })(Signup)

const formed = reduxForm({
  form: 'signup'
})(connected)

export default formed
