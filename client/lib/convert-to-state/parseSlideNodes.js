import _ from 'lodash';
import { contentItemTypes, containerContentItemTypes } from 'constants/contentItemTypes';
import { slideViewTypes } from 'constants/slideViewTypes';

import { generateSlideId, generateContentItemId } from './generateIds';
import parseInlineProperties from './parseInlineProperties';

const headingNodeNames = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
const plaintextNodeNames = [...headingNodeNames, 'P', 'LI'];
const listNodeNames = ['UL', 'OL'];
const sectionNodeNames = ['SECTION', 'ASIDE', 'DIV'];
const containerNodeNames = [...listNodeNames, ...sectionNodeNames];
const imageContentItemTypes = [
  contentItemTypes.ILLUSTRATIVE_IMAGE,
  contentItemTypes.DECORATIVE_IMAGE,
];

function addImplicitSections(
  slideId,
  contentItemIds,
  contentItemsById,
  contentItemSequence,
  parentIsSection = false,
) {
  // Note: this is far from the most efficient way of adding containers; I tried to prioritize
  // readability.
  // Also note: this breaks the 'sequence' of contentItem ids; this shouldn't be a big problem as we
  // will have to replace these by more permanent ids at some point in the future anyway.

  let newContentItemIds = [];
  let newContentItemsById = contentItemsById;
  let newContentItemSequence = contentItemSequence;

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
    contentItem = contentItemsById[contentItemIds[i]];

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
        contentItemsById: newContentItemsById,
        contentItemSequence: newContentItemSequence,
      } = addImplicitSections(
        slideId,
        sectionContentIds,
        newContentItemsById,
        newContentItemSequence,
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
        newContentItemsById[contentItemIds[0]].contentItemType === contentItemTypes.TITLE
      ) {
        // Just directly use the processed subContentItemIds without adding a section.
        // Note: the loop ends here, so these are immediately returned.
        newContentItemIds = subContentItemIds;
      }
      else {
        // Create a new section and add the heading + contents to it.
        sectionItem = {
          id: generateContentItemId(slideId, newContentItemSequence),
          contentItemType: contentItemTypes.SECTION,
          viewtype: slideViewTypes.LIVE,
          childItemIds: subContentItemIds,
        };
        newContentItemIds.push(sectionItem.id);
        newContentItemsById[sectionItem.id] = sectionItem;
        newContentItemSequence += 1;
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
        newContentItemsById[contentItem.id] = contentItem;
      }

      // If the contentItem is a container, recursively process it's contents.
      if (_.includes(containerContentItemTypes, contentItem.contentItemType)) {
        ({
          contentItemIds: subContentItemIds,
          contentItemsById: newContentItemsById,
          contentItemSequence: newContentItemSequence,
        } = addImplicitSections(
          slideId,
          contentItem.childItemIds,
          newContentItemsById,
          newContentItemSequence,
          true,
        ));
        contentItem.childItemIds = subContentItemIds;
        newContentItemsById[contentItem.id] = contentItem;
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
    contentItemsById: newContentItemsById,
    contentItemSequence: newContentItemSequence,
  };
}

function addImageContainers(
  slideId,
  contentItemIds,
  contentItemsById,
  contentItemSequence,
) {
  const newContentItemIds = [];
  let newContentItemsById = contentItemsById;
  let newContentItemSequence = contentItemSequence;

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
    contentItem = contentItemsById[contentItemIds[i]];

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
        id: generateContentItemId(slideId, newContentItemSequence),
        contentItemType: contentItemTypes.IMAGE_CONTAINER,
        viewtype: slideViewTypes.LIVE,
        childItemIds: containerContentIds,
      };
      newContentItemIds.push(containerItem.id);
      newContentItemsById[containerItem.id] = containerItem;
      newContentItemSequence += 1;

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
          contentItemsById: newContentItemsById,
          contentItemSequence: newContentItemSequence,
        } = addImageContainers(
          slideId,
          contentItem.childItemIds,
          newContentItemsById,
          newContentItemSequence,
        ));
        contentItem.childItemIds = subContentItemIds;
        newContentItemsById[contentItem.id] = contentItem;
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
    contentItemsById: newContentItemsById,
    contentItemSequence: newContentItemSequence,
  };
}

function processContentItems(
  slideId,
  contentItemIds,
  contentItemsById,
) {
  let newContentItemIds = contentItemIds;
  let newContentItemsById = contentItemsById;
  let newContentItemSequence = Object.keys(contentItemsById).length;

  ({
    contentItemIds: newContentItemIds,
    contentItemsById: newContentItemsById,
    contentItemSequence: newContentItemSequence,
  } = addImplicitSections(
    slideId,
    newContentItemIds,
    newContentItemsById,
    newContentItemSequence,
  ));

  ({
    contentItemIds: newContentItemIds,
    contentItemsById: newContentItemsById,
    contentItemSequence: newContentItemSequence,
  } = addImageContainers(
    slideId,
    newContentItemIds,
    newContentItemsById,
    newContentItemSequence,
  ));

  return {
    contentItemIds: newContentItemIds,
    contentItemsById: newContentItemsById,
    contentItemSequence: newContentItemSequence,
  };
}

function parseTextContent(textContent, trim = true) {
  if (trim) {
    return textContent.replace(/\s+/g, ' ').trim();
  }
  return textContent;
}

function parseContentItemNode(
  node,
  slideId,
  contentItemSequence,
  assetLinks,
) {
  const emptyResult = {
    contentItemIds: [],
    contentItemsById: {},
  };
  if (node.outerHTML === undefined) return emptyResult;

  const { nodeName, childNodes, children, textContent, className } = node;
  const contentItemId = generateContentItemId(slideId, contentItemSequence);
  let contentItemsById = {};
  let contentItemIds = [];
  let contentItem = { id: contentItemId };
  let childItemIds = [];
  let childItemsById = {};
  let i;

  contentItem.viewType = node.dataset.viewType
    ? node.dataset.viewType.toUpperCase()
    : slideViewTypes.LIVE;

  // SECTION, ASIDE, LIST, etc.
  if (Array.indexOf(containerNodeNames, nodeName) !== -1) {
    // Add contentItemType + custom properties for different contentItemTypes.
    if (Array.indexOf(listNodeNames, nodeName) !== -1) {
      // Verify that all children are list items.
      // #TODO move this to step two
      i = 0;
      while (i < children.length && children[i].nodeName === 'LI') {
        i += 1;
      }
      if (i !== children.length) return emptyResult;

      contentItem = {
        ...contentItem,
        contentItemType: contentItemTypes.LIST,
        ordered: nodeName === 'OL',
      };
    }
    else if (nodeName === 'ASIDE') {
      contentItem = {
        ...contentItem,
        contentItemType: contentItemTypes.ASIDE,
      };
    }
    else if (nodeName === 'SECTION') {
      contentItem = {
        ...contentItem,
        contentItemType: contentItemTypes.SECTION,
      };
    }
    else if (nodeName === 'DIV' && className === 'ows-image-container') {
      contentItem = {
        ...contentItem,
        contentItemType: contentItemTypes.IMAGE_CONTAINER,
      };
    }
    else {
      console.error(`Unrecognized container node name: ${nodeName}`);
      contentItem = null;
    }

    // Parse container childrenItems.
    ({
      contentItemIds: childItemIds,
      contentItemsById: childItemsById,
    } = parseContentItemNodes(
      children,
      slideId,
      contentItem === null ? contentItemSequence : contentItemSequence + 1,
      assetLinks,
    ));

    // If the contentItem was a valid container.
    if (contentItem !== null) {
      // Add childItemIds to contentItem.
      contentItem = {
        ...contentItem,
        childItemIds,
      };
    }
    // If the contentItem was not a valid container.
    else {
      // Directly return the children without their container.
      contentItemIds = childItemIds;
    }
  }
  // P, LI, H1, H2, ...
  else if (Array.indexOf(plaintextNodeNames, nodeName) !== -1) {
    // Add contentItemType.
    if (Array.indexOf(headingNodeNames, nodeName) !== -1) {
      contentItem = {
        ...contentItem,
        contentItemType: contentItemTypes.TITLE,
        // Temporary property; will be deleted after the second pass.
        headingLevel: nodeName.slice(-1),
      };
    }
    else if (nodeName === 'LI') {
      contentItem = {
        ...contentItem,
        contentItemType: contentItemTypes.LIST_ITEM,
      };
    }
    else if (nodeName === 'P') {
      contentItem = {
        ...contentItem,
        contentItemType: contentItemTypes.PARAGRAPH,
      };
    }
    else {
      console.error(`Unrecognized plain text node name: ${nodeName}`);
      contentItem = null;
    }

    if (contentItem !== null) {
      // Add text + inlineProperties.
      contentItem = {
        ...contentItem,
        text: parseTextContent(textContent),
        inlineProperties: parseInlineProperties(childNodes),
      };
    }
  }
  // IMG
  else if (nodeName === 'IMG') {
    const assetId = assetLinks[node.dataset.id];
    const contentItemType = contentItemTypes.DECORATIVE_IMAGE;
    const alt = node.alt;
    let properties;

    if (assetId) {
      properties = {
        src: assetLinks[node.dataset.id].src,
        filename: assetLinks[node.dataset.id].filename,
        dataId: node.dataset.id };
    }
    else {
      properties = {
        src: node.src,
      };
    }

    contentItem = { ...contentItem, ...properties, alt, contentItemType };
  }
  // FIGURE
  else if (nodeName === 'FIGURE') {
    const imgNode = node.children[0];
    const caption = node.children[1] ? node.children[1].textContent : '[No caption found]';
    const assetId = assetLinks[imgNode.dataset.id];
    const contentItemType = contentItemTypes.ILLUSTRATIVE_IMAGE;
    const alt = imgNode.alt;
    let properties;

    if (assetId) {
      properties = {
        src: assetLinks[imgNode.dataset.id].src,
        filename: assetLinks[imgNode.dataset.id].filename,
        dataId: imgNode.dataset.id };
    }
    else {
      properties = {
        src: imgNode.src,
      };
    }

    contentItem = { ...contentItem, ...properties, alt, contentItemType, caption };
  }
  // IFRAME
  else if (nodeName === 'IFRAME') {
    contentItem = {
      ...contentItem,
      contentItemType: contentItemTypes.IFRAME,
      src: node.src,
    };
  }
  // Skip unrecognized nodeNames.
  else {
    console.error(`Unrecognized node name: ${nodeName}`);
    return emptyResult;
  }

  // If the node produced a valid contentItem.
  if (contentItem !== null) {
    // This is the only id we will return (as children will have been added to the contentItem).
    contentItemIds = [contentItemId];
    // Add the contentItem to the byId object.
    contentItemsById[contentItemId] = contentItem;
  }

  // Merge new content items and child content items into a single byId object.
  contentItemsById = {
    ...contentItemsById,
    ...childItemsById,
  };

  return {
    contentItemIds,
    contentItemsById,
  };
}

function parseContentItemNodes(
  nodeList,
  slideId,
  startContentItemSequence,
  assetLinks,
) {
  let contentItemIds = [];
  let contentItemsById = {};

  let newContentItemIds;
  let newContentItemsById;
  let contentItemSequence = startContentItemSequence;

  Array.from(nodeList).forEach((node) => {
    // Parse this node into a contentItem and get the new contentItem id(s) +
    // the byId object of this + all child contentItems.
    ({
      contentItemIds: newContentItemIds,
      contentItemsById: newContentItemsById,
    } = parseContentItemNode(
      node,
      slideId,
      contentItemSequence,
      assetLinks,
    ));

    // If the node was correctly parsed.
    if (newContentItemIds.length > 0) {
      // Update the contentItem sequence counter.
      contentItemSequence += Object.keys(newContentItemsById).length;
      // Merge its byId object with the larger byId object.
      contentItemsById = {
        ...contentItemsById,
        ...newContentItemsById,
      };
      // Add its id(s) to the slide ids list.
      contentItemIds = contentItemIds.concat(newContentItemIds);
    }
  });

  return {
    contentItemIds,
    contentItemsById,
  };
}

export default function parseSlideNodes(deckId, nodes, assetLinks) {
  const slidesById = {};
  let contentItemsById = {};

  let slideSequence = 0;
  let slideId;
  let slideLevel;

  let contentItemSequence;
  let newContentItemIds;
  let newContentItemsById;

  // Return a deck with one empty slide when no existing slides are present
  if (nodes.length === 0) {
    slideId = generateSlideId(deckId, slideSequence);
    slidesById[slideId] = {
      id: slideId,
      meta: {},
      level: 0,
      contentItemIds: [],
      contentItemSequence: 0,
    };
    slideSequence += 1;
  }
  else {
    nodes.forEach((node) => {
      slideId = generateSlideId(deckId, slideSequence);
      slideLevel = node.dataset.level ? parseInt(node.dataset.level, 10) : 0;
      ({
        contentItemIds: newContentItemIds,
        contentItemsById: newContentItemsById,
      } = parseContentItemNodes(
        node.children,
        slideId,
        0,
        assetLinks,
      ));

      ({
        contentItemIds: newContentItemIds,
        contentItemsById: newContentItemsById,
        contentItemSequence,
      } = processContentItems(
        slideId,
        newContentItemIds,
        newContentItemsById,
      ));

      slidesById[slideId] = {
        id: slideId,
        meta: {},
        level: slideLevel,
        contentItemIds: newContentItemIds,
        contentItemSequence,
      };

      contentItemsById = {
        ...contentItemsById,
        ...newContentItemsById,
      };

      slideSequence += 1;
    });
  }

  return {
    slidesById,
    contentItemsById,
  };
}
