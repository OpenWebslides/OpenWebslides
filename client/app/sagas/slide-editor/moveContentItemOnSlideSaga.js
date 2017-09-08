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
  getNextValidContentItemId,
  getContentItemSiblingItemIdsAndIndex,
} from 'lib/state-traversal/contentItems';

function getMoveParameters(
  contentItemId,
  ancestorItemIds,
  previousItemId,
  previousItemAncestorItemIds,
  slide,
  contentItemsById,
) {
  // Take 'raw' parameters such as item ids, ancestor items, etc. and convert them to directly
  // usable parameters such as parent/previous/nextItem that are necessary for move validation. We
  // put this in a separate function to keep other function easy to read.

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
    slide.contentItemIds,
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
  slide,
  contentItemsById,
) {
  const debug = true;
  const { contentItem, previousItem, previousItemParentItem, nextItem } = getMoveParameters(
    contentItemId,
    ancestorItemIds,
    previousItemId,
    previousItemAncestorItemIds,
    slide,
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

  // Sections cannot be moved above a contentItem that is not a section; they can only be moved in
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

  // ContentItems that are not list items cannot be moved inside a list.
  if (
    contentItem.contentItemType !== contentItemTypes.LIST_ITEM &&
    previousItemParentItem !== null &&
    previousItemParentItem.contentItemType === contentItemTypes.LIST
  ) {
    if (debug) console.log(`${previousItemId} invalid: move non-list-item inside list`);
    return false;
  }

  // List items cannot be moved outside a list.
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

  // If none of the invalid cases matched, the move is valid.
  return true;
}

function isMoveUpValid(
  contentItemId,
  ancestorItemIds,
  previousItemId,
  previousItemAncestorItemIds,
  slide,
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
      slide,
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
  slide,
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
      slide,
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
  slide,
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
      slide,
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
  slide,
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
      slide,
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

function processMoveUp(contentItemId, ancestorItemIds, slide, contentItemsById) {
  // #TODO move out common code in processMoveUp/Left/Right

  let previousItemId = contentItemId;
  let previousItemAncestorItemIds = ancestorItemIds;
  let previousItemIndexInSiblingItemIds;
  // Note: we need to 'skip' at least one item because we're looking for the id of the contentItem
  // *after* which this contentItem will be placed. So if we simple use the first valid
  // $previousItem, the contentItem could end up not moving at all.
  let skippedAtLeastOneItem = false;
  let skippedItemId = null;
  let validPreviousItemFound = false;

  // Iterate over all previous contentItems, starting at the item with id $contentItemId.
  while (!validPreviousItemFound && previousItemId !== null) {
    // If the item we last checked was the first item in its section, see if we can move the
    // contentItem to the first position in the section (i.e. previousItemId === null) before
    // moving on to the parent section.
    ({
      indexInSiblingItemIds: previousItemIndexInSiblingItemIds,
    } = getContentItemSiblingItemIdsAndIndex(
      previousItemId,
      previousItemAncestorItemIds,
      slide.contentItemIds,
      contentItemsById,
    ));
    if (previousItemIndexInSiblingItemIds === 0) {
      if (
        isMoveUpValid(
          contentItemId,
          ancestorItemIds,
          null,
          previousItemAncestorItemIds,
          slide,
          contentItemsById,
        )
      ) {
        if (skippedAtLeastOneItem) {
          validPreviousItemFound = true;
          previousItemId = null;
        }
        else {
          skippedAtLeastOneItem = true;
          skippedItemId = null;
        }
      }
    }

    // If no valid previous item was found in the above step, get a new previous item and try to
    // validate that one.
    if (!validPreviousItemFound) {
      ({
        contentItemId: previousItemId,
        ancestorItemIds: previousItemAncestorItemIds,
      } = getPreviousValidContentItemId(
        previousItemId,
        previousItemAncestorItemIds,
        slide.contentItemIds,
        contentItemsById,
        contentItem => _.includes(contentItemTypes, contentItem.contentItemType),
        contentItem => _.includes(containerContentItemTypes, contentItem.contentItemType),
        previousItemId !== contentItemId,
      ));

      if (
        isMoveUpValid(
          contentItemId,
          ancestorItemIds,
          previousItemId,
          previousItemAncestorItemIds,
          slide,
          contentItemsById,
      )) {
        if (skippedAtLeastOneItem) {
          validPreviousItemFound = true;
        }
        else {
          skippedAtLeastOneItem = true;
          skippedItemId = previousItemId;
        }
      }
    }
  }

  // If this item was already the first item, it cannot be moved up.
  // (Note: we need this separate check because NULL is a valid previousItem (it indicates moving
  // the contentItem to the start of the parent section) and so the above code could erroneously
  // return isMoveOk: TRUE when in reality the contentItem cannot be moved up because it is already
  // at the top.)
  if (previousItemId === null && skippedItemId === null && ancestorItemIds.length === 0) {
    return {
      isMoveOk: false,
      newParentItemId: null,
      newPreviousItemId: null,
    };
  }
  // If no valid previous item was found, this item cannot be moved up.
  else if (!validPreviousItemFound) {
    return {
      isMoveOk: false,
      newParentItemId: null,
      newPreviousItemId: null,
    };
  }
  // Otherwise, move the item to directly below the item with id $prevousItemId
  else {
    return {
      isMoveOk: true,
      newParentItemId: (previousItemAncestorItemIds.length > 0)
        ? _.last(previousItemAncestorItemIds)
        : null,
      newPreviousItemId: previousItemId,
    };
  }
}

function processMoveDown(contentItemId, ancestorItemIds, slide, contentItemsById) {
  let previousItemId = contentItemId;
  let previousItemAncestorItemIds = ancestorItemIds;
  let validPreviousItemFound = false;

  // Iterate over all next contentItems, starting at the item with id $contentItemId.
  while (!validPreviousItemFound && previousItemId !== null) {
    // If the item we last checked was a container, see if we can move the contentItem to the first
    // position in the container (i.e. previousItemId === null) before moving on to the next item.
    if (_.includes(containerContentItemTypes, contentItemsById[previousItemId].contentItemType)) {
      if (
        isMoveDownValid(
          contentItemId,
          ancestorItemIds,
          null,
          previousItemAncestorItemIds.concat(previousItemId),
          slide,
          contentItemsById,
        )
      ) {
        validPreviousItemFound = true;
        previousItemId = null;
      }
    }

    // If no valid previous item was found in the above step, get a new previous item and try to
    // validate that one.
    if (!validPreviousItemFound) {
      ({
        contentItemId: previousItemId,
        ancestorItemIds: previousItemAncestorItemIds,
      } = getNextValidContentItemId(
        previousItemId,
        previousItemAncestorItemIds,
        slide.contentItemIds,
        contentItemsById,
        contentItem => _.includes(contentItemTypes, contentItem.contentItemType),
        contentItem => _.includes(containerContentItemTypes, contentItem.contentItemType),
        previousItemId !== contentItemId,
      ));

      if (
        isMoveDownValid(
          contentItemId,
          ancestorItemIds,
          previousItemId,
          previousItemAncestorItemIds,
          slide,
          contentItemsById,
        )) {
        validPreviousItemFound = true;
      }
    }
  }

  // If this item was already the last item, it cannot be moved down.
  if (previousItemId === null) {
    return {
      isMoveOk: false,
      newParentItemId: null,
      newPreviousItemId: null,
    };
  }
  // If no valid previous item was found, this item cannot be moved down.
  else if (!validPreviousItemFound) {
    return {
      isMoveOk: false,
      newParentItemId: null,
      newPreviousItemId: null,
    };
  }
  // Otherwise, move the item to directly below the item with id $prevousItemId.
  else {
    return {
      isMoveOk: true,
      newParentItemId: (previousItemAncestorItemIds.length > 0)
        ? _.last(previousItemAncestorItemIds)
        : null,
      newPreviousItemId: previousItemId,
    };
  }
}

function processMoveLeft(contentItemId, ancestorItemIds, slide, contentItemsById) {
  let previousItemId = contentItemId;
  let previousItemAncestorItemIds = ancestorItemIds;
  let previousItemIndexInSiblingItemIds;
  let validPreviousItemFound = false;

  // Iterate over all previous contentItems, starting at the item with id $contentItemId.
  while (!validPreviousItemFound && previousItemId !== null) {
    // If the item we last checked was the first item in its section, see if we can move the
    // contentItem to the first position in the section (i.e. previousItemId === null) before
    // moving on to the parent section.
    ({
      indexInSiblingItemIds: previousItemIndexInSiblingItemIds,
    } = getContentItemSiblingItemIdsAndIndex(
      previousItemId,
      previousItemAncestorItemIds,
      slide.contentItemIds,
      contentItemsById,
    ));
    if (previousItemIndexInSiblingItemIds === 0) {
      if (
        isMoveLeftValid(
          contentItemId,
          ancestorItemIds,
          null,
          previousItemAncestorItemIds,
          slide,
          contentItemsById,
        )
      ) {
        validPreviousItemFound = true;
        previousItemId = null;
      }
    }

    // If no valid previous item was found in the above step, get a new previous item and try to
    // validate that one.
    if (!validPreviousItemFound) {
      ({
        contentItemId: previousItemId,
        ancestorItemIds: previousItemAncestorItemIds,
      } = getPreviousValidContentItemId(
        previousItemId,
        previousItemAncestorItemIds,
        slide.contentItemIds,
        contentItemsById,
        contentItem => _.includes(contentItemTypes, contentItem.contentItemType),
        contentItem => _.includes(containerContentItemTypes, contentItem.contentItemType),
        previousItemId !== contentItemId,
      ));

      if (
        isMoveLeftValid(
          contentItemId,
          ancestorItemIds,
          previousItemId,
          previousItemAncestorItemIds,
          slide,
          contentItemsById,
        )) {
        validPreviousItemFound = true;
      }
    }
  }

  // If no valid previous item was found, this item cannot be moved left.
  if (!validPreviousItemFound) {
    return {
      isMoveOk: false,
      newParentItemId: null,
      newPreviousItemId: null,
    };
  }
  // Otherwise, move the item to directly below the item with id $prevousItemId
  else {
    return {
      isMoveOk: true,
      newParentItemId: (previousItemAncestorItemIds.length > 0)
        ? _.last(previousItemAncestorItemIds)
        : null,
      newPreviousItemId: previousItemId,
    };
  }
}

function processMoveRight(contentItemId, ancestorItemIds, slide, contentItemsById) {
  // #TODO
  // If the contentItem to be moved-RIGHT is not a section itself, create a new section with a
  // generic title and place the contentItem into that section (as opposed to moving it around in a
  // very non-intuitive way, which is how it is handled right now).

  let previousItemId = contentItemId;
  let previousItemAncestorItemIds = ancestorItemIds;
  let previousItemIndexInSiblingItemIds;
  let validPreviousItemFound = false;

  // Iterate over all previous contentItems, starting at the item with id $contentItemId.
  while (!validPreviousItemFound && previousItemId !== null) {
    // If the item we last checked was the first item in its section, see if we can move the
    // contentItem to the first position in the section (i.e. previousItemId === null) before
    // moving on to the parent section.
    ({
      indexInSiblingItemIds: previousItemIndexInSiblingItemIds,
    } = getContentItemSiblingItemIdsAndIndex(
      previousItemId,
      previousItemAncestorItemIds,
      slide.contentItemIds,
      contentItemsById,
    ));
    if (previousItemIndexInSiblingItemIds === 0) {
      if (
        isMoveRightValid(
          contentItemId,
          ancestorItemIds,
          null,
          previousItemAncestorItemIds,
          slide,
          contentItemsById,
        )
      ) {
        validPreviousItemFound = true;
        previousItemId = null;
      }
    }

    // If no valid previous item was found in the above step, get a new previous item and try to
    // validate that one.
    if (!validPreviousItemFound) {
      ({
        contentItemId: previousItemId,
        ancestorItemIds: previousItemAncestorItemIds,
      } = getPreviousValidContentItemId(
        previousItemId,
        previousItemAncestorItemIds,
        slide.contentItemIds,
        contentItemsById,
        contentItem => _.includes(contentItemTypes, contentItem.contentItemType),
        contentItem => _.includes(containerContentItemTypes, contentItem.contentItemType),
        previousItemId !== contentItemId,
      ));

      if (
        isMoveRightValid(
          contentItemId,
          ancestorItemIds,
          previousItemId,
          previousItemAncestorItemIds,
          slide,
          contentItemsById,
        )) {
        validPreviousItemFound = true;
      }
    }
  }

  // If no valid previous item was found, this item cannot be moved right.
  if (!validPreviousItemFound) {
    return {
      isMoveOk: false,
      newParentItemId: null,
      newPreviousItemId: null,
    };
  }
  // Otherwise, move the item to directly below the item with id $prevousItemId
  else {
    return {
      isMoveOk: true,
      newParentItemId: (previousItemAncestorItemIds.length > 0)
        ? _.last(previousItemAncestorItemIds)
        : null,
      newPreviousItemId: previousItemId,
    };
  }
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
  // Move contentItem up one indent level.
  else if (direction === directions.LEFT) {
    return processMoveLeft(contentItemId, ancestorItemIds, slide, contentItemsById);
  }
  // Move contentItem down one indent level.
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
