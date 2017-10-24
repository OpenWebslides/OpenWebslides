import _ from 'lodash';
import { takeEvery, select, put } from 'redux-saga/effects';

import { directions } from 'constants/directions';
import {
  contentItemTypes,
  sectionContentItemTypes,
  imageContentItemTypes,
} from 'constants/contentItemTypes';

import { MOVE_CONTENT_ITEM_ON_SLIDE, deleteContentItemFromSlide } from 'actions/entities/slides';
import { moveContentItem } from 'actions/entities/content-items';
import { getSlideById } from 'selectors/entities/slides';
import { getContentItemsById } from 'selectors/entities/content-items';

import {
  getPreviousValidContentItemPosition,
  getNextValidContentItemPosition,
  getContentItemSiblingItemIdsAndIndex,
} from 'lib/state-traversal/contentItems';

function getMoveParameters(
  contentItemId,
  ancestorItemIds,
  previousItemId,
  previousItemAncestorItemIds,
  slideContentItemIds,
  contentItemsById,
) {
  // Take 'raw' parameters such as item ids, ancestor items, etc. and convert them to directly
  // usable parameters such as parent/previous/nextItem that are necessary for move validation. We
  // put this in a separate function to keep other functions easy to read.

  const contentItem = contentItemsById[contentItemId];
  const parentItem = (ancestorItemIds.length > 0)
    ? contentItemsById[_.last(ancestorItemIds)]
    : null;

  const previousItem = (previousItemId !== null)
    ? contentItemsById[previousItemId]
    : null;
  const previousItemParentItem = (previousItemAncestorItemIds.length > 0)
    ? contentItemsById[_.last(previousItemAncestorItemIds)]
    : null;

  const {
    siblingItemIds: previousItemSiblingItemIds,
    indexInSiblingItemIds: previousItemIndexInSiblingItemIds,
  } = getContentItemSiblingItemIdsAndIndex(
    previousItemId,
    previousItemAncestorItemIds,
    slideContentItemIds,
    contentItemsById,
  );

  let nextItem;
  if (
    previousItemSiblingItemIds.length === 0 ||
    previousItemIndexInSiblingItemIds === previousItemSiblingItemIds.length - 1
  ) {
    nextItem = null;
  }
  else if (previousItemIndexInSiblingItemIds === -1) {
    nextItem = contentItemsById[_.first(previousItemSiblingItemIds)];
  }
  else {
    nextItem = contentItemsById[previousItemSiblingItemIds[previousItemIndexInSiblingItemIds + 1]];
  }

  return {
    contentItem,
    parentItem,
    previousItem,
    previousItemParentItem,
    previousItemSiblingItemIds,
    previousItemIndexInSiblingItemIds,
    nextItem,
  };
}

function isMoveValid(
  contentItemId,
  ancestorItemIds,
  previousItemId,
  previousItemAncestorItemIds,
  slideContentItemIds,
  contentItemsById,
) {
  const debug = true;
  const { contentItem, previousItem, previousItemParentItem, nextItem } = getMoveParameters(
    contentItemId,
    ancestorItemIds,
    previousItemId,
    previousItemAncestorItemIds,
    slideContentItemIds,
    contentItemsById,
  );

  // Check for various invalid cases; if non of those are occuring, then the move is valid.

  // Titles cannot be moved directly; their section should be moved instead.
  // Note: this case should never occur in practice; it is handled before this code is executed.
  // We keep it here for documentation & error checking purposes.
  if (contentItem.contentItemType === contentItemTypes.TITLE) {
    console.error('This shouldn\'t happen...');
    return false;
  }

  // ContentItems cannot be moved above a title; titles need to remain the first children of their
  // sections.
  if (
    previousItem === null &&
    nextItem !== null &&
    nextItem.contentItemType === contentItemTypes.TITLE
  ) {
    if (debug) console.log(`${previousItemId} invalid: move above title`);
    return false;
  }

  // TESTED: Sections cannot be moved above a contentItem that is not a section; they can only be moved in
  // front of another section or to the end of another section.
  if (
    nextItem !== null &&
    _.includes(sectionContentItemTypes, contentItem.contentItemType) &&
    !_.includes(sectionContentItemTypes, nextItem.contentItemType)
  ) {
    if (debug) console.log(`${previousItemId} invalid: move section above non-section`);
    return false;
  }

  // ContentItems that are not sections cannot be moved below a section.
  if (
    previousItem !== null &&
    !_.includes(sectionContentItemTypes, contentItem.contentItemType) &&
    _.includes(sectionContentItemTypes, previousItem.contentItemType)
  ) {
    if (debug) console.log(`${previousItemId} invalid: move non-section below section`);
    return false;
  }

  // TESTED: ContentItems that are not list items cannot be moved inside a list.
  if (
    contentItem.contentItemType !== contentItemTypes.LIST_ITEM &&
    previousItemParentItem !== null &&
    previousItemParentItem.contentItemType === contentItemTypes.LIST
  ) {
    if (debug) console.log(`${previousItemId} invalid: move non-list-item inside list`);
    return false;
  }

  // TESTED: List items cannot be moved outside a list.
  if (
    contentItem.contentItemType === contentItemTypes.LIST_ITEM &&
    (
      previousItemParentItem === null ||
      previousItemParentItem.contentItemType !== contentItemTypes.LIST
    )
  ) {
    if (debug) console.log(`${previousItemId} invalid: move list-item outside list`);
    return false;
  }

  // TESTED: Images cannot be moved outside an imageContainer.
  // #TODO instead of invalidating the move, it should split the imageContainer.
  if (
    _.includes(imageContentItemTypes, contentItem.contentItemType) &&
    (
      previousItemParentItem === null ||
      previousItemParentItem.contentItemtype !== contentItemTypes.IMAGE_CONTAINER
    )
  ) {
    if (debug) console.log(`${previousItemId} invalid: move image outside imageContainer`);
    return false;
  }

  if (debug) console.log(`current previousItemAcestors: ${previousItemAncestorItemIds}`);

  // If none of the invalid cases matched, the move is valid.
  return true;
}

function isMoveUpValid(
  contentItemId,
  ancestorItemIds,
  previousItemId,
  previousItemAncestorItemIds,
  slideContentItemIds,
  contentItemsById,
) {
  const debug = true;
  const contentItem = contentItemsById[contentItemId];

  // First, check general move constraints.
  if (
    !isMoveValid(
      contentItemId,
      ancestorItemIds,
      previousItemId,
      previousItemAncestorItemIds,
      slideContentItemIds,
      contentItemsById,
    )
  ) {
    return false;
  }

  // Next, check move-UP specific constraints.

  // Sections cannot be moved into a section on the same or a lower level than itself. (I.e. moving
  // up a section should 'skip over' a preceding section, if it exists. A section can be moved into
  // a preceding section by executing 'move right' instead.)
  if (
    _.includes(sectionContentItemTypes, contentItem.contentItemType) &&
    previousItemAncestorItemIds.length > ancestorItemIds.length
  ) {
    if (debug) console.log(`${previousItemId} invalid: section level too low`);
    return false;
  }

  // If none of the invalid cases matched, the move is valid.
  if (debug) console.log(`${previousItemId} valid`);
  return true;
}

function isMoveDownValid(
  contentItemId,
  ancestorItemIds,
  previousItemId,
  previousItemAncestorItemIds,
  slideContentItemIds,
  contentItemsById,
) {
  const debug = true;
  const contentItem = contentItemsById[contentItemId];

  // First, check general move constraints.
  if (
    !isMoveValid(
      contentItemId,
      ancestorItemIds,
      previousItemId,
      previousItemAncestorItemIds,
      slideContentItemIds,
      contentItemsById,
    )
  ) {
    return false;
  }

  // Next, check move-DOWN specific constraints.

  // Sections cannot be moved into a section on the same or a lower level than itself. (I.e. moving
  // down a section should 'skip over' a following section, if it exists. A section can be moved
  // into a following section by moving it below this following section and then executing
  // 'move right'.)
  if (
    _.includes(sectionContentItemTypes, contentItem.contentItemType) &&
    previousItemAncestorItemIds.length > ancestorItemIds.length
  ) {
    if (debug) console.log(`${previousItemId} invalid: section level too low`);
    return false;
  }

  // If none of the invalid cases matched, the move is valid.
  if (debug) console.log(`${previousItemId} valid`);
  return true;
}

function isMoveLeftValid(
  contentItemId,
  ancestorItemIds,
  previousItemId,
  previousItemAncestorItemIds,
  slideContentItemIds,
  contentItemsById,
) {
  const debug = true;

  // First, check general move constraints.
  if (
    !isMoveValid(
      contentItemId,
      ancestorItemIds,
      previousItemId,
      previousItemAncestorItemIds,
      slideContentItemIds,
      contentItemsById,
    )
  ) {
    return false;
  }

  // Next, check move-LEFT specific constraints.

  // The item needs to end up in a 'higher' section than it started out in.
  if (
    previousItemAncestorItemIds.length >= ancestorItemIds.length
  ) {
    if (debug) console.log(`${previousItemId} invalid: section level too low`);
    return false;
  }

  // If none of the invalid cases matched, the move is valid.
  if (debug) console.log(`${previousItemId} valid`);
  return true;
}

function isMoveRightValid(
  contentItemId,
  ancestorItemIds,
  previousItemId,
  previousItemAncestorItemIds,
  slideContentItemIds,
  contentItemsById,
) {
  const debug = true;

  // First, check general move constraints.
  if (
    !isMoveValid(
      contentItemId,
      ancestorItemIds,
      previousItemId,
      previousItemAncestorItemIds,
      slideContentItemIds,
      contentItemsById,
    )
  ) {
    return false;
  }

  // Next, check move-RIGHT specific constraints.

  // The item needs to end up in a 'deeper' section than it started out in.
  if (
    previousItemAncestorItemIds.length <= ancestorItemIds.length
  ) {
    if (debug) console.log(`${previousItemId} invalid: section level too high`);
    return false;
  }

  // If none of the invalid cases matched, the move is valid.
  if (debug) console.log(`${previousItemId} valid`);
  return true;
}

function processMove(direction, contentItemId, ancestorItemIds, slide, contentItemsById) {
  let validPositionFound;
  let positionItemId;
  let positionItemAncestorItemIds;

  // Move contentItem above its predecessor.
  if (direction === directions.UP) {
    ({
      validPositionFound,
      positionItemId,
      positionItemAncestorItemIds,
    } = getPreviousValidContentItemPosition(
      contentItemId,
      ancestorItemIds,
      slide.contentItemIds,
      contentItemsById,
      isMoveUpValid,
    ));
  }
  // Move contentItem below its successor.
  else if (direction === directions.DOWN) {
    ({
      validPositionFound,
      positionItemId,
      positionItemAncestorItemIds,
    } = getNextValidContentItemPosition(
      contentItemId,
      ancestorItemIds,
      slide.contentItemIds,
      contentItemsById,
      isMoveDownValid,
    ));
  }
  // Move contentItem up one indent level.
  else if (direction === directions.LEFT) {
    ({
      validPositionFound,
      positionItemId,
      positionItemAncestorItemIds,
    } = getNextValidContentItemPosition(
      contentItemId,
      ancestorItemIds,
      slide.contentItemIds,
      contentItemsById,
      isMoveLeftValid,
    ));
  }
  // Move contentItem down one indent level.
  else if (direction === directions.RIGHT) {
    // #TODO
    // If the contentItem to be moved-RIGHT is not a section itself, create a new section with a
    // generic title and place the contentItem into that section (as opposed to moving it around in
    // a very non-intuitive way, which is how it is handled right now).
    ({
      validPositionFound,
      positionItemId,
      positionItemAncestorItemIds,
    } = getPreviousValidContentItemPosition(
      contentItemId,
      ancestorItemIds,
      slide.contentItemIds,
      contentItemsById,
      isMoveRightValid,
    ));
  }
  else {
    console.error('Invalid direction.');
    return {
      isMoveOk: false,
      newParentItemId: null,
      newPreviousItemId: null,
    };
  }

  // If no valid positionItem was found, this item cannot be moved in the given direction.
  if (!validPositionFound) {
    return {
      isMoveOk: false,
      newPreviousItemId: null,
      newParentItemId: null,
    };
  }
  // Otherwise, move the item to directly below the item with id $positionItemId (or to the start of
  // the container if positionItemId is NULL).
  else {
    return {
      isMoveOk: true,
      newPreviousItemId: positionItemId,
      newParentItemId: (positionItemAncestorItemIds.length > 0)
        ? _.last(positionItemAncestorItemIds)
        : null,
    };
  }
}

export function* doMoveContentItemOnSlide(action) {
  try {
    const debug = true;

    if (debug) console.log('New move -------------------------------');


    const { slideId, contentItemId, ancestorItemIds, direction } = action.meta;

    // console.log('SLIDE ID: ', slideId);
    // console.log('CONTENT ITEM ID: ', contentItemId);
    // console.log('ANCESTOR ITEM ID: ', ancestorItemIds);
    // console.log('DIRECTION: ', direction);


    const slide = yield select(getSlideById, slideId);
    // console.log('SLIDE: ', slide);

    const contentItemsById = yield select(getContentItemsById);
    // console.log('CONTENT ITEMS BY ID: ', contentItemsById);

    const contentItem = yield contentItemsById[contentItemId];
    // console.log('CONTENT ITEM: ', contentItem);

    let contentItemToMoveId;
    let newAncestorItemIds;

    // If the contentItem is a title, move its entire section along with it.
    if (contentItem.contentItemType === contentItemTypes.TITLE) {
      // Note that if the contentItem is a title, there MUST be at least one ancestor.
      contentItemToMoveId = yield _.last(ancestorItemIds);
      newAncestorItemIds = yield _.dropRight(ancestorItemIds, 1);
    }
    // If the contentItem is not a title, just move that contentItem.
    else {
      contentItemToMoveId = yield contentItemId;
      newAncestorItemIds = yield ancestorItemIds;
    }

    // Get the old parentItemId to pass along to the moveContentItem action.
    const oldParentItemId = yield (newAncestorItemIds.length > 0)
      ? _.last(newAncestorItemIds)
      : null;

    // Check if the move is a 'valid' move, and if so, get the new parentItemId and the new
    // previousItemId where the contentItem is to be moved to.
    // console.log('CONTENT ITEM TO MOVE', contentItemToMoveId);
    // console.log('NEW ANCESTOR ITEM IDS', newAncestorItemIds);

    const { isMoveOk, newParentItemId, newPreviousItemId } = yield processMove(
      direction,
      contentItemToMoveId,
      newAncestorItemIds,
      slide,
      contentItemsById,
    );

    if (debug) console.log(`isMoveOk: ${isMoveOk}`);
    if (debug) console.log(`newParentItemId: ${newParentItemId}`);
    if (debug) console.log(`newPreviousItemId: ${newPreviousItemId}`);

    if (isMoveOk) {
      let deleteParentItem = yield false;
      // If the move is ok, check if the move causes $contentItemToMove's old parent to become
      // empty. If so, delete the parent from the slide.
      if (
        oldParentItemId !== null &&
        contentItemsById[oldParentItemId].childItemIds.length === 1
      ) {
        deleteParentItem = yield true;
      }

      yield put(moveContentItem(
        contentItemToMoveId,
        slideId,
        oldParentItemId,
        newParentItemId,
        newPreviousItemId,
      ));

      if (deleteParentItem) {
        yield put(deleteContentItemFromSlide(
          slideId,
          oldParentItemId,
          _.dropRight(newAncestorItemIds, 1),
        ));
      }
    }
    else {
      console.error(
        `Illegal move: contentItem with id ${contentItemToMoveId} cannot be moved in direction ${direction}`,
      );
    }

    console.log('End move -------------------------------');
  }
  catch (e) {
    console.error(e);
  }
}

function* moveContentItemOnSlideWatcher() {
  yield takeEvery(MOVE_CONTENT_ITEM_ON_SLIDE, doMoveContentItemOnSlide);
}

export default moveContentItemOnSlideWatcher;
