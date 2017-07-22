import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setActiveContentItemId, setSelectionOffsets } from 'actions/app/slide-editor';
import { updateContentItem } from 'actions/entities/content-items';

import { getActiveContentItemId, getSelectionOffsets } from 'selectors/app/slide-editor';

import ContentEditable from './ContentEditable';

function mapStateToProps(state) {
  return {
    activeContentItemId: getActiveContentItemId(state),
    selectionOffsets: getSelectionOffsets(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateContentItem, setActiveContentItemId, setSelectionOffsets }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentEditable);