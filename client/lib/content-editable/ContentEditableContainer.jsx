import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateContentBlock, setActiveContentBlock, updateSelection } from 'actions/contentBlockActions';

import ContentEditable from './ContentEditable';

function mapStateToProps(state) {
  return {
    activeContentItem: state.app.editor.contentItems.active,
    selectionOffsets: state.app.editor.selectionOffsets,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateContentBlock, setActiveContentBlock, updateSelection }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentEditable);
