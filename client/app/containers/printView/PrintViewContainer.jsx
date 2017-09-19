import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Presentationals
import PrintView from 'presentationals/components/print-view/PrintView';
// Actions
import { fetchDeck } from 'actions/entities/decks';
import { fetchConversations } from 'actions/entities/conversations';
import { fetchDeckComments } from 'actions/entities/conversation-comments';

function mapStateToProps(state) {
  const printViewState = state.app.printView;
  const entities = state.entities;
  return {
    printViewState,
    entities,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchDeck, fetchConversations, fetchDeckComments }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintView);
