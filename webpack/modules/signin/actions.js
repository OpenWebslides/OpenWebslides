import {
  REQUEST_SIGNIN
} from './constants'

function requestSignin ({ email, password }) {
  return {
    type: REQUEST_SIGNIN,
    meta: {
      email,
      password
    }
  }
}

export default requestSignin
