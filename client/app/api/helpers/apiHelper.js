import { loadState } from '../../../localStorage';
import defaults from '../../../API_config';
import { ApiError, ValidationError } from './errors';

function getAuthToken() {
  // We load it from the local storage.
  const loadedState = loadState();
  return loadedState ? loadedState.local.auth.token : null; // TODO: change this when master gets updated to the last frontend branch
}

export async function asyncFetch(url, requestConfig = {}) {
  const response = await fetch(url, requestConfig);
  const { statusText, status } = response;
  let responseBody;

  switch (status) {
    case 400:
    case 401:
    case 403:
      throw new ApiError(statusText, status);
    case 422:
      responseBody = await response.json();
      throw new ValidationError(statusText, status, responseBody.errors);
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
    case 505:
      throw new ApiError(statusText, status);
    default:
      return response;
  }
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
    that.headers.Authentication = tryToken;
  }
  that.parameters = {};

  that.port = defaults.port ? parseInt(defaults.port, 10) : undefined;
  that.host = defaults.host ? defaults.host : undefined;

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
   * Set the port to which to send the request. Set to whatever is in the API_config file by default.
   * @param port
   * @returns {{}}
   */
  that.setPort = port => {
    if (isNaN(port)) {
      throw new Error(`Port must be an integer (received ${port} instead).`);
    }
    that.port = port;
    return that;
  };

  /**
   * Set the host to which to send the request. Set to whatever is in the API_config file by default.
   * @param host
   * @returns {{}}
   */
  that.setHost = host => {
    that.host = host;
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
      throw new Error(
        `Invalid request method: '${type}'. Must be one of ('GET', 'POST', 'PUT', 'PATCH', 'DELETE')`,
      );
    }

    // If attempting to set 'GET': check it doesn't have a body
    if (type === 'GET' && that.body) {
      throw new Error(
        `Error: Attempting to use a 'GET' request but there is a body.`,
      );
    }

    // If attempting to set 'GET': check it doesn't have a body
    if (type in ['POST', 'PUT', 'PATCH', 'DELETE'] && that.parameters) {
      throw new Error(
        `Error: Attempting to use a '${type}' request but there are url parameters.`,
      );
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
    that.body = JSON.stringify(body);
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
    let url = `http://${that.host}`;
    if (that.port) {
      url += `:${that.port}`;
    }
    if (that.endPoint) {
      url += `/${that.endPoint}`;
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
