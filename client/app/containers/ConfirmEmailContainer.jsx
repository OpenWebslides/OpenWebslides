import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { confirmEmail } from 'actions/confirmEmailActions';

import ConfirmEmail from 'presentationals/components/email-confirmation/ConfirmEmail';

function mapStateToProps(state) {
  return {
    emailConfirmed: state.app.confirmEmail.emailConfirmed,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ confirmEmail }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmail);
