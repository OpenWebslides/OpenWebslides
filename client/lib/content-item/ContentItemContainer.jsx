import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { contentItemTypes } from 'constants/contentItemTypes';

import { addContentItemToSlide, deleteContentItemFromSlide } from 'actions/entities/slides';
import { getActiveContentItemId, getFocusedSlideViewType } from 'selectors/app/slide-editor';
import { getContentItemById } from 'selectors/entities/content-items';

import ContentItem from './ContentItem';

// #TODO move this code out of here
function generateAttributesObject(contentItem) {
  const attributesMap = {
    viewType: 'data-view-type',
  };
  const attributes = {};

  Object.keys(attributesMap).forEach(key => {
    attributes[attributesMap[key]] = _.isString(contentItem[key])
      ? contentItem[key].toLowerCase()
      : contentItem[key];
  });

  return attributes;
}

function mapStateToProps(state, props) {
  const contentItem = getContentItemById(state, props.contentItemId);
  const focusedSlideViewType = getFocusedSlideViewType(state);
  const activeContentItemId = getActiveContentItemId(state);
  const isFocused = (
    contentItem.id === activeContentItemId &&
    props.slideViewType === focusedSlideViewType
  );
  const attributes = generateAttributesObject(contentItem);

  return {
    contentItem,
    attributes,
    isFocused,
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    handleKeyDown: (e, contentItem) => {
      // On enter key press, add new contentItem below the current one.
      if (e.key === 'Enter') {
        let newContentItemType;

        if (contentItem.contentItemType === contentItemTypes.LIST_ITEM) {
          newContentItemType = contentItemTypes.LIST_ITEM;
        } else {
          newContentItemType = contentItemTypes.PARAGRAPH;
        }

        dispatch(addContentItemToSlide(
          props.slideId,
          newContentItemType,
          {},
          _.last(props.ancestorItemIds),
          props.contentItemId,
        ));
      }
      // If backspace is pressed on an empty contentItem, delete the contentItem and jump to the previous one.
      else if (e.key === 'Backspace') {
        if (contentItem.text === '') {
          e.preventDefault();
          dispatch(deleteContentItemFromSlide(
            props.slideId,
            props.contentItemId,
            props.ancestorItemIds,
          ));
        }
      }
    },
  };
}

const ContentItemContainer = connect(mapStateToProps, mapDispatchToProps)(ContentItem);

ContentItemContainer.propTypes = {
  slideViewType: PropTypes.string.isRequired,
  contentItemId: PropTypes.string.isRequired,
  ancestorItemIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  slideId: PropTypes.string.isRequired,
};

export default ContentItemContainer;