import _ from 'lodash';

import { contentItemTypes, imageContentItemTypes, containerContentItemTypes }
  from 'constants/contentItemTypes';
import { slideViewTypes } from 'constants/slideViewTypes';

import parseContentItemTypeNodeFunctions from './parseContentItemTypeNodeFunctions';
import { generateContentItemId } from '../helpers/generateIds';

function addImplicitSections(
  contentItemIds,
  contentItemsById,
  slideId,
  contentItemSequence,
  parentIsSection = false,
) {
  // Note: this is far from the most efficient way of adding containers; I tried to prioritize
  // readability.
  // Also note: this breaks the 'sequence' of contentItem ids; this shouldn't be a big problem as we
  // will have to replace these by more permanent ids at some point in the future anyway.

  let copiedContentItemSequence = contentItemSequence;
  let copiedContentItemsById = { ...contentItemsById };
  let newContentItemIds = [];

  let sectionContentIds = [];
  let sectionLevel = -1;
  let atLeastOneSectionAdded = false;

  let contentItem;
  let sectionItem;
  let subContentItemIds;

  // Iterate through all contentItems in contentItemIds.
  // Note: we actually go 1 past the last id in contentItemIds (because of the '<=') because if a
  // section runs untill the end of the list, we still need to process it.
  for (let i = 0; i <= contentItemIds.length; i += 1) {
    // Put the contentItem in a variable for easier access.
    // (This will be undefined if i === contentItemIds.length.)
    contentItem = copiedContentItemsById[contentItemIds[i]];

    // Check if we need to end the current section.
    if (
      // If there is a current section
      sectionLevel !== -1 &&
      ( // and if we're past the last contentItem,
        // or this contentItem is a heading of a <= level than the current section.
        i === contentItemIds.length ||
        (
          contentItem.contentItemType === contentItemTypes.TITLE &&
          contentItem.headingLevel <= sectionLevel
        )
      )
    ) {
      // Recursively process the section contents (i.e. add deeper level headings).
      ({
        contentItemIds: subContentItemIds,
        entities: { contentItemsById: copiedContentItemsById },
        options: { contentItemSequence: copiedContentItemSequence },
      } = addImplicitSections(
        sectionContentIds,
        copiedContentItemsById,
        slideId,
        copiedContentItemSequence,
        true,
      ));

      // If the parent of the current list of contentItemIds is already a section, it's possible
      // that we would be adding only a single subsection; thereby creating a useless nested
      // section. In this case, just directly return the list of contentItems without wrapping them
      // in a section.
      if (
        // If the parent is already a section (this is passed as a function argument)
        parentIsSection &&
        // and we're at this point in the code because we've processed the last contentItem
        i === contentItemIds.length &&
        // and we haven't add any section before this (meaning that there is exactly one heading)
        !atLeastOneSectionAdded &&
        // and that one heading was the first item in the list.
        copiedContentItemsById[contentItemIds[0]].contentItemType === contentItemTypes.TITLE
      ) {
        // Just directly use the processed subContentItemIds without adding a section.
        // Note: the loop ends here, so these are immediately returned.
        newContentItemIds = subContentItemIds;
      }
      else {
        // Create a new section and add the heading + contents to it.
        sectionItem = {
          id: generateContentItemId(slideId, copiedContentItemSequence),
          contentItemType: contentItemTypes.SECTION,
          viewType: slideViewTypes.LIVE,
          childItemIds: subContentItemIds,
        };
        newContentItemIds.push(sectionItem.id);
        copiedContentItemsById[sectionItem.id] = sectionItem;
        copiedContentItemSequence += 1;
        atLeastOneSectionAdded = true;

        // Reset variables to allow the next section to start.
        sectionContentIds = [];
        sectionLevel = -1;
      }
    }

    // This code only needs to be executed if there is a contentItem left to process;
    // i.e. if i is a valid index for contentItemIds.
    if (i < contentItemIds.length) {
      // Check if we need to start a new section.
      if (
        // If there is no section already in progress
      // (note: deeper sections are handled recursively; no need to handle nested sections here)
      sectionLevel === -1 &&
      // and if this contentItem is an unprocessed title.
      contentItem.contentItemType === contentItemTypes.TITLE &&
      'headingLevel' in contentItem
      ) {
        // Save the headingLevel; this allows us to end the section if we encounter a contentItem of
        // the same or lower level.
        sectionLevel = contentItem.headingLevel;

        // Remove headingLevel to indicate this title has already been processed;
        // note that we don't need this property anymore after proper sections have been added,
        // because the level is determined by section nesting instead.
        delete contentItem.headingLevel;
        copiedContentItemsById[contentItem.id] = contentItem;
      }

      // If the contentItem is a container, recursively process it's contents.
      if (_.includes(containerContentItemTypes, contentItem.contentItemType)) {
        ({
          contentItemIds: subContentItemIds,
          entities: { contentItemsById: copiedContentItemsById },
          options: { contentItemSequence: copiedContentItemSequence },
        } = addImplicitSections(
          contentItem.childItemIds,
          copiedContentItemsById,
          slideId,
          copiedContentItemSequence,
          true,
        ));
        contentItem.childItemIds = subContentItemIds;
        copiedContentItemsById[contentItem.id] = contentItem;
      }

      // Either add the current contentItem to the section in progress (if there is one) ...
      if (sectionLevel > 0) {
        sectionContentIds.push(contentItem.id);
      }
      // ... or to the general contentItemIds list.
      else {
        newContentItemIds.push(contentItem.id);
      }
    }
  }

  return {
    contentItemIds: newContentItemIds,
    entities: { contentItemsById: copiedContentItemsById },
    options: { contentItemSequence: copiedContentItemSequence },
  };
}

function addImageContainers(contentItemIds, contentItemsById, slideId, contentItemSequence) {
  let copiedContentItemSequence = contentItemSequence;
  let copiedContentItemsById = { ...contentItemsById };
  const newContentItemIds = [];

  let containerContentIds = [];
  let containerInProgressType = false;

  let contentItem;
  let containerItem;
  let subContentItemIds;

  // Iterate through all contentItems in contentItemIds.
  // Note: we actually go 1 past the last id in contentItemIds (because of the '<=') because if a
  // container runs untill the end of the list, we still need to process it.
  for (let i = 0; i <= contentItemIds.length; i += 1) {
    // Put the contentItem in a variable for easier access.
    // (This will be undefined if i === contentItemIds.length.)
    contentItem = copiedContentItemsById[contentItemIds[i]];

    // #TODO throw away container children that are not images of the correct type

    // Check if we need to end the current container.
    if (
      // If there is a current section
      containerInProgressType !== false &&
      ( // and if we're past the last contentItem,
        // or this contentItem not an image of the correct type.
        i === contentItemIds.length || contentItem.contentItemType !== containerInProgressType
      )
    ) {
      // Create a new image-container and add the images to it.
      containerItem = {
        id: generateContentItemId(slideId, copiedContentItemSequence),
        contentItemType: contentItemTypes.IMAGE_CONTAINER,
        viewType: slideViewTypes.LIVE,
        childItemIds: containerContentIds,
        imageType: containerInProgressType,
      };
      newContentItemIds.push(containerItem.id);
      copiedContentItemsById[containerItem.id] = containerItem;
      copiedContentItemSequence += 1;

      // Reset variables to allow the next section to start.
      containerContentIds = [];
      containerInProgressType = false;
    }

    // This code only needs to be executed if there is a contentItem left to process;
    // i.e. if i is a valid index for contentItemIds.
    if (i < contentItemIds.length) {
      // Check if we need to start a new container.
      if (
        // If there is no container already in progress
        containerInProgressType === false &&
        // and if this contentItem is an image.
        _.includes(imageContentItemTypes, contentItem.contentItemType)
      ) {
        // Save the image type; this allows us to know when to end the image container.
        containerInProgressType = contentItem.contentItemType;
      }

      // If the contentItem is a container, recursively process it's contents.
      if (_.includes(containerContentItemTypes, contentItem.contentItemType)) {
        ({
          contentItemIds: subContentItemIds,
          entities: { contentItemsById: copiedContentItemsById },
          options: { contentItemSequence: copiedContentItemSequence },
        } = addImageContainers(
          contentItem.childItemIds,
          copiedContentItemsById,
          slideId,
          copiedContentItemSequence,
        ));
        contentItem.childItemIds = subContentItemIds;
        copiedContentItemsById[contentItem.id] = contentItem;
      }

      // Either add the current contentItem to the container in progress (if there is one) ...
      if (containerInProgressType !== false) {
        containerContentIds.push(contentItem.id);
      }
      // ... or to the general contentItemIds list.
      else {
        newContentItemIds.push(contentItem.id);
      }
    }
  }

  return {
    contentItemIds: newContentItemIds,
    entities: { contentItemsById: copiedContentItemsById },
    options: { contentItemSequence: copiedContentItemSequence },
  };
}

export function processContentItems(
  contentItemIds,
  contentItemsById,
  slideId,
  contentItemSequence,
) {
  let copiedContentItemSequence = contentItemSequence;
  let copiedContentItemIds = [...contentItemIds];
  let copiedContentItemsById = { ...contentItemsById };

  ({
    contentItemIds: copiedContentItemIds,
    entities: { contentItemsById: copiedContentItemsById },
    options: { contentItemSequence: copiedContentItemSequence },
  } = addImplicitSections(
    copiedContentItemIds,
    copiedContentItemsById,
    slideId,
    copiedContentItemSequence,
  ));

  ({
    contentItemIds: copiedContentItemIds,
    entities: { contentItemsById: copiedContentItemsById },
    options: { contentItemSequence: copiedContentItemSequence },
  } = addImageContainers(
    copiedContentItemIds,
    copiedContentItemsById,
    slideId,
    copiedContentItemSequence,
  ));

  return {
    contentItemIds: copiedContentItemIds,
    entities: { contentItemsById: copiedContentItemsById },
    options: { contentItemSequence: copiedContentItemSequence },
  };
}

function parseContentItemNodes(
  parentNode,
  assetLinks,
  contentItemsById,
  slideId,
  contentItemSequence,
) {
  let copiedContentItemSequence = contentItemSequence;
  let copiedContentItemsById = contentItemsById;

  const contentItemIds = [];
  let newContentItemsById;
  let newContentItem;
  let newContentItemIds;
  let i;

  [...parentNode.children].forEach((contentItemNode) => {
    i = 0;
    newContentItem = null;
    newContentItemIds = null;
    while (
      i < parseContentItemTypeNodeFunctions.length &&
      newContentItem === null &&
      newContentItemIds === null
    ) {
      ({
        contentItem: newContentItem,
        contentItemIds: newContentItemIds,
        entities: { contentItemsById: newContentItemsById },
        options: { contentItemSequence: copiedContentItemSequence },
      } = parseContentItemTypeNodeFunctions[i](
        contentItemNode,
        assetLinks,
        {},
        copiedContentItemsById,
        slideId,
        copiedContentItemSequence,
      ));
      i += 1;
    }

    if (newContentItem === null && newContentItemIds === null) {
      console.error(`Unrecognized node name: "${contentItemNode.nodeName}" with class: "${contentItemNode.className}"`);
    }
    else {
      // If a single contentItem was returned.
      if (newContentItemIds === null) {
        contentItemIds.push(newContentItem.id);
        copiedContentItemsById[newContentItem.id] = newContentItem;
      }
      // If contentItemIds were returned.
      else {
        contentItemIds.push(...newContentItemIds);
      }

      copiedContentItemsById = {
        ...copiedContentItemsById,
        ...newContentItemsById,
      };
    }
  });

  return {
    contentItemIds,
    entities: { contentItemsById: copiedContentItemsById },
    options: { contentItemSequence: copiedContentItemSequence },
  };
}

export default parseContentItemNodes;
