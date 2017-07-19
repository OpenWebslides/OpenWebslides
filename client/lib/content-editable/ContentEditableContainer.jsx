import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateContentBlock, setActiveContentBlock, updateSelection } from 'actions/contentBlockActions';

import { getActiveContentItemId, getSelectionOffsets } from 'selectors/app/editor';

import ContentEditable from './ContentEditable';

function mapStateToProps(state) {
  return {
    activeContentItemId: getActiveContentItemId(state),
    selectionOffsets: getSelectionOffsets(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateContentBlock, setActiveContentBlock, updateSelection }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentEditable);
