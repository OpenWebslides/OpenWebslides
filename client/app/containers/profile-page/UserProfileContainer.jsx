import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Presentationals
import PrintView from 'presentationals/components/profile-page/UserProfile';
// Actions
import { fetchUser, fetchUserCollaborations } from 'actions/entities/users';

function mapStateToProps(state) {
  const profilePageState = state.app.profilePage;
  const entities = state.entities;
  return {
    profilePageState,
    entities
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUser, fetchUserCollaborations }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintView);
