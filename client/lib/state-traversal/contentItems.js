import _ from 'lodash';

import { contentItemTypes, containerContentItemTypes } from 'constants/contentItemTypes';
import { directions } from 'constants/directions';

// Helper functions ------------------------------------------------------------

function findContentItemSiblingItemIdsAndIndex(
  contentItemId,
  ancestorItemIds,
  slideContentItemIds,
  contentItemsById,
) {
  // Get the siblingItemIds array from either the parent item or the slide.
  const siblingItemIds = (ancestorItemIds.length !== 0)
    ? contentItemsById[_.last(ancestorItemIds)].childItemIds
    : slideContentItemIds;
  // Find the index of the contentItemId in the siblingItemIds array.
  const indexInSiblingItemIds = _.indexOf(siblingItemIds, contentItemId);

  return { siblingItemIds, indexInSiblingItemIds };
}

function findPreviousValidContentItemId(
  contentItemId,
  ancestorItemIds,
  slideContentItemIds,
  contentItemsById,
  checkContainerChildren,
  contentItemValidator,
  containerItemValidator,
) {
  const debug = false;

  let newContentItemId;
  let newAncestorItemIds;
  let newCheckContainerChildren;
  let checkNewContentItem;

  const contentItem = contentItemsById[contentItemId];
  const { siblingItemIds, indexInSiblingItemIds } = findContentItemSiblingItemIdsAndIndex(
    contentItemId,
    ancestorItemIds,
    slideContentItemIds,
    contentItemsById,
  );

  if (debug) {
    console.log('Find prev call -------------------------');
    console.log(`contentItemId: ${contentItemId}`);
    console.log(`ancestorItemIds: ${ancestorItemIds}`);
    console.log(`checkContainerChildren: ${checkContainerChildren}`);
  }

  // First check if the contentItem is a (non-empty) container element.
  // (Note: we only do this if checkContainerChildren is set to TRUE to indicate that the container
  // children are possible previousValidContentItem candidates.)
  if (
    checkContainerChildren &&
    containerItemValidator(contentItem, ancestorItemIds) === true &&
    contentItem.childItemIds.length > 0
  ) {
    if (debug) console.log('Check container last child');
    // If it is a (non-empty) container, check its last child.
    newContentItemId = _.last(contentItem.childItemIds);
    newAncestorItemIds = ancestorItemIds.concat(contentItemId);
    // If the last child is a container, its children are possible previousValidContentItems.
    newCheckContainerChildren = true;
    // Check this newContentItem for validity.
    checkNewContentItem = true;
  }
  // If the contentItem is the first in its list of siblings.
  else if (indexInSiblingItemIds === 0) {
    if (debug) console.log('Go up a level');
    // Go up a level.
    if (ancestorItemIds.length > 0) {
      newContentItemId = _.last(ancestorItemIds);
      newAncestorItemIds = _.dropRight(ancestorItemIds, 1);
      // Don't go back down this container.
      newCheckContainerChildren = false;
      // Don't check this newContentItem for validity (this check has already happened right before
      // we entered it and we don't want to check the same contentItem twice) but directly move on
      // to the next.
      checkNewContentItem = false;
    }
    // If there are no higher levels, then this was the first contentItem on the slide.
    else {
      // A previousValidContentItem cannot be found.
      newContentItemId = null;
    }
  }
  // If the contentItem is not a checkable container and not the first in its list of siblings.
  else {
    if (debug) console.log('Check prev sibling');
    // There must be a previous sibling then; check that one.
    newContentItemId = siblingItemIds[indexInSiblingItemIds - 1];
    newAncestorItemIds = ancestorItemIds;
    // If this previous sibling is a container, its children are possible previousValidContentItems.
    newCheckContainerChildren = true;
    // Check this newContentItem for validity.
    checkNewContentItem = true;
  }

  if (debug) {
    console.log(`newContentItemId: ${newContentItemId}`);
    console.log(`newAncestorItemIds: ${newAncestorItemIds}`);
    console.log(`newCheckContainerChildren: ${newCheckContainerChildren}`);
    console.log('End find prev call ---------------------');
  }

  // If no possible previousValidContentItem candidate could be found, return null.
  if (newContentItemId === null) {
    return {
      contentItemId: null,
      ancestorItemIds: [],
      checkContainerChildren: true,
    };
  }
  // If a checkable previous contentItemId was found, and it was valid, this is the contentItemId we
  // were looking for.
  else if (
    checkNewContentItem &&
    contentItemValidator(contentItemsById[newContentItemId], newAncestorItemIds) === true
  ) {
    return {
      contentItemId: newContentItemId,
      ancestorItemIds: newAncestorItemIds,
      checkContainerChildren: newCheckContainerChildren,
    };
  }
  // Otherwise, we need to search further.
  else {
    return findPreviousValidContentItemId(
      newContentItemId,
      newAncestorItemIds,
      slideContentItemIds,
      contentItemsById,
      newCheckContainerChildren,
      contentItemValidator,
      containerItemValidator,
    );
  }
}

function findNextValidContentItemId(
  contentItemId,
  ancestorItemIds,
  slideContentItemIds,
  contentItemsById,
  checkContainerChildren,
  contentItemValidator,
  containerItemValidator,
) {
  const debug = false;

  let newContentItemId;
  let newAncestorItemIds;
  let newCheckContainerChildren;
  let checkNewContentItem;

  const contentItem = contentItemsById[contentItemId];
  const { siblingItemIds, indexInSiblingItemIds } = findContentItemSiblingItemIdsAndIndex(
    contentItemId,
    ancestorItemIds,
    slideContentItemIds,
    contentItemsById,
  );

  if (debug) {
    console.log('Find next call -------------------------');
    console.log(`contentItemId: ${contentItemId}`);
    console.log(`ancestorItemIds: ${ancestorItemIds}`);
    console.log(`checkContainerChildren: ${checkContainerChildren}`);
  }

  // First check if the contentItem is a (non-empty) container element.
  // (Note: we only do this if checkContainerChildren is set to TRUE to indicate that the container
  // children are possible nextValidContentItem candidates.)
  if (
    checkContainerChildren &&
    containerItemValidator(contentItem, ancestorItemIds) === true &&
    contentItem.childItemIds.length > 0
  ) {
    if (debug) console.log('Check container first child');
    // If it is a (non-empty) container, check its first child.
    newContentItemId = _.first(contentItem.childItemIds);
    newAncestorItemIds = ancestorItemIds.concat(contentItemId);
    // If the last child is a container, its children are possible nextValidContentItems.
    newCheckContainerChildren = true;
    // Check this newContentItem for validity.
    checkNewContentItem = true;
  }
  // If the contentItem is the last in its list of siblings.
  else if (indexInSiblingItemIds === siblingItemIds.length - 1) {
    if (debug) console.log('Go up a level');
    // Go up a level.
    if (ancestorItemIds.length > 0) {
      newContentItemId = _.last(ancestorItemIds);
      newAncestorItemIds = _.dropRight(ancestorItemIds, 1);
      // Don't go back down this container.
      newCheckContainerChildren = false;
      // Check the upper level container for validity.
      checkNewContentItem = true;
    }
    // If there are no higher levels, then this was the last contentItem on the slide.
    else {
      // A nextValidContentItem cannot be found.
      newContentItemId = null;
    }
  }
  // If the contentItem is not a checkable container and not the last in its list of siblings.
  else {
    if (debug) console.log('Check next sibling');
    // There must be a next sibling then; check that one.
    newContentItemId = siblingItemIds[indexInSiblingItemIds + 1];
    newAncestorItemIds = ancestorItemIds;
    // If this next sibling is a container, its children are possible nextValidContentItems.
    newCheckContainerChildren = true;

    // Only check the new item for validity if it is not a container; containers should be checked
    // only when they are 'exited' (when moving up a level), not when they are entered. This
    // prevents the same item from being checked twice.
    checkNewContentItem =
      (containerItemValidator(contentItemsById[newContentItemId], newAncestorItemIds) === false);
  }

  if (debug) {
    console.log(`newContentItemId: ${newContentItemId}`);
    console.log(`newAncestorItemIds: ${newAncestorItemIds}`);
    console.log(`newCheckContainerChildren: ${newCheckContainerChildren}`);
    console.log('End find next call ---------------------');
  }

  // If no possible nextValidContentItem candidate could be found, return null.
  if (newContentItemId === null) {
    return {
      contentItemId: null,
      ancestorItemIds: [],
      checkContainerChildren: true,
    };
  }
  // If a checkable next contentItemId was found, and it was valid, this is the contentItemId we
  // were looking for.
  else if (
    checkNewContentItem &&
    contentItemValidator(contentItemsById[newContentItemId], newAncestorItemIds) === true
  ) {
    return {
      contentItemId: newContentItemId,
      ancestorItemIds: newAncestorItemIds,
      checkContainerChildren: newCheckContainerChildren,
    };
  }
  // Otherwise, we need to search further.
  else {
    return findNextValidContentItemId(
      newContentItemId,
      newAncestorItemIds,
      slideContentItemIds,
      contentItemsById,
      newCheckContainerChildren,
      contentItemValidator,
      containerItemValidator,
    );
  }
}

function findPreviousValidContentItemPosition(
  contentItemId,
  ancestorItemIds,
  slideContentItemIds,
  contentItemsById,
  positionValidator,
  amountOfItemsToSkip,
) {
  let positionItemId = contentItemId;
  let positionItemAncestorItemIds = ancestorItemIds;
  let positionItemCheckContainerChildren = false;
  let positionItemIndexInSiblingItemIds;

  let skippedItemsCounter = 0;
  let validPositionFound = false;
  let checkTopmostPosition = false;

  // Iterate over all previous contentItems, starting at the item with id $contentItemId.
  while (!validPositionFound && (positionItemId !== null || checkTopmostPosition === false)) {
    // If positionItemId equals NULL (meaning no previous contentItem could be found) we only need
    // to check for the NULL position on the slide itself; after that we have to stop the loop.
    if (positionItemId === null) {
      checkTopmostPosition = true;
    }

    // If the item we last checked was the first item in its container, see if we can move the
    // contentItem to the first position in the section (i.e. positionItemId === null) before
    // moving on to the parent container.
    ({
      indexInSiblingItemIds: positionItemIndexInSiblingItemIds,
    } = findContentItemSiblingItemIdsAndIndex(
      positionItemId,
      positionItemAncestorItemIds,
      slideContentItemIds,
      contentItemsById,
    ));
    if (positionItemIndexInSiblingItemIds === 0 || checkTopmostPosition) {
      if (
        skippedItemsCounter === amountOfItemsToSkip &&
        positionValidator(
          contentItemId,
          ancestorItemIds,
          null,
          positionItemAncestorItemIds,
          slideContentItemIds,
          contentItemsById,
        )
      ) {
        validPositionFound = true;
        positionItemId = null;
      }

      if (skippedItemsCounter < amountOfItemsToSkip) skippedItemsCounter += 1;
    }

    // If no valid position was found in the above step, get a new previous contentItem and try to
    // validate that one.
    if (!validPositionFound && !checkTopmostPosition) {
      ({
        contentItemId: positionItemId,
        ancestorItemIds: positionItemAncestorItemIds,
        checkContainerChildren: positionItemCheckContainerChildren,
      } = findPreviousValidContentItemId(
        positionItemId,
        positionItemAncestorItemIds,
        slideContentItemIds,
        contentItemsById,
        positionItemCheckContainerChildren,
        contentItem => _.includes(contentItemTypes, contentItem.contentItemType),
        contentItem => _.includes(containerContentItemTypes, contentItem.contentItemType),
      ));

      if (
        positionItemId !== null &&
        skippedItemsCounter === amountOfItemsToSkip &&
        positionValidator(
          contentItemId,
          ancestorItemIds,
          positionItemId,
          positionItemAncestorItemIds,
          slideContentItemIds,
          contentItemsById,
        )
      ) {
        validPositionFound = true;
      }

      if (skippedItemsCounter < amountOfItemsToSkip) skippedItemsCounter += 1;
    }
  }

  if (!validPositionFound) {
    return {
      validPositionFound: false,
      positionItemId: null,
      positionItemAncestorItemIds: [],
    };
  }
  else {
    return {
      validPositionFound: true,
      positionItemId,
      positionItemAncestorItemIds,
    };
  }
}

function findNextValidContentItemPosition(
  contentItemId,
  ancestorItemIds,
  slideContentItemIds,
  contentItemsById,
  positionValidator,
  amountOfItemsToSkip,
) {
  let positionItemId = contentItemId;
  let positionItemAncestorItemIds = ancestorItemIds;
  let positionItemCheckContainerChildren = false;
  let positionItemIndexInSiblingItemIds;

  let skippedItemsCounter = 0;
  let validPositionFound = false;

  // Iterate over all next contentItems, starting at the item with id $contentItemId.
  while (!validPositionFound && positionItemId !== null) {
    ({
      contentItemId: positionItemId,
      ancestorItemIds: positionItemAncestorItemIds,
      checkContainerChildren: positionItemCheckContainerChildren,
    } = findNextValidContentItemId(
      positionItemId,
      positionItemAncestorItemIds,
      slideContentItemIds,
      contentItemsById,
      positionItemCheckContainerChildren,
      contentItem => _.includes(contentItemTypes, contentItem.contentItemType),
      contentItem => _.includes(containerContentItemTypes, contentItem.contentItemType),
    ));

    // Check if the next contentItem is a valid position.
    if (
      positionItemId !== null &&
      skippedItemsCounter === amountOfItemsToSkip &&
      positionValidator(
        contentItemId,
        ancestorItemIds,
        positionItemId,
        positionItemAncestorItemIds,
        slideContentItemIds,
        contentItemsById,
      )
    ) {
      validPositionFound = true;
    }

    if (skippedItemsCounter < amountOfItemsToSkip) skippedItemsCounter += 1;

    // If the positionItem is the first child in a container, and we didn't just move up a
    // container, see if we can move the contentItem to the top of the container
    // (i.e. positionItemId === null) first. (If so, override the valid  positionItemId that might
    // have been set in the previous step.)
    ({
      indexInSiblingItemIds: positionItemIndexInSiblingItemIds,
    } = findContentItemSiblingItemIdsAndIndex(
      positionItemId,
      positionItemAncestorItemIds,
      slideContentItemIds,
      contentItemsById,
    ));
    if (
      positionItemCheckContainerChildren === true &&
      positionItemIndexInSiblingItemIds === 0
    ) {
      if (
        skippedItemsCounter === amountOfItemsToSkip &&
        positionValidator(
          contentItemId,
          ancestorItemIds,
          null,
          positionItemAncestorItemIds,
          slideContentItemIds,
          contentItemsById,
        )
      ) {
        validPositionFound = true;
        positionItemId = null;
      }

      if (skippedItemsCounter < amountOfItemsToSkip) skippedItemsCounter += 1;
    }
  }

  if (!validPositionFound) {
    return {
      validPositionFound: false,
      positionItemId: null,
      positionItemAncestorItemIds: [],
    };
  }
  else {
    return {
      validPositionFound: true,
      positionItemId,
      positionItemAncestorItemIds,
    };
  }
}

function findFurthestValidContentItemId(
  direction,
  contentItemIds,
  contentItemsById,
  contentItemValidator,
  containerItemValidator,
  ancestorItemIds = [],
) {
  if (contentItemIds.length === 0) {
    return {
      contentItemId: null,
      ancestorItemIds: [],
    };
  }
  else {
    // Get the first/last element in the list of contentItemIds.
    const contentItem = direction === directions.UP
      ? contentItemsById[_.first(contentItemIds)]
      : contentItemsById[_.last(contentItemIds)];
    let validContentItemId = null;
    let newAncestorItemIds = [];

    // If the first/last contentItem is a container item.
    if (containerItemValidator(contentItem, ancestorItemIds) === true) {
      // Search its children for the furthest valid contentItemId.
      ({
        contentItemId: validContentItemId,
        ancestorItemIds: newAncestorItemIds,
      } = findFurthestValidContentItemId(
        direction,
        contentItem.childItemIds,
        contentItemsById,
        contentItemValidator,
        containerItemValidator,
        ancestorItemIds.concat(contentItem.id),
      ));
    }

    // If no further valid contentItem was found in the list of children (or if the current
    // contentItem is not a container and there is no list of children) but the current contentItem
    // is a valid one.
    if (
      validContentItemId === null &&
      contentItemValidator(contentItem, ancestorItemIds) === true
    ) {
      // The current contentItem is the one we're looking for.
      validContentItemId = contentItem.id;
      newAncestorItemIds = ancestorItemIds;
    }

    return {
      contentItemId: validContentItemId,
      ancestorItemIds: newAncestorItemIds,
    };
  }
}

function findContentItemAncestorItemIds(
  contentItemId,
  slideContentItemIds,
  contentItemsById,
  ancestorItemIds = [],
) {
  let newAncestorItemIds;
  let siblingItem;
  let findResult;

  // Find the list of contentItems in which we're currently searching. If we're deeper in the
  // recursion and there is already a list of ancestorItemids, use the children of the last
  // ancestor; else use the list of contentItems that are direct children of the slide.
  const siblingItemIds = ancestorItemIds.length > 0
    ? contentItemsById[_.last(ancestorItemIds)].childItemIds
    : slideContentItemIds;

  // Iterate over the current list of contentItems and search the each of them + their descendants
  // for the contentItem with id $contentItemId.
  for (let i = 0; i < siblingItemIds.length; i += 1) {
    siblingItem = contentItemsById[siblingItemIds[i]];

    // If this item is the contentItem for which we're generating the ancestorItemIds array.
    if (siblingItem.id === contentItemId) {
      // The current ancestorItemsIds is the correct one, so return it.
      return ancestorItemIds;
    }
    // If this is a container item.
    else if (_.includes(containerContentItemTypes, siblingItem.contentItemType)) {
      // See if this is an ancestor; add it to the ancestorItemIds array...
      newAncestorItemIds = ancestorItemIds.concat(siblingItemIds[i]);
      // ... and search further.
      findResult = findContentItemAncestorItemIds(
        contentItemId,
        slideContentItemIds,
        contentItemsById,
        newAncestorItemIds,
      );
      // If the search returned a value different from null, we know that this siblingItem was
      // indeed an ancestor of the contentItem with id $contentItemId. The value in findResult now
      // equals the full ancestorItemIds array.
      if (findResult !== null) {
        return findResult;
      }
      // If the return value was null, we know that this siblingItem was not an ancestor of the
      // contentItem with id $contentItemId. We move on to the next siblingItem.
    }
  }

  // If the function hasn't returned by now, contentItem was not found in the current list of
  // contentItems.
  return null;
}

function findNearestValidAncestorItemId(
  ancestorItemIds,
  contentItemsById,
  ancestorItemValidator,
) {
  // If there are no ancestors left.
  if (ancestorItemIds.length === 0) {
    return null;
  }
  // If there are ancestors left.
  else {
    // Get the parentItem.
    const parentItemId = _.last(ancestorItemIds);
    const parentItem = contentItemsById[parentItemId];
    // Remove the parent from the ancestorItemIds.
    const newAncestorItemIds = _.dropRight(ancestorItemIds, 1);

    // Test if the parent is a valid ancestor.
    if (ancestorItemValidator(parentItem, newAncestorItemIds) === true) {
      return parentItem.id;
    }
    // If the parent was not a valid ancestor.
    else {
      // Go further up the ancestors list.
      return findNearestValidAncestorItemId(
        newAncestorItemIds,
        contentItemsById,
        ancestorItemValidator,
      );
    }
  }
}

function findContentItemDescendantItemIds(contentItemId, contentItemsById) {
  const contentItem = contentItemsById[contentItemId];
  let descendantItemIds = [];

  // If this contentItem is a container.
  if (
    Array.indexOf(
      containerContentItemTypes,
      contentItem.contentItemType,
    ) !== -1
  ) {
    // Add all of its children and their descendants to the array.
    contentItem.childItemIds.forEach((childItemId) => {
      descendantItemIds = descendantItemIds.concat(childItemId);
      descendantItemIds = descendantItemIds.concat(
        findContentItemDescendantItemIds(childItemId, contentItemsById),
      );
    });
  }

  return descendantItemIds;
}

// Exported functions ----------------------------------------------------------

/**
 * Finds the previous valid contentItem (in terms of tree leaves) as compared to the contentItem
 * with id $contentItemId. Validity is determined by a validator function.
 *
 * @param contentItemId
 *        The id of the contentItem where we start searching.
 * @param ancestorItemIds
 *        The list of ids of the ancestor items of the contentItem where we start searching.
 * @param slideContentItemIds
 *        The list of ids of contentItems that are direct children of the containing slide of the
 *        contentItem where we start searching. (We need this because the slide is the highest
 *        possible ancestor of a contentItem and it can't be included in the ancestorItemIds array.)
 * @param contentItemsById
 *        The contentItemsById object.
 * @param checkInitialContainerChildren
 *        If the contentItem with id $contentItemId is a container, this argument decides if its
 *        children are considered valid previous contentItems.
 * @param contentItemValidator
 *        The function that decides if a contentItem is considered 'valid'. It is passed a
 *        contentItem and its ancestorItemIds as arguments and should return TRUE if this
 *        contentItem is valid, FALSE if it is not.
 * @param containerItemValidator
 *        The function that decides if a contentItem is considered a container. It is passed a
 *        contentItem and its ancestorItemIds as arguments and should return TRUE if this
 *        contentItem is a container, FALSE if it is not. (The reason we use a validator function
 *        instead of just using the containerContentItemTypes constant is that for some applications
 *        lists should be considered containers, while for others they should not. By doing it this
 *        way, the caller of this function has full control over which contentItems are considered
 *        containers and which are not.
 *
 * @returns {{contentItemId, ancestorItemIds, checkContainerChildren}}
 */
export function getPreviousValidContentItemId(
  contentItemId,
  ancestorItemIds,
  slideContentItemIds,
  contentItemsById,
  checkInitialContainerChildren = false,
  contentItemValidator = (
    contentItem => _.includes(contentItemTypes, contentItem.contentItemType)
  ),
  containerItemValidator = (
    contentItem => _.includes(containerContentItemTypes, contentItem.contentItemType)
  ),
) {
  return findPreviousValidContentItemId(
    contentItemId,
    ancestorItemIds,
    slideContentItemIds,
    contentItemsById,
    checkInitialContainerChildren,
    contentItemValidator,
    containerItemValidator,
  );
}

/**
 * Finds the next valid contentItem (in terms of tree leaves) as compared to the contentItem with id
 * $contentItemId. Validity is determined by a validator function.
 *
 * @param contentItemId
 *        The id of the contentItem where we start searching.
 * @param ancestorItemIds
 *        The list of ids of the ancestor items of the contentItem where we start searching.
 * @param slideContentItemIds
 *        The list of ids of contentItems that are direct children of the containing slide of the
 *        contentItem where we start searching. (We need this because the slide is the highest
 *        possible ancestor of a contentItem and it can't be included in the ancestorItemIds array.)
 * @param contentItemsById
 *        The contentItemsById object.
 * @param checkInitialContainerChildren
 *        If the contentItem with id $contentItemId is a container, this argument decides if its
 *        children are considered valid previous contentItems.
 * @param contentItemValidator
 *        The function that decides if a contentItem is considered 'valid'. It is passed a
 *        contentItem and its ancestorItemIds as arguments and should return TRUE if this
 *        contentItem is valid, FALSE if it is not.
 * @param containerItemValidator
 *        The function that decides if a contentItem is considered a container. It is passed a
 *        contentItem and its ancestorItemIds as arguments and should return TRUE if this
 *        contentItem is a container, FALSE if it is not. (The reason we use a validator function
 *        instead of just using the containerContentItemTypes constant is that for some applications
 *        lists should be considered containers, while for others they should not. By doing it this
 *        way, the caller of this function has full control over which contentItems are considered
 *        containers and which are not.
 *
 * @returns {{contentItemId, ancestorItemIds, checkContainerChildren}}
 */
export function getNextValidContentItemId(
  contentItemId,
  ancestorItemIds,
  slideContentItemIds,
  contentItemsById,
  checkInitialContainerChildren = false,
  contentItemValidator = (
    contentItem => _.includes(contentItemTypes, contentItem.contentItemType)
  ),
  containerItemValidator = (
    contentItem => _.includes(containerContentItemTypes, contentItem.contentItemType)
  ),
) {
  return findNextValidContentItemId(
    contentItemId,
    ancestorItemIds,
    slideContentItemIds,
    contentItemsById,
    checkInitialContainerChildren,
    contentItemValidator,
    containerItemValidator,
  );
}

/**
 * Find the previous valid position to where the contentItem with id $contentItemId may be moved.
 * A position is defined by the id of the contentItem that precedes it ($positionItemId) and the
 * array of ids of its ancestors. If $positionItemId is NULL but $validPositionFound is TRUE, the
 * contentItem may be moved to index 0 in its parent (the last item in $positionItemAncestorIds).
 *
 * @param contentItemId
 *        The id of the contentItem we want to move to a new position.
 * @param ancestorItemIds
 *        The list of ids of the ancestor items of the contentItem with id $contentItemId.
 * @param slideContentItemIds
 *        The list of ids of contentItems that are direct children of the containing slide of the
 *        contentItem with id $contentItemId. (We need this because the slide is the highest
 *        possible ancestor of a contentItem and it can't be included in the ancestorItemIds array.)
 * @param contentItemsById
 *        The contentItemsById object.
 * @param positionValidator
 *        The function that decides if a position is a valid one. It is passed $contentItemId,
 *        $ancestorItemIds, $positionItemId, $positionItemAncestorItemIds, $slideContentItemIds and
 *        $contentItemsById as arguments and should return TRUE if the given position is a valid
 *        position for the contentItem with id $contentItemId, FALSE if it is not.
 * @param amountOfItemsToSkip
 *        An optional amount of items that the iterator should skip before returning a valid
 *        position. When seeking a previous valid position the default value is 1; this is necessery
 *        because if the id of the contentItem that directly precedes the contentItem with id
 *        $contentItemId is a valid one and we returned it, the contentItem would end up being moved
 *        directly after it (and thus end up not moving at all).
 *
 * @returns {{validPositionFound, positionItemId, positionItemAncestorItemIds}}
 */
export function getPreviousValidContentItemPosition(
  contentItemId,
  ancestorItemIds,
  slideContentItemIds,
  contentItemsById,
  positionValidator,
  amountOfItemsToSkip = 1,
) {
  return findPreviousValidContentItemPosition(
    contentItemId,
    ancestorItemIds,
    slideContentItemIds,
    contentItemsById,
    positionValidator,
    amountOfItemsToSkip,
  );
}

/**
 * Find the previous valid position to where the contentItem with id $contentItemId may be moved.
 * A position is defined by the id of the contentItem that precedes it ($positionItemId) and the
 * array of ids of its ancestors. If $positionItemId is NULL but $validPositionFound is TRUE, the
 * contentItem may be moved to index 0 in its parent (the last item in $positionItemAncestorIds).
 *
 * @param contentItemId
 *        The id of the contentItem we want to move to a new position.
 * @param ancestorItemIds
 *        The list of ids of the ancestor items of the contentItem with id $contentItemId.
 * @param slideContentItemIds
 *        The list of ids of contentItems that are direct children of the containing slide of the
 *        contentItem with id $contentItemId. (We need this because the slide is the highest
 *        possible ancestor of a contentItem and it can't be included in the ancestorItemIds array.)
 * @param contentItemsById
 *        The contentItemsById object.
 * @param positionValidator
 *        The function that decides if a position is a valid one. It is passed $contentItemId,
 *        $ancestorItemIds, $positionItemId, $positionItemAncestorItemIds, $slideContentItemIds and
 *        $contentItemsById as arguments and should return TRUE if the given position is a valid
 *        position for the contentItem with id $contentItemId, FALSE if it is not.
 * @param amountOfItemsToSkip
 *        An optional amount of items that the iterator should skip before returning a valid
 *        position. When seeking a next valid position, the default value is 0.
 *
 * @returns {{validPositionFound, positionItemId, positionItemAncestorItemIds}}
 */
export function getNextValidContentItemPosition(
  contentItemId,
  ancestorItemIds,
  slideContentItemIds,
  contentItemsById,
  positionValidator,
  amountOfItemsToSkip = 0,
) {
  return findNextValidContentItemPosition(
    contentItemId,
    ancestorItemIds,
    slideContentItemIds,
    contentItemsById,
    positionValidator,
    amountOfItemsToSkip,
  );
}

/**
 * Finds the first valid contentItemId in a list of contentItems. The 'first' valid contentItem is
 * a valid contentItem that lies on the 'first' path of the contentItem tree (the path that consists
 * of the first child of the first child of the first child...) and is as far as possible removed
 * from the root of the tree. Validity is determined by a validator function.
 *
 * @param contentItemIds
 *        The list of contentItemIds in which we start searching.
 * @param contentItemsById
 *        The contentItemsById object.
 * @param contentItemValidator
 *        The function that decides if a contentItem is considered 'valid'. It is passed a
 *        contentItem and its ancestorItemIds as arguments and should return TRUE if this
 *        contentItem is valid, FALSE if it is not.
 * @param containerItemValidator
 *        The function that decides if a contentItem is considered a container. It is passed a
 *        contentItem and its ancestorItemIds as arguments and should return TRUE if this
 *        contentItem is a container, FALSE if it is not. (The reason we use a validator function
 *        instead of just using the containerContentItemTypes constant is that for some applications
 *        lists should be considered containers, while for others they should not. By doing it this
 *        way, the caller of this function has full control over which contentItems are considered
 *        containers and which are not.
 *
 * @returns {{contentItemId, ancestorItemIds}}
 */
export function getFirstValidContentItemId(
  contentItemIds,
  contentItemsById,
  contentItemValidator,
  containerItemValidator,
) {
  return findFurthestValidContentItemId(
    directions.UP,
    contentItemIds,
    contentItemsById,
    contentItemValidator,
    containerItemValidator,
  );
}

/**
 * Finds the last valid contentItemId in a list of contentItems. The 'last' valid contentItem is
 * a valid contentItem that lies on the 'last' path of the contentItem tree (the path that consists
 * of the last child of the last child of the last child...) and is as far as possible removed from
 * the root of the tree. Validity is determined by a validator function.
 *
 * @param contentItemIds
 *        The list of contentItemIds in which we start searching.
 * @param contentItemsById
 *        The contentItemsById object.
 * @param contentItemValidator
 *        The function that decides if a contentItem is considered 'valid'. It is passed a
 *        contentItem and its ancestorItemIds as arguments and should return TRUE if this
 *        contentItem is valid, FALSE if it is not.
 * @param containerItemValidator
 *        The function that decides if a contentItem is considered a container. It is passed a
 *        contentItem and its ancestorItemIds as arguments and should return TRUE if this
 *        contentItem is a container, FALSE if it is not. (The reason we use a validator function
 *        instead of just using the containerContentItemTypes constant is that for some applications
 *        lists should be considered containers, while for others they should not. By doing it this
 *        way, the caller of this function has full control over which contentItems are considered
 *        containers and which are not.
 *
 * @returns {{contentItemId, ancestorItemIds}}
 */
export function getLastValidContentItemId(
  contentItemIds,
  contentItemsById,
  contentItemValidator,
  containerItemValidator,
) {
  return findFurthestValidContentItemId(
    directions.DOWN,
    contentItemIds,
    contentItemsById,
    contentItemValidator,
    containerItemValidator,
  );
}

/**
 * Finds the ancestor items array of the contentItem with $contentItemId.
 * Note: avoid using this function if other methods to get the ancestorItemIds are available (for
 * example by saving them while creating the contentItem and then passing them to the function that
 * needs them) since it is very inefficient to traverse the contentItems tree every time an ancestor
 * item is needed.
 *
 * @param contentItemId
 *        The id of the contentItem for which we need to find the ancestor item ids.
 * @param slideContentItemIds
 *        The list of ids of contentItems that are direct children of the containing slide of the
 *        contentItem with id $contentItemId.
 * @param contentItemsById
 *        The contentItemsById object.
 *
 * @returns {string[]}
 */
export function getContentItemAncestorItemIds(
  contentItemId,
  slideContentItemIds,
  contentItemsById,
) {
  return findContentItemAncestorItemIds(
    contentItemId,
    slideContentItemIds,
    contentItemsById,
  );
}

/**
 * Finds the nearest valid ancestorItem starting from the parentItem and progressively moving up in
 * the tree. Validity is determined by a validator function.
 *
 * @param ancestorItemIds
 *        The list of ids of the ancestor items of the contentItem where we start searching.
 * @param contentItemsById
 *        The contentItemsById object.
 * @param ancestorItemValidator
 *        The function that decides if an ancestorItem is considered 'valid'. It is passed a
 *        contentItem and its ancestorItemIds as arguments and should return TRUE if this
 *        contentItem is valid, FALSE if it is not.
 *
 * @returns {string|null}
 */
export function getNearestValidAncestorItemId(
  ancestorItemIds,
  contentItemsById,
  ancestorItemValidator,
) {
  return findNearestValidAncestorItemId(
    ancestorItemIds,
    contentItemsById,
    ancestorItemValidator,
  );
}

/**
 * Finds all descendants of a the contentItem with id $contentItemId.
 *
 * @param contentItemId
 *        The id of the contentItem where we start searching.
 * @param contentItemsById
 *        The contentItemsById object.
 *
 * @returns {string[]}
 */
export function getContentItemDescendantItemIds(
  contentItemId,
  contentItemsById,
) {
  return findContentItemDescendantItemIds(
    contentItemId,
    contentItemsById,
  );
}

/**
 * Finds the list of siblingItemIds for the contentItem with id $contentItemId, and the index of
 * this contentItem's id in this list.
 *
 * @param contentItemId
 *        The id of the contentItem for which we want the siblingItemIds & index.
 * @param ancestorItemIds
 *        The list of ids of the ancestor items of the contentItem with id $contentItemId.
 * @param slideContentItemIds
 *        The list of ids of contentItems that are direct children of the containing slide of the
 *        contentItem with id $contentItemId. (We need this because the slide is the highest
 *        possible ancestor of a contentItem and it can't be included in the ancestorItemIds array.)
 * @param contentItemsById
 *        The contentItemsById object.
 *
 * @returns {{siblingItemIds: (Array|*), indexInSiblingItemIds}}
 */
export function getContentItemSiblingItemIdsAndIndex(
  contentItemId,
  ancestorItemIds,
  slideContentItemIds,
  contentItemsById,
) {
  return findContentItemSiblingItemIdsAndIndex(
    contentItemId,
    ancestorItemIds,
    slideContentItemIds,
    contentItemsById,
  );
}
