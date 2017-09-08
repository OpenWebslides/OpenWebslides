import _ from 'lodash';
import { takeEvery, select, put } from 'redux-saga/effects';

import { directions } from 'constants/directions';
import {
  contentItemTypes,
  sectionContentItemTypes,
  containerContentItemTypes,
} from 'constants/contentItemTypes';

import { MOVE_CONTENT_ITEM_ON_SLIDE } from 'actions/entities/slides';
import { moveContentItem } from 'actions/entities/content-items';
import { getSlideById } from 'selectors/entities/slides';
import { getContentItemsById } from 'selectors/entities/content-items';

import {
  getPreviousValidContentItemId,
  getContentItemSiblingItemIdsAndIndex,
} from 'lib/state-traversal/contentItems';

function moveUpContentItemValidator(
  contentItem,
  ancestorItemIds,
  contentItemToMoveId,
  contentItemToMoveAncestorItemIds,
  slideContentItemIds,
  contentItemsById,
) {
  const contentItemToMove = contentItemsById[contentItemToMoveId];
  // List items can only be moved into another list; so a previousContentItem can only be valid if
  // it is also a list item.
  if (contentItemToMove.contentItemType === contentItemTypes.LIST_ITEM) {
    return contentItem.contentItemType === contentItemTypes.LIST_ITEM;
  }
  // Sections can only be moved to the end of another section (or the slide), or right above another
  // section (i.e. they cannot precede non-section contentItems).
  else if (_.includes(sectionContentItemTypes, contentItemToMove.contentItemType)) {
    const contentItemIsAncestorOfContentItemToMove = (
      _.includes(containerContentItemTypes, contentItem.contentItemType) &&
      _.includes(contentItemToMoveAncestorItemIds, contentItem.id)
    );
    let contentItemIsLastChild;
    let contentItemIsPredecessorToSection;
    const { siblingItemIds, indexInSiblingItemIds } = getContentItemSiblingItemIdsAndIndex(
      contentItem.id,
      ancestorItemIds,
      slideContentItemIds,
      contentItemsById,
    );
    if (indexInSiblingItemIds === siblingItemIds.length - 1) {
      contentItemIsLastChild = true;
      contentItemIsPredecessorToSection = false;
    }
    else {
      contentItemIsLastChild = false;
      contentItemIsPredecessorToSection = _.includes(
        sectionContentItemTypes,
        contentItemsById[siblingItemIds[indexInSiblingItemIds + 1]].contentItemType,
      );
    }

    console.log(`findPrev contentItemId: ${contentItem.id}`);
    console.log(`contentItemIsAncestorOfContentItemToMove: ${contentItemIsAncestorOfContentItemToMove}`);
    console.log(`contentItemIsLastChild: ${contentItemIsLastChild}`);
    console.log(`contentItemIsPredecessorToSection: ${contentItemIsPredecessorToSection}`);

    return (
      !contentItemIsAncestorOfContentItemToMove &&
      (contentItemIsLastChild || contentItemIsPredecessorToSection)
    );
  }
  // For all other types, everything that is not a container can be a valid previousContentItem.
  else {
    return !_.includes(containerContentItemTypes, contentItem.contentItemType);
  }
}

function moveUpContainerItemValidator(
  contentItem,
  ancestorItemIds,
  contentItemToMoveId,
  contentItemToMoveAncestorItemIds,
  slideContentItemIds,
  contentItemsById,
) {
  const contentItemToMove = contentItemsById[contentItemToMoveId];
  // List items can be moved into another list; so all containerContentItemTypes are valid
  // containers in this case.
  if (contentItemToMove.contentItemType === contentItemTypes.LIST_ITEM) {
    return _.includes(containerContentItemTypes, contentItem.contentItemType);
  }
  // Sections can never be moved into a section on the same or a lower level as itself.
  else if (_.includes(sectionContentItemTypes, contentItemToMove.contentItemType)) {
    return false;
  }
  // Any other types cannot be moved into a list, so in this case only sectionContentItemTypes are
  // valid containers.
  else {
    return _.includes(sectionContentItemTypes, contentItem.contentItemType);
  }
}

function processMoveUp(contentItemId, ancestorItemIds, slide, contentItemsById) {
  let isMoveOk;
  let newParentItemId;
  let newPreviousItemId;
  let newPreviousItemAncestorItemIds = [];

  console.log(`contentItemId: ${contentItemId}`);

  // Find the id of the (valid) contentItem before the one we're moving.
  const {
    contentItemId: previousItemId,
    ancestorItemIds: previousItemAncestorItemIds,
  } = getPreviousValidContentItemId(
    contentItemId,
    ancestorItemIds,
    slide.contentItemIds,
    contentItemsById,
    (itemToValidate, itemToValidateAncestorItemIds) => {
      return moveUpContentItemValidator(
        itemToValidate,
        itemToValidateAncestorItemIds,
        contentItemId,
        ancestorItemIds,
        slide.contentItemIds,
        contentItemsById,
      );
    },
    (itemToValidate, itemToValidateAncestorItemIds) => {
      return moveUpContainerItemValidator(
        itemToValidate,
        itemToValidateAncestorItemIds,
        contentItemId,
        ancestorItemIds,
        slide.contentItemIds,
        contentItemsById,
      );
    },
  );

  console.log(`previousItemId: ${previousItemId}`);

  // If no previous contentItem can be found, we can't move this contentItem UP because it is
  // already at the top.
  if (previousItemId === null) {
    isMoveOk = false;
    newParentItemId = null;
    newPreviousItemId = null;
  }
  // If a previous contentItem was found.
  else {
    // For both the contentItemToMove and the previousItem, get their index in their respective
    // arrays of siblingItemIds.
    const { indexInSiblingItemIds } = getContentItemSiblingItemIdsAndIndex(
      contentItemId,
      ancestorItemIds,
      slide.contentItemIds,
      contentItemsById,
    );
    const {
      indexInSiblingItemIds: previousItemIndexInSiblingItemIds,
    } = getContentItemSiblingItemIdsAndIndex(
      previousItemId,
      previousItemAncestorItemIds,
      slide.contentItemIds,
      contentItemsById,
    );

    console.log(`indexInSiblingItemIds: ${indexInSiblingItemIds}`);
    console.log(`previousItemIndexInSiblingItemIds: ${previousItemIndexInSiblingItemIds}`);

    // If the contentItemToMove is the first in its list of siblings.
    if (indexInSiblingItemIds === 0) {
      // We move the contentItemToMove to below the previousItem (note: in most cases this is the
      // same as decreasing the indent level by one).
      isMoveOk = true;
      newParentItemId = (previousItemAncestorItemIds.length !== 0)
        ? _.last(previousItemAncestorItemIds)
        : null;
      newPreviousItemId = previousItemId;
    }
    // If the contentItemToMove is not the first in its list of siblings, but its previousItem is,
    // move the contentItem above the previousItem but don't change its indent level; this comes
    // down to moving it to index 0 in the parent section of the previousItem.
    // Note: we cannot do this in case the previousItem is a title, because titles need to remain
    // the first child of their parent section.
    else if (
      previousItemIndexInSiblingItemIds === 0 &&
      contentItemsById[previousItemId].contentItemType !== contentItemTypes.TITLE
    ) {
      isMoveOk = true;
      newParentItemId = (previousItemAncestorItemIds.length !== 0)
        ? _.last(previousItemAncestorItemIds)
        : null;
      newPreviousItemId = null;
    }
    // If the contentItemToMove nor the previousItem is not the first in its list of siblings
    // (or if the previousItem is a title).
    else {
      // We move the contentItemToMove to above the previousItem and change it's indent level if
      // needed; this comes down to moving it to below the first valid contentItem that comes before
      // the previousItem.

      // First, find that contentItem.
      ({
        contentItemId: newPreviousItemId,
        ancestorItemIds: newPreviousItemAncestorItemIds,
      } = getPreviousValidContentItemId(
        previousItemId,
        previousItemAncestorItemIds,
        slide.contentItemIds,
        contentItemsById,
        (itemToValidate, itemToValidateAncestorItemIds) => {
          return moveUpContentItemValidator(
            itemToValidate,
            itemToValidateAncestorItemIds,
            contentItemId,
            ancestorItemIds,
            slide.contentItemIds,
            contentItemsById,
          );
        },
        (itemToValidate, itemToValidateAncestorItemIds) => {
          return moveUpContainerItemValidator(
            itemToValidate,
            itemToValidateAncestorItemIds,
            contentItemId,
            ancestorItemIds,
            slide.contentItemIds,
            contentItemsById,
          );
        },
      ));

      console.log(`newPreviousItemId: ${newPreviousItemId}`);

      // If a valid newPreviousItem was found.
      if (newPreviousItemId !== null) {
        // We move the contentItemToMove to below the newPreviousItem.
        isMoveOk = true;
        newParentItemId = (newPreviousItemAncestorItemIds.length !== 0)
          ? _.last(newPreviousItemAncestorItemIds)
          : null;
      }
      // If no valid newPreviousContentItem exists, but the contentItemToMove is a section, we can
      // still move it direction onto the slide.
      else if (
        _.includes(sectionContentItemTypes, contentItemsById[contentItemId].contentItemType)
      ) {
        isMoveOk = true;
        newParentItemId = null;
      }
      // Can't execute the move in all other cases (since we don't want users to be able to move
      // contentItems directly onto the slide if there is a title present).
      else {
        isMoveOk = false;
        newParentItemId = null;
      }
    }
  }

  return {
    isMoveOk,
    newParentItemId,
    newPreviousItemId,
  };
}

function processMoveDown(contentItemId, ancestorItemIds, slide, contentItemsById) {
  // #TODO stub
  return {
    isMoveOk: false,
    newParentItemId: null,
    newPreviousItemId: null,
  };
}

function processMoveLeft(contentItemId, ancestorItemIds, slide, contentItemsById) {
  // #TODO stub
  return {
    isMoveOk: false,
    newParentItemId: null,
    newPreviousItemId: null,
  };
}

function processMoveRight(contentItemId, ancestorItemIds, slide, contentItemsById) {
  // #TODO stub
  return {
    isMoveOk: false,
    newParentItemId: null,
    newPreviousItemId: null,
  };
}

function processMove(direction, contentItemId, ancestorItemIds, slide, contentItemsById) {
  // Move contentItem above its predecessor.
  if (direction === directions.UP) {
    return processMoveUp(contentItemId, ancestorItemIds, slide, contentItemsById);
  }
  // Move contentItem below its successor.
  else if (direction === directions.DOWN) {
    return processMoveDown(contentItemId, ancestorItemIds, slide, contentItemsById);
  }
  // Move contentItem down one indent level.
  else if (direction === directions.LEFT) {
    return processMoveLeft(contentItemId, ancestorItemIds, slide, contentItemsById);
  }
  // Move contentItem up one indent level.
  else if (direction === directions.RIGHT) {
    return processMoveRight(contentItemId, ancestorItemIds, slide, contentItemsById);
  }
  else {
    console.error('Invalid direction.');
    return {
      isMoveOk: false,
      newParentItemId: null,
      newPreviousItemId: null,
    };
  }
}

function* doMoveContentItemOnSlide(action) {
  try {
    console.log('New move -------------------------');

    const { slideId, contentItemId, ancestorItemIds, direction } = action.meta;
    const slide = yield select(getSlideById, slideId);
    const contentItemsById = yield select(getContentItemsById);
    const contentItem = contentItemsById[contentItemId];
    let contentItemToMoveId;
    let newAncestorItemIds;

    // If the contentItem is a title, move its entire section along with it.
    if (contentItem.contentItemType === contentItemTypes.TITLE) {
      // Note that if the contentItem is a title, there MUST be at least one ancestor.
      contentItemToMoveId = _.last(ancestorItemIds);
      newAncestorItemIds = _.dropRight(ancestorItemIds, 1);
    }
    // If the contentItem is not a title, just move that contentItem.
    else {
      contentItemToMoveId = contentItemId;
      newAncestorItemIds = ancestorItemIds;
    }

    // Get the old parentItemId to pass along to the moveContentItem action.
    const oldParentItemId = (newAncestorItemIds.length > 0)
      ? _.last(newAncestorItemIds)
      : null;

    // Check if the move is a 'valid' move, and if so, get the new parentItemId and the new
    // previousItemId where the contentItem is to be moved to.
    const { isMoveOk, newParentItemId, newPreviousItemId } = processMove(
      direction,
      contentItemToMoveId,
      newAncestorItemIds,
      slide,
      contentItemsById,
    );

    console.log(`isMoveOk: ${isMoveOk}`);
    console.log(`newParentItemId: ${newParentItemId}`);
    console.log(`newPreviousItemId: ${newPreviousItemId}`);

    if (isMoveOk) {
      yield put(moveContentItem(
        contentItemToMoveId,
        slideId,
        oldParentItemId,
        newParentItemId,
        newPreviousItemId,
      ));
    }
    else {
      console.error(
        `Illegal move: contentItem with id ${contentItemToMoveId} cannot be moved in direction ${direction}`,
      );
    }

    console.log('End move -------------------------');
  }
  catch (e) {
    console.error(e);
  }
}

function* moveContentItemOnSlideWatcher() {
  yield takeEvery(MOVE_CONTENT_ITEM_ON_SLIDE, doMoveContentItemOnSlide);
}

export default moveContentItemOnSlideWatcher;