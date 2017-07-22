import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { contentItemTypes } from 'constants/contentItemTypes';

import { addContentItemToSlide } from 'actions/entities/slides';
import { getContentItemById } from 'selectors/entities/content-items';

import ContentItem from './ContentItem';

function mapStateToProps(state, props) {
  return {
    contentItem: getContentItemById(state, props.contentItemId),
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    handleKeyPress: (e, contentItem) => {
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
          props.parentItemId,
          props.contentItemId,
        ));
      }
    },
  };
}

const ContentItemContainer = connect(mapStateToProps, mapDispatchToProps)(ContentItem);

ContentItemContainer.propTypes = {
  contentItemId: PropTypes.string.isRequired,
  parentItemId: PropTypes.string,
  slideId: PropTypes.string.isRequired,
};

ContentItemContainer.defaultProps = {
  parentItemId: null,
};

export default ContentItemContainer;