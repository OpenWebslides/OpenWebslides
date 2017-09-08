import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import {
  getFocusedContentItemId,
  getFocusedSlideViewType,
} from 'selectors/app/slide-editor';

import { getContentItemById } from 'selectors/entities/content-items';
import { deleteContentItemFromSlide } from 'actions/entities/slides';
import { deleteAssetContentItem } from 'actions/other/assetActions';

import generateAttributesObject from 'lib/content-item/helpers/generateAttributes';
import LiveViewItem from './LiveViewItem';

function mapStateToProps(state, props) {
  const contentItem = getContentItemById(state, props.contentItemId);
  const focusedSlideViewType = getFocusedSlideViewType(state);
  const focusedContentItemId = getFocusedContentItemId(state);

  const isFocused =
    contentItem.id === focusedContentItemId &&
    props.slideViewType === focusedSlideViewType;
  const attributes = generateAttributesObject(contentItem);

  return {
    contentItem,
    attributes,
    isFocused,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteContentItemFromSlide, deleteAssetContentItem }, dispatch);
}

const LiveViewItemContainer = connect(mapStateToProps, mapDispatchToProps)(LiveViewItem);

LiveViewItemContainer.propTypes = {
  slideViewType: PropTypes.string.isRequired,
  contentItemId: PropTypes.string.isRequired,
  ancestorItemIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  slideId: PropTypes.string.isRequired,
};

export default LiveViewItemContainer;
