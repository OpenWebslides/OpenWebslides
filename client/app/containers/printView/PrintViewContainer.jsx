import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintView);
