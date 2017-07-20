import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateContentBlock, setActiveContentBlock, updateSelection } from 'actions/entities/content-items';

import { getActiveContentItemId, getSelectionOffsets } from 'selectors/app/slide-editor';

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
