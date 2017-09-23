import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Presentationals
import PrintView from 'presentationals/components/profile-page/UserProfile';

import { profilePageStartRequests } from 'actions/app/profile-page';

function mapStateToProps(state) {
  const profilePageState = state.app.profilePage;
  const entities = state.entities;
  return {
    profilePageState,
    entities,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ profilePageStartRequests }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintView);
