import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setActiveContentItemId, setSelectionOffsets } from 'actions/app/slide-editor';
import { updateContentBlock } from 'actions/entities/content-items';

import { getActiveContentItemId, getSelectionOffsets } from 'selectors/app/slide-editor';

import ContentEditable from './ContentEditable';

function mapStateToProps(state) {
  return {
    activeContentItemId: getActiveContentItemId(state),
    selectionOffsets: getSelectionOffsets(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateContentBlock, setActiveContentItemId, setSelectionOffsets }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentEditable);
