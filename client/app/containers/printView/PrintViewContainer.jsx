import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Presentationals
import PrintView from 'presentationals/components/print-view/PrintView';
// Actions
import { fetchDeck } from 'actions/entities/decks';

function mapStateToProps(state) {
  const printViewState = state.app.printView;
  const entities = state.entities;
  return {
    printViewState,
    entities,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchDeck }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintView);
