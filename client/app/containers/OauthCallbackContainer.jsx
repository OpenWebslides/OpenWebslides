import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { oauthSigninUser } from 'actions/signinActions';

import OauthCallback from 'presentationals/components/oauth/OauthCallback';

function mapStateToProps(state) {
  return {
    isAuthenticated: state.app.authentication.isAuthenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ oauthSigninUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OauthCallback);
