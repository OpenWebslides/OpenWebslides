import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';

export default class OauthCallback extends Component {
  componentDidMount() {
    const authToken = queryString.parse(this.props.location.search).token;
    this.props.oauthSigninUser({ authToken });
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h4>Authenticating...</h4>
      </div>
    );
  }
}

OauthCallback.propTypes = {
  location: PropTypes.objectOf(Object),
  oauthSigninUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

OauthCallback.defaultProps = {
  location: { search: '' },
};
