import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions:
import { startOwnDecksRequests, ownDeckDeletionRequest } from 'actions/app/dashboard/own-decks';

import OwnDecks from 'presentationals/components/deckManagement/OwnDecks';

function mapStateToProps(state) {
  const ownDecksState = state.app.ownDecks;
  const authState = state.app.authentication;
  const entities = state.entities;
  return {
    ownDecksState,
    authState,
    entities,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ startOwnDecksRequests, ownDeckDeletionRequest }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnDecks);
