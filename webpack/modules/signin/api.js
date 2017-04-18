import handleApiErrors from '../../util/api_errors'

const SIGNIN_API_URL = 'http://localhost:5000/auth/token'

export default function signinApiCall (email, password) {
  return fetch(SIGNIN_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/vnd.api+json'
    },
    body: JSON.stringify({ auth: { email, password } })
  })
    .then(handleApiErrors)
    .then(function extractJson (apiResponse) { return apiResponse.json() })
    .then(function resolveJson (extractedJson) { return extractedJson })
    .catch(function throwError (error) { throw error })
}
