import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions:
import { startOwnCollaborationsRequests } from 'actions/app/dashboard/own-collaborations';

import OwnCollaborations from 'presentationals/components/deckManagement/OwnCollaborations';

function mapStateToProps(state) {
  const ownCollaborationsState = state.app.ownCollaborations;
  const authState = state.app.authentication;
  const entities = state.entities;
  return {
    ownCollaborationsState,
    authState,
    entities,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ startOwnCollaborationsRequests }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnCollaborations);
