import _ from 'lodash';
import { takeEvery, select, put } from 'redux-saga/effects';

import {
  contentItemTypes,
  imageContentItemTypes,
  sectionContentItemTypes,
  contentItemTypesById,
} from 'constants/contentItemTypes';
import { slideViewTypes } from 'constants/slideViewTypes';

import { ADD_CONTENT_ITEM_TO_SLIDE } from 'actions/entities/slides';
import { addContentItem } from 'actions/entities/content-items';
import { getActiveContentItemId } from 'selectors/app/slide-editor';
import { getSlideById } from 'selectors/entities/slides';
import { getContentItemsById } from 'selectors/entities/content-items';
import { generateContentItemId } from 'lib/ows-parts/helpers/generateIds';

import {
  getLastValidContentItemId,
  getContentItemAncestorItemIds,
  getNearestValidAncestorItemId,
} from 'lib/state-traversal/contentItems';

function getPropsForContentItemType(contentItemType, contentItemTypeProps) {
  // Get the default props for this contentItemType.
  const defaultProps = contentItemTypesById[contentItemType].defaultProps;
  // Add extra props that have been passed to the action.
  return {
    ...defaultProps,
    ...contentItemTypeProps,
  };
}

function findParentItemIdAndPreviousItemId(
  slide,
  activeContentItemId,
  contentItemType,
  contentItemsById,
) {
  // #TODO needs more intuititve way of handling imageContainers

  let parentItemId;
  let previousItemId;

  // If there is an active contentItem, we should put the new contentItem after it.
  if (activeContentItemId !== null) {
    // Get the ancestorItemIds for the active contentItem.
    const activeContentItemAncestorItemIds = getContentItemAncestorItemIds(
      activeContentItemId,
      slide.contentItemIds,
      contentItemsById,
    );

    // If the activeContentItem is a direct child of the slide.
    if (activeContentItemAncestorItemIds.length === 0) {
      // A slide can accommodate all kinds of contentItems, so just add the new contentItem
      // after the active one on the slide.
      parentItemId = null;
      previousItemId = activeContentItemId;
    }
    // If the activeContentItem has ancestorItems.
    else {
      // Find the nearest ancestorItem to which we can add the new contentItem. (This is not
      // always simply the parent; for example, a list can be a parentItem, but we shouldn't be
      // able to manually add random new items to it; it should only contain list items.)
      const validAncestorItemId = getNearestValidAncestorItemId(
        activeContentItemAncestorItemIds,
        contentItemsById,
        (contentItem) => {
          if (contentItemType === contentItemTypes.LIST_ITEM) {
            return contentItem.contentItemType === contentItemTypes.LIST;
          }
          else if (_.includes(imageContentItemTypes, contentItemType)) {
            return (
              contentItem.contentItemType === contentItemTypes.IMAGE_CONTAINER &&
              contentItem.imageType === contentItemType
            );
          }
          else {
            return _.includes(sectionContentItemTypes, contentItem.contentItemType);
          }
        },
      );

      // If a valid ancestor was found.
      if (validAncestorItemId !== null) {
        const validAncestorItemIdIndex = _.indexOf(
          activeContentItemAncestorItemIds,
          validAncestorItemId,
        );

        // Add the new contentItem to this valid ancestor...
        parentItemId = validAncestorItemId;
        // ...right after the 'subtree' that led up to it.
        previousItemId = validAncestorItemIdIndex === activeContentItemAncestorItemIds.length - 1
          ? activeContentItemId
          : activeContentItemAncestorItemIds[validAncestorItemIdIndex + 1];
      }
      // If no valid ancestor was found.
      else {
        // Add the new directly to the slide, right after the uppermost invalid ancestor.
        parentItemId = null;
        previousItemId = _.first(activeContentItemAncestorItemIds);
      }
    }
  }
  // If there is no active contentItem.
  else {
    // See if there is an existing section on the slide to which we could add the new contentItem.
    // In case of nested sections, we're adding the new contentItem to the 'bottom-most' section,
    // i.e. the deepest nested section that doesn't have any contentItems come after it.
    // #TODO make exception for titles
    // Note: this sets parentItemId to null if there is no suitable section.
    ({ contentItemId: parentItemId } = getLastValidContentItemId(
      slide.contentItemIds,
      contentItemsById,
      (contentItem) => {
        // We're looking for a section that lies on the 'last' path of the contentItems tree; so
        // only sections are valid contentItems in this case.
        return _.includes(sectionContentItemTypes, contentItem.contentItemType);
      },
      (contentItem) => {
        // Only search the children of actual sections; lists cannot contain a valid section anyway.
        return _.includes(sectionContentItemTypes, contentItem.contentItemType);
      },
    ));

    // The previousItem should be the last item in the parentItem (which cannot itself be a section,
    // otherwise it would've been found as the parentItem in the previous step).
    if (parentItemId !== null) {
      previousItemId = (contentItemsById[parentItemId].childItemIds.length > 0)
        ? _.last(contentItemsById[parentItemId].childItemIds)
        : null;
    }
    // If there is no parentItem, the previousItem should be the last direct child of the slide (if
    // there is one).
    else {
      previousItemId = (slide.contentItemIds.length > 0)
        ? _.last(slide.contentItemIds)
        : null;
    }
  }

  // If the contentItem to add is an image, check if the previousItem happens to be an
  // imageContainer of the correct type. If so, use it as the parentItem.
  if (
    _.includes(imageContentItemTypes, contentItemType) &&
    previousItemId !== null &&
    contentItemsById[previousItemId].contentItemType === contentItemTypes.IMAGE_CONTAINER &&
    contentItemsById[previousItemId].imageType === contentItemType
  ) {
    parentItemId = previousItemId;
    previousItemId = (contentItemsById[parentItemId].childItemIds.length > 0)
      ? _.last(contentItemsById[parentItemId].childItemIds)
      : null;
  }

  return {
    parentItemId,
    previousItemId,
  };
}

function* doAddContentItemToSlide(action) {
  try {
    const contentItemsById = yield select(getContentItemsById);
    const activeContentItemId = yield select(getActiveContentItemId);
    const slide = yield select(getSlideById, action.meta.slideId);
    const {
      contentItemType,
      contentItemTypeProps,
    } = action.meta;
    let {
      parentItemId,
      previousItemId,
    } = action.meta;

    // Generate an id for the contentItem that we're going to add.
    let contentItemId = generateContentItemId(
      slide.id,
      slide.contentItemSequence,
    );

    // If no parentItemId or previousItemId was explicitly passed to the action.
    if (
      parentItemId === null &&
      previousItemId === null
    ) {
      // Find an appropriate location on the slide to add the new contentItem.
      ({ parentItemId, previousItemId } = findParentItemIdAndPreviousItemId(
        slide,
        activeContentItemId,
        contentItemType,
        contentItemsById,
      ));
    }

    // If the new contentItem is a title, we need to add a new section for it.
    if (contentItemType === contentItemTypes.TITLE) {
      const sectionProps = getPropsForContentItemType(contentItemTypes.SECTION);
      // Since the section should be added first, give it the id we just generated.
      const sectionItemId = contentItemId;
      // Generate a new id for the contentItem.
      contentItemId = generateContentItemId(
        slide.id,
        slide.contentItemSequence + 1,
      );

      // Add the new section to the state.
      yield put(addContentItem(
        sectionItemId,
        contentItemTypes.SECTION,
        slideViewTypes.LIVE,
        sectionProps,
        slide.id,
        parentItemId,
        previousItemId,
      ));

      // Use the new section as the parent item for the new contentItem.
      parentItemId = sectionItemId;
      previousItemId = null;
    }

    // If the new contentItem is an image and it's new parent is not already an imageContainer,
    // we need to create an imageContainer for it.
    if (
      _.includes(imageContentItemTypes, contentItemType) &&
      (
        parentItemId === null ||
        contentItemsById[parentItemId].contentItemType !== contentItemTypes.IMAGE_CONTAINER
      )
    ) {
      // Since the imageContainer should be added first, give it the id we just generated.
      const imageContainerItemId = contentItemId;
      // Generate a new id for the contentItem.
      contentItemId = generateContentItemId(
        slide.id,
        slide.contentItemSequence + 1,
      );
      // Generate default props for the imageContainer.
      let imageContainerProps = getPropsForContentItemType(contentItemTypes.IMAGE_CONTAINER);
      // Set the imageContainer imageType to the type of image we're adding.
      imageContainerProps = {
        ...imageContainerProps,
        imageType: contentItemType,
      };

      // Add the new imageContainer to the state.
      yield put(addContentItem(
        imageContainerItemId,
        contentItemTypes.IMAGE_CONTAINER,
        slideViewTypes.LIVE,
        imageContainerProps,
        slide.id,
        parentItemId,
        previousItemId,
      ));

      // Use the new imageContainer as the parent item for the new contentItem.
      parentItemId = imageContainerItemId;
      previousItemId = null;
    }

    // Add the new contentItem to the state.
    yield put(addContentItem(
      contentItemId,
      contentItemType,
      slideViewTypes.LIVE,
      getPropsForContentItemType(
        contentItemType,
        contentItemTypeProps,
      ),
      slide.id,
      parentItemId,
      previousItemId,
    ));

    // If the new contentItem is a list, we need to automatically add the first list item inside it.
    if (contentItemType === contentItemTypes.LIST) {
      // Generate contentItem props for the new list item.
      const childItemId = generateContentItemId(
        slide.id,
        slide.contentItemSequence + 1,
      );
      const childItemType = contentItemTypes.LIST_ITEM;
      const childItemProps = getPropsForContentItemType(childItemType);

      // Add the new list item to the state.
      yield put(addContentItem(
        childItemId,
        childItemType,
        slideViewTypes.LIVE,
        childItemProps,
        slide.id,
        contentItemId,
        null,
      ));
    }
  }
  catch (e) {
    console.error(e);
  }
}

function* addContentItemToSlideWatcher() {
  yield takeEvery(ADD_CONTENT_ITEM_TO_SLIDE, doAddContentItemToSlide);
}

export default addContentItemToSlideWatcher;
