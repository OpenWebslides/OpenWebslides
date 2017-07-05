import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { requestUserImports } from 'actions/userImportsActions';

import UserImports from 'presentationals/components/deckManagement/UserImports';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ requestUserImports }, dispatch);
}

function mapStateToProps(state) {
  const feedState = state.app.feed;
  return {
    feedState,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserImports);
