import _ from 'lodash';

import { containerContentItemTypes } from 'constants/contentItemTypes';
import { directions } from 'constants/directions';

// Helper functions ------------------------------------------------------------

function findNearestValidContentItemId(
  direction,
  contentItemId,
  ancestorItemIds,
  slideContentItemIds,
  contentItemsById,
  contentItemValidator,
  containerItemValidator,
  checkContainerChildren = false,
) {
  const debug = false;
  let siblingItemIds;

  let newContentItemId;
  let newAncestorItemIds;
  let newCheckContainerChildren;

  const parentItemId = _.last(ancestorItemIds);
  if (parentItemId !== undefined) {
      siblingItemIds = contentItemsById[parentItemId].childItemIds;
  } else {
    siblingItemIds = slideContentItemIds;
  }

  const indexInSiblingItemIds = Array.indexOf(siblingItemIds, contentItemId);
  const contentItem = contentItemsById[contentItemId];

  // First check if the contentItem is a container element.
  // (Note: we don't do this on the initial call (original contentItem for which
  // we're looking for a previous contentItem) because then the section children
  // are not actual previous elements.)
  if (checkContainerChildren && containerItemValidator(contentItem) === true){
    if (debug) console.log(`${contentItemId} isSection`);
    // If it is a container, check its first/last child.
    newContentItemId = direction === directions.UP
      ? _.last(contentItem.childItemIds)
      : _.first(contentItem.childItemIds);
    if (newContentItemId !== undefined) {
      newAncestorItemIds = ancestorItemIds.concat(contentItemId);
    }
    newCheckContainerChildren = true;
  }
  // If the contentItem is the first/last in its list of siblings.
  else if (
    (direction === directions.UP && indexInSiblingItemIds === 0) ||
    (direction === directions.DOWN && indexInSiblingItemIds === siblingItemIds.length - 1)
  ) {
    if (debug) console.log(`${contentItemId} isFirst/Last`);
    // Go up a level.
    newContentItemId = _.last(ancestorItemIds);
    if (newContentItemId !== undefined) {
      newAncestorItemIds = _.dropRight(ancestorItemIds, 1);
    } else {
      newContentItemId = null;
    }
    // Don't go back down this section.
    newCheckContainerChildren = false;
  }
  // If the contentItem is not the first/last in its list of siblings.
  else {
    if (debug) console.log(`${contentItemId} isNotFirst/Last`);
    // Check the previous/next sibling.
    newContentItemId = direction === directions.UP
      ? siblingItemIds[indexInSiblingItemIds - 1]
      : siblingItemIds[indexInSiblingItemIds + 1];
    newAncestorItemIds = ancestorItemIds;
    newCheckContainerChildren = true;
  }

  if (debug) {
    console.log(`newContentItemId: ${newContentItemId}`);
    console.log(`newAncestorItemIds: ${newAncestorItemIds}`);
  }

  // If no previous contentItemId could be found.
  if (newContentItemId === null) {
    return null;
  }
  // If a previous contentItemId was found.
  else {
    // If the contentItem is valid, this is the contentItemId we were looking for.
    if (contentItemValidator(contentItemsById[newContentItemId]) === true) {
      return newContentItemId;
    }
    // If the contentItem is not valid, we need to search further.
    else {
      return findNearestValidContentItemId(
        direction,
        newContentItemId,
        newAncestorItemIds,
        slideContentItemIds,
        contentItemsById,
        contentItemValidator,
        containerItemValidator,
        newCheckContainerChildren,
      );
    }
  }
}

function findNearestAncestorIdWithAtLeastAmountOfChildren(
  ancestorItemIds,
  contentItemsById,
  amount,
) {
  // If there are no ancestors left.
  if (ancestorItemIds.length === 0) {
    return null;
  }
  // If there are ancestors left.
  else {
    let newAncestorItemIds;

    // Get the parentItem.
    const parentItemId = _.last(ancestorItemIds);
    const parentItem = contentItemsById[parentItemId];
    // Remove the parent from the ancestorItemIds.
    newAncestorItemIds = _.dropRight(ancestorItemIds, 1);

    // Test if the parent is a valid ancestor.
    if (parentItem.childItemIds.length >= amount) {
      return parentItem.id;
    }
    // If the parent was not a valid ancestor.
    else {
      // Go further up the ancestors list.
      return findNearestAncestorIdWithAtLeastAmountOfChildren(
        newAncestorItemIds,
        contentItemsById,
        amount,
      );
    }
  }
}

function findAllContentItemDescendantItemIds(contentItemId, contentItemsById) {
  const contentItem = contentItemsById[contentItemId];
  let descendantItemIds = [];

  // If this contentItem is a container.
  if (Array.indexOf(containerContentItemTypes, contentItem.contentItemType) !== -1) {
    // Add all of its children and their descendants to the array.
    contentItem.childItemIds.forEach(childItemId => {
      descendantItemIds = descendantItemIds.concat(childItemId);
      descendantItemIds = descendantItemIds.concat(
        findAllContentItemDescendantItemIds(childItemId, contentItemsById),
      );
    });
  }

  return descendantItemIds;
}

// Exported functions ----------------------------------------------------------

export function getPreviousValidContentItemId(
  contentItemId,
  ancestorItemIds,
  slideContentItemIds,
  contentItemsById,
  contentItemValidator,
  containerItemValidator,
) {
  return findNearestValidContentItemId(
    directions.UP,
    contentItemId,
    ancestorItemIds,
    slideContentItemIds,
    contentItemsById,
    contentItemValidator,
    containerItemValidator,
  );
}

export function getNextValidContentItemId(
  contentItemId,
  ancestorItemIds,
  slideContentItemIds,
  contentItemsById,
  contentItemValidator,
  containerItemValidator,
) {
  return findNearestValidContentItemId(
    directions.DOWN,
    contentItemId,
    ancestorItemIds,
    slideContentItemIds,
    contentItemsById,
    contentItemValidator,
    containerItemValidator,
  );
}

export function getNearestAncestorIdWithAtLeastAmountOfChildren(
  ancestorItemIds,
  contentItemsById,
  amount = 1,
) {
  return findNearestAncestorIdWithAtLeastAmountOfChildren(
    ancestorItemIds,
    contentItemsById,
    amount,
  );
}

export function getAllContentItemDescendantItemIds(
  contentItemId,
  contentItemsById,
) {
  return findAllContentItemDescendantItemIds(contentItemId, contentItemsById);
}
