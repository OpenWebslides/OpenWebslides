import { takeEvery, select, put } from 'redux-saga/effects';

import {
  plaintextContentItemTypes,
  containerContentItemTypes,
} from 'constants/contentItemTypes';

import { getPreviousValidContentItemId } from 'lib/state-traversal/contentItems';

import { DELETE_CONTENT_ITEM_FROM_SLIDE } from 'actions/entities/slides';
import { deleteContentItem } from 'actions/entities/content-items';
import { getSlideById } from 'selectors/entities/slides';
import {
  getContentItemsById,
  getContentItemById,
  getContentItemDescendantItemIdsById
} from 'selectors/entities/content-items';

function* doDeleteContentItemFromSlide(action) {
  try {
    const contentItemsById = yield select(getContentItemsById);
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

    // Make sure the list of ancestorIds includes parent again.
    // #TODO refactor this and above code
    if (parentItem) {
      ancestorItemIds.push(parentItem.id);
    }

    // Find the descendants, that need to be deleted along with this contentItem.
    let descendantItemIds = yield select(getContentItemDescendantItemIdsById, contentItemId);
    descendantItemIds.shift(); // remove contentItem's own id

    // Find the contentItem before the deleted one (if there is one) so focus
    // can be moved to it.
    const newActiveContentItemId = getPreviousValidContentItemId(
      contentItemId,
      ancestorItemIds,
      slide.contentItemIds,
      contentItemsById,
      plaintextContentItemTypes,
      containerContentItemTypes,
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
