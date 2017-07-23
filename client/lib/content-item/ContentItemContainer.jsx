import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { contentItemTypes } from 'constants/contentItemTypes';

import { addContentItemToSlide, deleteContentItemFromSlide } from 'actions/entities/slides';
import { getContentItemById } from 'selectors/entities/content-items';

import ContentItem from './ContentItem';

function mapStateToProps(state, props) {
  return {
    contentItem: getContentItemById(state, props.contentItemId),
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
  contentItemId: PropTypes.string.isRequired,
  ancestorItemIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  slideId: PropTypes.string.isRequired,
};

export default ContentItemContainer;