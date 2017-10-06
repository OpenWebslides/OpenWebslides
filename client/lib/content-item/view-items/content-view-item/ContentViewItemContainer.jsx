import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { moveContentItemOnSlide } from 'actions/entities/slides';
import {
  getFocusedContentItemId,
  getFocusedSlideViewType,
} from 'selectors/app/slide-editor';

import { getContentItemById } from 'selectors/entities/content-items';

import generateAttributesObject from 'lib/content-item/helpers/generateAttributes';
import ContentViewItem from './ContentViewItem';


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
  return {
    handleDirectionButtonClick: (direction, contentItem, ancestorItemIds, slideId) => {
      dispatch(
        moveContentItemOnSlide(slideId, contentItem.id, ancestorItemIds, direction),
      );
    },
  };
}

const ContentViewItemContainer = connect(mapStateToProps, mapDispatchToProps)(ContentViewItem);

ContentViewItemContainer.propTypes = {
  slideViewType: PropTypes.string.isRequired,
  contentItemId: PropTypes.string.isRequired,
  ancestorItemIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  slideId: PropTypes.string.isRequired,
};

export default ContentViewItemContainer;
