import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Presentationals
import PrintView from 'presentationals/components/profile-page/UserProfile';
// Actions
import { fetchUser, fetchUserCollaborations, fetchUserDecksIds } from 'actions/entities/users';

function mapStateToProps(state) {
  const profilePageState = state.app.profilePage;
  const entities = state.entities;
  return {
    profilePageState,
    entities,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUser, fetchUserCollaborations, fetchUserDecksIds }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintView);
