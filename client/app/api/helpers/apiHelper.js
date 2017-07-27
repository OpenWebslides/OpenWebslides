import { loadState } from '../../../localStorage';
import defaults from '../../../config/api';
import asyncFetch from './asyncFetch';

function getAuthToken() {
  // We load it from the local storage.
  const loadedState = loadState();
  if (loadedState) {
    return loadedState.app.authentication.authToken ? loadedState.app.authentication.authToken : null;
  }

  return null;
}

/**
 * Represents an API request.
 * @returns {{}}
 * @constructor
 */
function ApiRequest() {
  const that = {};

  that.headers = {
    'Content-Type': 'application/vnd.api+json',
  };

  // try to get the auth token from the store:
  const tryToken = getAuthToken();
  if (tryToken) {
    that.headers.Authorization = `Bearer ${tryToken}`;
  }
  that.parameters = {};

  that.url = defaults.url;

  /**
   * Set the last part of the url to which to make the request
   * @param endpoint
   * @returns {{}}
   */
  that.setEndpoint = endpoint => {
    that.endPoint = endpoint;
    return that;
  };

  /**
   * Set the URL to which to send the request. Set to whatever is in the API config file by default.
   * @param url
   * @returns {{}}
   */
  that.setUrl = url => {
    that.url = url;
    return that;
  };

  /**
   * Set the type of http request to make.
   * @param type Type of the request. Must be one of ('GET', 'POST', 'PUT', 'PATCH', 'DELETE')
   * @returns {{}}
   */
  that.setMethod = type => {
    // Check it's a valid type:
    if (['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].indexOf(type) === -1) {
      throw new Error(`Invalid request method: '${type}'. Must be one of ('GET', 'POST', 'PUT', 'PATCH', 'DELETE')`);
    }

    // If attempting to set 'GET': check it doesn't have a body
    if (type === 'GET' && that.body) {
      throw new Error(`Error: Attempting to use a 'GET' request but there is a body.`);
    }

    // If attempting to set 'GET': check it doesn't have a body
    if (type in ['POST', 'PUT', 'PATCH', 'DELETE'] && that.parameters) {
      throw new Error(`Error: Attempting to use a '${type}' request but there are url parameters.`);
    }

    that.method = type;
    return that;
  };

  /**
   * Add a header to the http request
   * @param headerName
   * @param headerValue
   * @returns {{}}
   */
  that.addHeader = (headerName, headerValue) => {
    // Check it's not an authentication header. that one is included by default.
    if (headerName === 'Authentication') {
      throw new Error(
        `Invalid header 'Authentication': No need to specify an authentication header, it's included by default.`,
      );
    } else {
      that.headers[headerName] = headerValue;
      return that;
    }
  };

  /**
   * Set the body of the http request. Only works if it's not a 'GET' request.
   * @param body
   * @returns {{}}
   */
  that.setBody = body => {
    // Check we're not trying to add a body to a GET request
    if (that.method === 'GET') {
      throw new Error(`Can't add a body to a GET request.`);
    }
    that.body = typeof body === 'string' ? body : JSON.stringify(body);
    return that;
  };

  /**
   * Add a parameter to the request. Only works for GET requests.
   * @param paramName
   * @param paramVal
   * @returns {{}}
   */
  that.addParameter = (paramName, paramVal) => {
    // Check we're not adding parameters to something else than a GET:
    if (that.method !== 'GET') {
      throw new Error(`Can't add url parameters to a ${that.method} request!`);
    }

    that.parameters[paramName] = paramVal;
    return that;
  };

  /**
   * Execute the request and return a promise which will resolve with the response.
   * @returns {Promise}
   */
  that.executeRequest = async function executeRequest() {
    let url = that.url;
    if (that.endPoint) {
      url += that.endPoint;
    } else {
      throw new Error('Cannot execute request: no endpoint is set!');
    }
    if (that.parameters) {
      const keys = Object.keys(that.parameters);
      keys.forEach((key, index) => {
        const beginChar = index === 0 ? '?' : '&';
        url += `${beginChar}${key}=${that.parameters[key]}`;
      });
    }
    const config = {
      method: that.method,
      headers: that.headers,
      body: that.body,
    };

    return asyncFetch(url, config);
  };
  return that;
}

export default ApiRequest;
