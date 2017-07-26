import _ from 'lodash';

import { directions } from 'constants/directions';

function findNearestValidContentItemId(
  direction,
  contentItemId,
  ancestorItemIds,
  slideContentItemIds,
  contentItemsById,
  validContentItemTypes,
  containerContentItemTypes,
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
  if (checkContainerChildren && Array.indexOf(containerContentItemTypes, contentItem.contentItemType) !== -1) {
    if (debug) console.log(`${contentItemId} isSection`);
    // If it is a container, check its first/last child.
    newContentItemId = direction === directions.UP
      ? _.last(contentItem.childItemIds)
      : _.first(contentItem.childItemIds);
    if (newContentItemId !== undefined) {
      newAncestorItemIds = ancestorItemIds.concat(newContentItemId);
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

  // If no previous contentItemId could be found.
  if (newContentItemId === null) {
    return null;
  }
  // If a previous contentItemId was found.
  else {
    // Check if this contentItem is valid.
    let newContentItemIsValid = Array.indexOf(
      validContentItemTypes,
      contentItemsById[newContentItemId].contentItemType
    ) !== -1;
    // If it is valid, this is the contentItemId we were looking for.
    if (newContentItemIsValid) {
      return newContentItemId;
    }
    // If it is not valid, we need to search further.
    else {
      return findNearestValidContentItemId(
        direction,
        newContentItemId,
        newAncestorItemIds,
        slideContentItemIds,
        contentItemsById,
        validContentItemTypes,
        containerContentItemTypes,
        newCheckContainerChildren,
      );
    }
  }
}

export function getPreviousValidContentItemId(
  contentItemId,
  ancestorItemIds,
  slideContentItemIds,
  contentItemsById,
  validContentItemTypes,
  containerContentItemTypes,
) {
  return findNearestValidContentItemId(
    directions.UP,
    contentItemId,
    ancestorItemIds,
    slideContentItemIds,
    contentItemsById,
    validContentItemTypes,
    containerContentItemTypes,
  );
}

export function getNextValidContentItemId(
  contentItemId,
  ancestorItemIds,
  slideContentItemIds,
  contentItemsById,
  validContentItemTypes,
  containerContentItemTypes,
) {
  return findNearestValidContentItemId(
    directions.DOWN,
    contentItemId,
    ancestorItemIds,
    slideContentItemIds,
    contentItemsById,
    validContentItemTypes,
    containerContentItemTypes,
  );
}
