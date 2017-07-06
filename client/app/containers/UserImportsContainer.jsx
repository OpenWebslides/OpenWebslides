import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { requestUserImports } from 'actions/userImportsActions';

import UserImports from 'presentationals/components/deckManagement/UserImports';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ requestUserImports }, dispatch);
}

function mapStateToProps(state) {
  const userImportsState = state.app.userImports;
  const authState = state.app.authentication;
  return {
    userImportsState,
    authState,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserImports);
