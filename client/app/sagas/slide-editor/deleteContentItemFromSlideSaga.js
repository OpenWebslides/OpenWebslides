import _ from 'lodash';
import { takeEvery, select, put, call } from 'redux-saga/effects';

import { plaintextContentItemTypes, containerContentItemTypes } from 'constants/contentItemTypes';
import { slideViewTypes } from 'constants/slideViewTypes';

import {
  getPreviousValidContentItemId,
  getNearestValidAncestorItemId,
  getContentItemDescendantItemIds,
} from 'lib/state-traversal/contentItems';

import { DELETE_CONTENT_ITEM_FROM_SLIDE } from 'actions/entities/slides';
import { deleteContentItem } from 'actions/entities/content-items';
import deleteAssetApi from 'api/deleteAssetApi';
import { getFocusedSlideViewType } from 'selectors/app/slide-editor';
import { getSlideById } from 'selectors/entities/slides';
import { getContentItemsById, getContentItemById } from 'selectors/entities/content-items';

function findContentItemToDeleteId(contentItemId, ancestorItemIds, contentItemsById) {
  let contentItemToDeleteId;
  let contentItemToDeleteAncestorItemIds;
  let contentItemToDeleteDescendantItemIds;

  // If the contentItem has ancestors.
  if (ancestorItemIds.length > 0) {
    // If this contentItem is a single child, parent needs to be deleted as
    // well.
    const nearestValidAncestorItemId =
      getNearestValidAncestorItemId(
        ancestorItemIds,
        contentItemsById,
        (contentItem) => {
          // Ancestors with less than two children should be deleted, so we're looking for the
          // nearest ancestor with two or more children.
          return contentItem.childItemIds.length >= 2;
        },
      );

    // If no ancestor with more than two children was found.
    if (nearestValidAncestorItemId === null) {
      // Delete all of the ancestors.
      contentItemToDeleteId = ancestorItemIds[0];
      contentItemToDeleteAncestorItemIds = [];
      contentItemToDeleteDescendantItemIds = _.drop(
        ancestorItemIds,
        1,
      )
      .concat(contentItemId)
      .concat(
        getContentItemDescendantItemIds(contentItemId, contentItemsById),
      );
    }
    // If an ancestor with more than two children was found.
    else {
      const nearestValidAncestorItemIdIndex = Array.indexOf(
        ancestorItemIds,
        nearestValidAncestorItemId,
      );
      // If the nearest valid ancestor is the parent of contentItem.
      if (nearestValidAncestorItemIdIndex === ancestorItemIds.length - 1) {
        // Just delete contentItem.
        contentItemToDeleteId = contentItemId;
        contentItemToDeleteAncestorItemIds = ancestorItemIds;
        contentItemToDeleteDescendantItemIds = [];
      }
      // If the nearest valid ancestor is further up the tree.
      else {
        // Start deleting at the ancestor that is the direct child of the nearest valid ancestor.
        contentItemToDeleteId = ancestorItemIds[
          nearestValidAncestorItemIdIndex + 1
        ];
        contentItemToDeleteAncestorItemIds = _.take(
          ancestorItemIds,
          nearestValidAncestorItemIdIndex + 1,
        );
        contentItemToDeleteDescendantItemIds = _.drop(
          ancestorItemIds,
          nearestValidAncestorItemIdIndex + 2,
        )
        .concat(contentItemId)
        .concat(
          getContentItemDescendantItemIds(contentItemId, contentItemsById),
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
  };
}

// Decides which contentItems are valid contentItems in the getPreviousValidContentItemId()
// function.
function contentItemValidator(contentItem, focusedSlideViewType) {
  // Only plaintext contentItems can receive focus (for now). #TODO
  const isContentItemTypeCorrect = Array.indexOf(
    plaintextContentItemTypes,
    contentItem.contentItemType,
  ) !== -1;

  // In live view, we want to skip all course-view only contentItems (because these are invisible
  // in live view and can't receive focus).
  // #TODO generalize this for all possible (future) viewTypes
  const isSlideViewTypeCorrect = !(
    focusedSlideViewType === slideViewTypes.LIVE &&
    contentItem.viewType !== slideViewTypes.LIVE);

  return isContentItemTypeCorrect && isSlideViewTypeCorrect;
}

// Decides which contentItems are considered containers in the getPreviousValidContentItemId()
// function.
function containerItemValidator(contentItem) {
  return Array.indexOf(
    containerContentItemTypes,
    contentItem.contentItemType,
  ) !== -1;
}

function* doDeleteContentItemFromSlide(action) {
  try {
    const focusedSlideViewType = yield select(getFocusedSlideViewType);
    const contentItemsById = yield select(getContentItemsById);
    const slide = yield select(getSlideById, action.meta.slideId);
    const { contentItemId, ancestorItemIds } = action.meta;

    // If this contentItem is a single child, parent (and potentially ancestors further up the tree)
    // needs to be deleted as well.
    const {
      contentItemToDeleteId,
      contentItemToDeleteAncestorItemIds,
      contentItemToDeleteDescendantItemIds,
    } = findContentItemToDeleteId(
      contentItemId,
      ancestorItemIds,
      contentItemsById,
    );

    // If the contentItemToDelete has an asset, delete it as well.
    // #TODO test this as soon as deletion-wrapper is functional again.
    // #TODO buffer asset deletions until the deck is actually saved
    const contentItemToDelete = yield select(getContentItemById, contentItemToDeleteId);
    if (contentItemToDelete.dataId !== undefined) {
      yield call(deleteAssetApi, contentItemToDelete.dataId);
    }

    // Find the contentItem before the deleted one (if there is one) so focus can be moved to it.
    const { contentItemId: newFocusedContentItemId } = getPreviousValidContentItemId(
      contentItemToDeleteId,
      contentItemToDeleteAncestorItemIds,
      slide.contentItemIds,
      contentItemsById,
      false,
      contentItem => contentItemValidator(contentItem, focusedSlideViewType),
      contentItem => containerItemValidator(contentItem),
    );

    // If a previous contentItem was found, automatically set the caret position after the last char
    // of its text. (This allows the user to continuously delete contentitems by keeping backspace
    // pressed.)
    let newSelectionOffsets = null;
    if (newFocusedContentItemId !== null) {
      const newFocusedContentItem = yield select(
        getContentItemById,
        newFocusedContentItemId,
      );
      newSelectionOffsets = {
        start: newFocusedContentItem.text.length,
        end: newFocusedContentItem.text.length,
      };
    }

    // Find the direct parent id (since the deleteContentItem function needs it so the id of the
    // deleted contentItem can be removed from its parent's childIds list).
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
      newFocusedContentItemId,
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
