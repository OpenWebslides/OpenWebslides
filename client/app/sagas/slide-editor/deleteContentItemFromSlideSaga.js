import _ from 'lodash';
import { takeEvery, select, put } from 'redux-saga/effects';

import {
  plaintextContentItemTypes,
  containerContentItemTypes,
} from 'constants/contentItemTypes';

import {
  getPreviousValidContentItemId,
  getNearestAncestorIdWithAtLeastAmountOfChildren,
  getAllContentItemDescendantItemIds,
} from 'lib/state-traversal/contentItems';

import { DELETE_CONTENT_ITEM_FROM_SLIDE } from 'actions/entities/slides';
import { deleteContentItem } from 'actions/entities/content-items';
import { getSlideById } from 'selectors/entities/slides';
import {
  getContentItemsById,
  getContentItemById,
} from 'selectors/entities/content-items';

function findContentItemToDeleteId(contentItemId, ancestorItemIds, contentItemsById) {
  let contentItemToDeleteId;
  let contentItemToDeleteAncestorItemIds;
  let contentItemToDeleteDescendantItemIds;

  // If the contentItem has ancestors.
  if (ancestorItemIds.length > 0) {
    // If this contentItem is a single child, parent needs to be deleted as well.
    const nearestValidAncestorId = getNearestAncestorIdWithAtLeastAmountOfChildren(
      ancestorItemIds,
      contentItemsById,
      2, // ancestors with less than two children should be deleted
    );

    // If no ancestor with more than two children was found.
    if (nearestValidAncestorId === null) {
      // Delete all of the ancestors.
      contentItemToDeleteId = ancestorItemIds[0];
      contentItemToDeleteAncestorItemIds = [];
      contentItemToDeleteDescendantItemIds = _.drop(
        ancestorItemIds,
        1
      )
      .concat(contentItemId)
      .concat(
        getAllContentItemDescendantItemIds(contentItemId, contentItemsById)
      );
    }
    // If an ancestor with more than two children was found.
    else {
      const nearestValidAncestorIdIndex = Array.indexOf(
        ancestorItemIds,
        nearestValidAncestorId,
      );
      // If the nearest valid ancestor is the parent of contentItem.
      if (nearestValidAncestorIdIndex === ancestorItemIds.length - 1) {
        // Just delete contentItem.
        contentItemToDeleteId = contentItemId;
        contentItemToDeleteAncestorItemIds = ancestorItemIds;
        contentItemToDeleteDescendantItemIds = [];
      }
      // If the nearest valid ancestor is further up the tree.
      else {
        // Start deleting at the ancestor that is the direct child of the
        // nearest valid ancestor.
        contentItemToDeleteId = ancestorItemIds[nearestValidAncestorIdIndex + 1];
        contentItemToDeleteAncestorItemIds = _.take(ancestorItemIds, nearestValidAncestorIdIndex + 1);
        contentItemToDeleteDescendantItemIds = _.drop(
          ancestorItemIds,
          nearestValidAncestorIdIndex + 2
        )
        .concat(contentItemId)
        .concat(
          getAllContentItemDescendantItemIds(contentItemId, contentItemsById)
        );
      }
    }
  }
  // If the contentItem does not have ancestors.
  else {
    // Just delete the contentItem.
    contentItemToDeleteId = contentItemId;
    contentItemToDeleteAncestorItemIds = ancestorItemIds;
    contentItemToDeleteDescendantItemIds = [];
  }

  return {
    contentItemToDeleteId,
    contentItemToDeleteAncestorItemIds,
    contentItemToDeleteDescendantItemIds,
  }
}

function* doDeleteContentItemFromSlide(action) {
  try {
    const contentItemsById = yield select(getContentItemsById);
    const slide = yield select(getSlideById, action.meta.slideId);
    let contentItemId = action.meta.contentItemId;
    const ancestorItemIds = action.meta.ancestorItemIds;

    // If this contentItem is a single child, parent (and potentially ancestors
    // further up the tree) needs to be deleted as well.
    const {
      contentItemToDeleteId,
      contentItemToDeleteAncestorItemIds,
      contentItemToDeleteDescendantItemIds,
    } = findContentItemToDeleteId(contentItemId, ancestorItemIds, contentItemsById);

    // Find the contentItem before the deleted one (if there is one) so focus
    // can be moved to it.
    const newActiveContentItemId = getPreviousValidContentItemId(
      contentItemToDeleteId,
      contentItemToDeleteAncestorItemIds,
      slide.contentItemIds,
      contentItemsById,
      contentItem => {
        return Array.indexOf(plaintextContentItemTypes, contentItem.contentItemType) !== -1;
      },
      contentItem => {
        return Array.indexOf(containerContentItemTypes, contentItem.contentItemType) !== -1;
      },
    );

    // If a previous contentItem was found, automatically set the caret position
    // after the last char of its text. (This allows the user to continuously
    // delete contentitems by keeping backspace pressed.)
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

    // Find the direct parent id (since the deleteContentItem function needs it
    // so the id of the deleted contentItem can be removed from its parent's
    // childIds list).
    const parentItemId = contentItemToDeleteAncestorItemIds.length > 0
      ? _.last(contentItemToDeleteAncestorItemIds)
      : null;

    // Delete the contentItem + descendants and move on to the end of the
    // previous contentItem.
    yield put(deleteContentItem(
      contentItemToDeleteId,
      slide.id,
      parentItemId,
      contentItemToDeleteDescendantItemIds,
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
