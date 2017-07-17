import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchDeckContent } from 'actions/deckActions';

import PrintView from 'presentationals/components/print-view/PrintView';

function mapStateToProps(state) {
  const printViewState = state.app.printView;
  const entities = state.entities;
  return {
    printViewState,
    entities,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchDeckContent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintView);
