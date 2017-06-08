import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions
import { confirmEmail } from 'actions/confirmEmailActions';

// Presentationals
import SuccessMessage from 'presentationals/emailConfirmation/SuccessMessage';
import FailureMessage from 'presentationals/emailConfirmation/FailureMessage';
import WaitingMessage from 'presentationals/emailConfirmation/WaitingMessage';

class EmailConfirmation extends Component {
  componentDidMount() {
    const confirmationToken = this.props.location.query.confirmation_token;
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

function mapStateToProps(state) {
  return {
    emailConfirmed: state.app.confirmEmail.emailConfirmed,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ confirmEmail }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailConfirmation);
