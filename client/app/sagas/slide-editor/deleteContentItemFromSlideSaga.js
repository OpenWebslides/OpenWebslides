import { takeEvery, select, put } from 'redux-saga/effects';

import {
  plaintextContentItemTypes,
  containerContentItemTypes,
} from 'constants/contentItemTypes';

import { DELETE_CONTENT_ITEM_FROM_SLIDE } from 'actions/entities/slides';
import { deleteContentItem } from 'actions/entities/content-items';
import { getSlideById } from 'selectors/entities/slides';
import {
  getContentItemById,
  getContentItemDescendantItemIdsById,
} from 'selectors/entities/content-items';

// #TODO refactor this code
function* findNewActiveContentItemId(
  contentItemId,
  siblingItemIds,
  parentItemId,
  ancestorItemIds,
) {
  let newActiveContentItemId = null;
  let indexInSiblingItems = Array.indexOf(siblingItemIds, contentItemId);

  // If there is either a parent or previous siblings.
  if (parentItemId !== null || indexInSiblingItems !== 0) {
    let parentItem = yield select(getContentItemById, parentItemId);
    let siblingItem;
    let customParentItemSet;
    let i;

    // Loop through ancestors until a suitable contentItem is found.
    while (newActiveContentItemId === null && siblingItemIds.length > 0) {
      customParentItemSet = false;

      // Find the index of the current contentItem inside the parentItem.
      indexInSiblingItems = contentItemId !== null
        ? Array.indexOf(siblingItemIds, contentItemId)
        : siblingItemIds.length;

      // If this isn't the first contentItem inside parentItem.
      if (indexInSiblingItems !== 0) {
        // Loop through predecessors in reverse.
        i = indexInSiblingItems - 1;
        while (
          newActiveContentItemId === null &&
          !customParentItemSet && i >= 0
        ) {
          siblingItem = yield select(getContentItemById, siblingItemIds[i]);
          // If this predecessor is a plaintext item.
          if (
            Array.indexOf(
              plaintextContentItemTypes,
              siblingItem.contentItemType,
            ) !== -1
          ) {
            // This is a suitable newActiveContentItem.
            newActiveContentItemId = siblingItem.id;
          }
          // If this predecessor is a container contentItem.
          else if (
            Array.indexOf(
              containerContentItemTypes,
              siblingItem.contentItemType,
            ) !== -1
          ) {
            // Continue searching starting at its last child item; manually set
            // parentItem.
            contentItemId = null;
            parentItem = siblingItem;
            siblingItemIds = parentItem.childItemIds;
            customParentItemSet = true;
          }
          i -= 1;
        }
      }

      // If parentItem wasn't already manually set.
      if (!customParentItemSet) {
        // Go up a level.
        contentItemId = parentItem !== null ? parentItem.id : null;
        parentItem = yield select(getContentItemById, ancestorItemIds.pop());
        siblingItemIds = parentItem ? parentItem.childItemIds : [];
      }
    }
  }

  return newActiveContentItemId;
}

function* doDeleteContentItemFromSlide(action) {
  try {
    const slide = yield select(getSlideById, action.meta.slideId);
    let contentItemId = action.meta.contentItemId;
    const ancestorItemIds = action.meta.ancestorItemIds;

    // If this contentItem is a single child, parent needs to be deleted as
    // well. Loop through ancestors to find the 'highest' contentItem that needs
    // to be deleted.
    let parentItem = null;
    let ancestorItem = yield select(getContentItemById, ancestorItemIds.pop());
    while (parentItem === null && ancestorItem) {
      // If the current ancestor item has more than one child.
      if (ancestorItem.childItemIds.length > 1) {
        // The current contentItemId is the one that needs to be deleted.
        // Set parentItemId to be its parent & stop the loop.
        parentItem = ancestorItem;
      }
      // If the current ancestor item has only one child.
      else {
        // Go further up the tree.
        contentItemId = ancestorItem.id;
        ancestorItem = yield select(getContentItemById, ancestorItemIds.pop());
      }
    }

    // Find the descendants, that need to be deleted along with this
    // contentItem.
    const descendantItemIds = yield select(
      getContentItemDescendantItemIdsById,
      contentItemId,
    );
    descendantItemIds.shift(); // remove contentItem's own id

    // Find the contentItem before the deleted one (if there is one) so focus
    // can be moved to it.
    const newActiveContentItemId = yield findNewActiveContentItemId(
      contentItemId,
      parentItem !== null ? parentItem.childItemIds : slide.contentItemIds,
      parentItem !== null ? parentItem.id : null,
      ancestorItemIds,
    );
    let newSelectionOffsets = null;
    if (newActiveContentItemId !== null) {
      const newActiveContentItem = yield select(
        getContentItemById,
        newActiveContentItemId,
      );
      newSelectionOffsets = {
        start: newActiveContentItem.text.length,
        end: newActiveContentItem.text.length,
      };
    }

    yield put(deleteContentItem(
      contentItemId,
      slide.id,
      parentItem !== null ? parentItem.id : null,
      descendantItemIds,
      newActiveContentItemId,
      newSelectionOffsets,
    ));
  }
  catch (e) {
    console.error(e);
  }
}

function* deleteContentItemFromSlideWatcher() {
  yield takeEvery(DELETE_CONTENT_ITEM_FROM_SLIDE, doDeleteContentItemFromSlide);
}

export default deleteContentItemFromSlideWatcher;
