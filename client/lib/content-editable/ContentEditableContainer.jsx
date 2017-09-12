import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  setFocusedContentItemId,
  setSelectionOffsets,
} from 'actions/app/slide-editor';
import { updateContentItem } from 'actions/entities/content-items';

import {
  getSelectionOffsets,
} from 'selectors/app/slide-editor';

import {
  addContentItemToSlide,
  deleteContentItemFromSlide,
} from 'actions/entities/slides';

import ContentEditable from './ContentEditable';

function mapStateToProps(state) {
  return {
    selectionOffsets: getSelectionOffsets(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateContentItem,
      setFocusedContentItemId,
      setSelectionOffsets,
      addContentItemToSlide,
      deleteContentItemFromSlide,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentEditable);
