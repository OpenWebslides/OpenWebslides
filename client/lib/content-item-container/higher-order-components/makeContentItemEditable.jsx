import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { contentItemTypes } from 'constants/contentItemTypes';
import { slideViewTypes } from 'constants/slideViewTypes';
import { contentItemShape } from 'constants/propTypeShapes';

import { setFocusedContentItemId } from 'actions/app/slide-editor';
import {
  addContentItemToSlide,
  moveContentItemOnSlide,
  deleteContentItemFromSlide,
} from 'actions/entities/slides';
import { updateContentItem } from 'actions/entities/content-items';
import {
  getFocusedSlideViewType,
  getFocusedContentItemId,
  getFocusedTextPropName,
  getSelectionOffsets,
} from 'selectors/app/slide-editor';

import getComponentDisplayName from 'lib/getComponentDisplayName';

const makeContentItemEditable = (props = {}) => (ContentItemComponent) => {
  function mapStateToProps(state, ownProps) {
    const focusedSlideViewType = getFocusedSlideViewType(state);
    const focusedContentItemId = getFocusedContentItemId(state);
    const focusedTextPropName = getFocusedTextPropName(state);
    const isFocusedTextProp =
      (ownProps.textPropName !== undefined && focusedTextPropName !== null)
        ? (ownProps.textPropName === focusedTextPropName)
        : true;
    const isFocused = (
      isFocusedTextProp &&
      ownProps.contentItem.id === focusedContentItemId &&
      ownProps.slideViewType === focusedSlideViewType
    );
    const initialSelectionOffsets = getSelectionOffsets(state);

    return {
      isFocused,
      initialSelectionOffsets,
      ...props,
    };
  }

  function mapDispatchToProps(dispatch, ownProps) {
    return {
      onFocusContentItem: (newSelectionOffsets = null, textPropName = null) => {
        dispatch(setFocusedContentItemId(
          ownProps.contentItem.id,
          newSelectionOffsets,
          ownProps.slideViewType,
          textPropName,
        ));
      },
      onBlurContentItem: (newSelectionOffsets = null) => {
        dispatch(setFocusedContentItemId(
          null,
          newSelectionOffsets,
          null,
          null,
        ));
      },
      onUpdateContentItem: (newProps, newSelectionOffsets) => {
        dispatch(updateContentItem(
          ownProps.contentItem.id,
          newProps,
          newSelectionOffsets,
        ));
      },
      onMoveContentItemInDirection: (direction) => {
        dispatch(moveContentItemOnSlide(
          ownProps.slideId,
          ownProps.contentItem.id,
          ownProps.ancestorItemIds,
          direction,
        ));
      },
      onDeleteContentItem: () => {
        dispatch(deleteContentItemFromSlide(
          ownProps.slideId,
          ownProps.contentItem.id,
          ownProps.ancestorItemIds,
        ));
      },
      onAddNewContentItem: () => {
        const newContentItemType =
          (ownProps.contentItem.contentItemType === contentItemTypes.LIST_ITEM)
            ? contentItemTypes.LIST_ITEM
            : contentItemTypes.PARAGRAPH;

        dispatch(addContentItemToSlide(
          ownProps.slideId,
          newContentItemType,
          {},
          _.last(ownProps.ancestorItemIds),
          ownProps.contentItem.id,
        ));
      },
      // onViewTypeToggle
    };
  }

  const editableContentItemComponent = connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ContentItemComponent);

  editableContentItemComponent.displayName = `makeContentItemEditable(${getComponentDisplayName(ContentItemComponent)})`;
  editableContentItemComponent.propTypes = {
    contentItem: PropTypes.shape(contentItemShape).isRequired,
    ancestorItemIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    slideId: PropTypes.string.isRequired,
    slideViewType: PropTypes.oneOf(Object.values(slideViewTypes)).isRequired,
  };

  return editableContentItemComponent;
};

export default makeContentItemEditable;
