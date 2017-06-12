import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import SuccessMessage from 'presentationals/components/email-confirmation/SuccessMessage';
import FailureMessage from 'presentationals/components/email-confirmation/FailureMessage';
import WaitingMessage from 'presentationals/components/email-confirmation/WaitingMessage';

export default class EmailConfirmation extends Component {
  componentDidMount() {
    const confirmationToken = queryString.parse(this.props.location.search)
      .confirmation_token;
    this.props.confirmEmail(confirmationToken);
  }

  render() {
    const { emailConfirmed } = this.props;

    switch (emailConfirmed) {
      case 'success': {
        return <SuccessMessage />;
      }
      case 'failed': {
        return <FailureMessage />;
      }
      default: {
        return <WaitingMessage />;
      }
    }
  }
}

EmailConfirmation.propTypes = {
  location: PropTypes.objectOf(Object).isRequired,
  confirmEmail: PropTypes.func.isRequired,
  emailConfirmed: PropTypes.string.isRequired,
};
