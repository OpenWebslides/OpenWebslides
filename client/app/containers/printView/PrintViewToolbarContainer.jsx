import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PrintViewToolbar from 'presentationals/components/print-view/PrintViewToolbar';

import { changeImagePref, changeIframePref, changeDecorativeImagePref } from 'actions/printViewActions';

function mapStateToProps(state) {
  const printViewState = state.app.printView;
  return {
    printViewState,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeImagePref, changeIframePref, changeDecorativeImagePref }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintViewToolbar);
