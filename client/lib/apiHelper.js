import loadState from 'localStorage';

function getAuthToken() {
  // We load it from the local storage.

  const loadedState = loadState();

  return loadedState.app.auth.token;
}

function ApiRequest() {
  const that = {};
  that.headers = {
    'Content-Type': 'application/vnd.api+json',
  };

  that.setEndpoint = endpoint => {
    that.endPoint = endpoint;
    return that;
  };

  that.setPort = port => {
    if (!isNaN(port)) {
      throw new Error(`Port must be an integer (received ${port} instead).`);
    }
    that.port = port;
    return that;
  };
  that.setMethod = type => {
    // Check it's a valid type:
    if (!(type in ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'])) {
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

  that.setBody = body => {
    // Check we're not trying to add a body to a GET request
    if (that.method === 'GET') {
      throw new Error(`Can't add a body to a GET request.`);
    }
    that.body = body;
    return that;
  };

  that.addParameter = (paramName, paramVal) => {
    // Check we're not adding parameters to something else than a GET:
    if (that.method !== 'GET') {
      throw new Error(`Can't add url parameters to a ${that.method} request!`);
    }

    that.parameters[paramName] = paramVal;
    return that;
  };
}

export default ApiRequest;
