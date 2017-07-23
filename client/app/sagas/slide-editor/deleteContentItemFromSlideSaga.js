import { takeEvery, select, put } from 'redux-saga/effects';

import { plaintextContentItemTypes, containerContentItemTypes } from 'constants/contentItemTypes';

import { DELETE_CONTENT_ITEM_FROM_SLIDE } from 'actions/entities/slides';
import { deleteContentItem } from 'actions/entities/content-items';
import { getContentItemById, getContentItemDescendantItemIdsById } from 'selectors/entities/content-items';

// #TODO refactor this code
function* findNewActiveContentItemId(contentItemId, parentItemId, ancestorItemIds) {
  let newActiveContentItemId = null;

  if (parentItemId !== null) {
    let parentItem = yield select(getContentItemById, parentItemId);
    let siblingItem;
    let customParentItemSet;
    let i;

    // Loop through ancestors until a suitable contentItem is found.
    while(newActiveContentItemId === null && parentItem) {
      customParentItemSet = false;

      // Find the index of the current contentItem inside the parentItem.
      let indexInParent = contentItemId !== null
        ? Array.indexOf(parentItem.childItemIds, contentItemId)
        : parentItem.childItemIds.length;

      // If this isn't the first contentItem inside parentItem.
      if (indexInParent !== 0) {
        // Loop through predecessors in reverse.
        i = indexInParent - 1;
        while (newActiveContentItemId === null && !customParentItemSet && i >= 0) {
          siblingItem = yield select(getContentItemById, parentItem.childItemIds[i]);
          // If this predecessor is a plaintext item.
          if (Array.indexOf(plaintextContentItemTypes, siblingItem.contentItemType) !== -1) {
            // This is a suitable newActiveContentItem.
            newActiveContentItemId = siblingItem.id;
          }
          // If this predecessor is a container contentItem.
          else if (Array.indexOf(containerContentItemTypes, siblingItem.contentItemType) !== -1) {
            // Continue searching starting at its last child item; manually set parentItem
            contentItemId = null;
            parentItem = siblingItem;
            customParentItemSet = true;
          }
          i--;
        }
      }

      // If parentItem wasn't already manually set.
      if (!customParentItemSet) {
        // Go up a level.
        contentItemId = parentItem.id;
        parentItem = yield select(getContentItemById, ancestorItemIds.pop());
      }
    }
  }

  return newActiveContentItemId;
}

function* doDeleteContentItemFromSlide(action) {
  try {
    let {slideId, contentItemId, ancestorItemIds} = action.meta;

    // If this contentItem is a single child, parent needs to be deleted as well.
    // Loop through ancestors to find the 'highest' contentItem that needs to be deleted.
    let parentItemId = null;
    let ancestorItem = yield select(getContentItemById, ancestorItemIds.pop());
    while (parentItemId === null && ancestorItem) {
      // If the current ancestor item has more than one child.
      if (ancestorItem.childItemIds.length > 1) {
        // The current contentItemId is the one that needs to be deleted.
        // Set parentItemId to be its parent & stop the loop.
        parentItemId = ancestorItem.id;
      }
      // If the current ancestor item has only one child.
      else {
        // Go further up the tree.
        contentItemId = ancestorItem.id;
        ancestorItem = yield select(getContentItemById, ancestorItemIds.pop());
      }
    }

    // Find the descendants, that need to be deleted along with this contentItem.
    let descendantItemIds = yield select(getContentItemDescendantItemIdsById, contentItemId);
    descendantItemIds.shift(); // remove contentItem's own id

    // Find the contentItem before the deleted one (if there is one) so focus can be moved to it.
    const newActiveContentItemId = yield findNewActiveContentItemId(contentItemId, parentItemId, ancestorItemIds);
    let newSelectionOffsets = null;
    if (newActiveContentItemId !== null) {
      const newActiveContentItem = yield select(getContentItemById, newActiveContentItemId);
      newSelectionOffsets = {
        start: newActiveContentItem.text.length,
        end: newActiveContentItem.text.length,
      };
    }

    yield put(deleteContentItem(
      contentItemId,
      slideId,
      parentItemId,
      descendantItemIds,
      newActiveContentItemId,
      newSelectionOffsets,
    ));

  } catch(e) {
    console.error(e);
  }
}

function* deleteContentItemFromSlideWatcher() {
  yield takeEvery(DELETE_CONTENT_ITEM_FROM_SLIDE, doDeleteContentItemFromSlide);
}

export default deleteContentItemFromSlideWatcher;