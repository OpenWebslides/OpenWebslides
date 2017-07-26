import { createSelector } from 'reselect';

// Returns a contentItem object containing its nested children.
function nestChildItemsInsideContentItem(contentItem, contentItemsById) {
  let result;

  // If the contentItem has child items.
  if (
    contentItem.childItemIds instanceof Array &&
    contentItem.childItemIds.length > 0
  ) {
    // Get the nested children + descendants.
    const children = contentItem.childItemIds.map(childItemId =>
      nestChildItemsInsideContentItem(
        contentItemsById[childItemId],
        contentItemsById,
      ),
    );
    // Merge the contentItem object with the children array.
    result = {
      ...contentItem,
      children,
    };
  }
  // If the contentItem does not have child items.
  else {
    // Simply return the contentItem unchanged.
    result = contentItem;
  }

  return result;
}

// Get the contentItems.byId object.
export const getContentItemsById = state => state.entities.contentItems.byId;

// Get the single contentItem that matches $id.
export const getContentItemById = (state, id) => state.entities.contentItems.byId[id];

// Get the single contentItem that matches $id, with its child contentItem
// objects nested inside it.
export const getNestedContentItemObjectById = createSelector(
  [getContentItemsById, getContentItemById],
  (contentItemsById, contentItem) =>
    // Note: this selector is for debugging purposes only.
    nestChildItemsInsideContentItem(contentItem, contentItemsById),
);
