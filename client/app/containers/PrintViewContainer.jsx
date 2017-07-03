import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchDeckContent } from 'actions/slideActions';

import PrintView from 'presentationals/components/print-view/PrintView';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchDeckContent }, dispatch);
}

export default connect(null, mapDispatchToProps)(PrintView);
