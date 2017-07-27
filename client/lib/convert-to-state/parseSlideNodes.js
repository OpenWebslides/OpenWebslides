/* eslint-disable no-case-declarations */
import _ from 'lodash';
import { contentItemTypes } from 'constants/contentItemTypes';
import { slideViewTypes } from 'constants/slideViewTypes';

import { generateSlideId, generateContentItemId } from './generateIds';
import parseInlineProperties from './parseInlineProperties';

const headingNodeNames = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
const plaintextNodeNames = [...headingNodeNames, 'P', 'LI'];
const listNodeNames = ['UL', 'OL'];
const sectionNodeNames = ['SECTION', 'ASIDE'];
const containerNodeNames = [...listNodeNames, ...sectionNodeNames];

function checkAddFirstChildHeadingToImplicitSection(nodeList, parentIsSection) {
  // Given a nodelist, it's possible that
  // a) its parent node is an existing section, and
  // b) the first node is a heading and it's the only heading of its level in its parent section.
  // In this specific case, wrapping the first-child heading + its content in an implicit section would result in two
  // levels of sections (with no other siblings) which is pointless. This function checks if we are in this situation
  // and returns FALSE if so.
  let addFirstChildHeadingToImplicitSection;

  // If the first node is not a heading.
  if (!parentIsSection || nodeList.length === 0 || Array.indexOf(headingNodeNames, nodeList[0].nodeName) === -1) {
    addFirstChildHeadingToImplicitSection = true;
  }
  // If the first node is a heading.
  else {
    // Check if it's the only heading of its level in this nodeList.
    let i = 1;
    while (i < nodeList.length && nodeList[i].nodeName !== nodeList[0].nodeName) {
      i++;
    }
    // If another heading of the same level was found, an implicit section needs to be added.
    addFirstChildHeadingToImplicitSection = i !== nodeList.length;
  }

  return addFirstChildHeadingToImplicitSection;
}

function parseTextContent(textContent, trim = true) {
  if (trim) {
    return textContent.replace(/\s+/g, ' ').trim();
  }
  return textContent;
}

function parseContentItemNode(node, slideId, contentItemSequence) {
  const emptyResult = {
    contentItemId: null,
    contentItemsById: {},
  };
  if (node.outerHTML === undefined) return emptyResult;

  const { nodeName, childNodes, children, textContent } = node;
  const contentItemId = generateContentItemId(slideId, contentItemSequence);
  let contentItem = { id: contentItemId };
  let childItemIds = [];
  let childItemsById = {};
  let i;

  const viewType = node.dataset.viewType
    ? node.dataset.viewType.toUpperCase()
    : slideViewTypes.LIVE;
  contentItem.viewType = viewType;

  // SECTION, ASIDE, LIST, etc.
  if (Array.indexOf(containerNodeNames, nodeName) !== -1) {
    // Add contentItemType + custom properties for different contentItemTypes.
    if (Array.indexOf(listNodeNames, nodeName) !== -1) {
      // Verify that all children are list items.
      i = 0;
      while (i < children.length && children[i].nodeName === 'LI') {
        i++;
      }
      if (i !== children.length) return emptyResult;

      contentItem = {
        ...contentItem,
        contentItemType: contentItemTypes.LIST,
        ordered: nodeName === 'OL',
      };
    } else if (nodeName === 'ASIDE') {
      contentItem = { ...contentItem, contentItemType: contentItemTypes.ASIDE };
    } else if (nodeName === 'SECTION') {
      contentItem = { ...contentItem, contentItemType: contentItemTypes.SECTION };
    } else {
      console.error(`Unrecognized container node name: ${nodeName}`);
    }

    // Parse container childrenItems.
    ({ contentItemIds: childItemIds, contentItemsById: childItemsById } = parseContentItemNodes(
      children,
      slideId,
      contentItemSequence + 1,
      true,
    ));

    // Add childItemIds to contentItem.
    contentItem = {
      ...contentItem,
      childItemIds,
    };
  }
  // P, LI, H1, H2, ...
  else if (Array.indexOf(plaintextNodeNames, nodeName) !== -1) {
    // Add contentItemType.
    if (Array.indexOf(headingNodeNames, nodeName) !== -1) {
      contentItem = { ...contentItem, contentItemType: contentItemTypes.TITLE };
    } else if (nodeName === 'LI') {
      contentItem = { ...contentItem, contentItemType: contentItemTypes.LIST_ITEM };
    } else if (nodeName === 'P') {
      contentItem = { ...contentItem, contentItemType: contentItemTypes.PARAGRAPH };
    } else {
      console.error(`Unrecognized plain text node name: ${nodeName}`);
    }

    // Add text + inlineProperties.
    contentItem = {
      ...contentItem,
      text: parseTextContent(textContent),
      inlineProperties: parseInlineProperties(childNodes),
    };
  }
  // IMG
  else if (nodeName === 'IMG') {
    contentItem = {
      ...contentItem,
      contentItemType: contentItemTypes.DECORATIVE_IMAGE,
      src: node.src,
      alt: node.alt,
    };
  }
  // FIGURE
  else if (nodeName === 'FIGURE') {
    const imgNode = node.children[0];
    const caption = node.children[1] ? node.children[1].textContent : undefined;
    contentItem = {
      ...contentItem,
      contentItemType: contentItemTypes.ILLUSTRATIVE_IMAGE,
      src: imgNode.src,
      alt: imgNode.alt,
      caption,
    };
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
    return emptyResult;
  }

  // Merge new content item and child content items (if there are any) into a single byId object.
  const contentItemsById = {
    [contentItemId]: contentItem,
    ...childItemsById,
  };

  return {
    contentItemId,
    contentItemsById,
  };
}

function parseContentItemNodes(nodeList, slideId, contentItemSequence, parentIsSection = false) {
  const contentItemIds = [];
  let contentItemsById = {};

  let newContentItemId;
  let newContentItemsById;

  let addFirstChildHeadingToImplicitSection = checkAddFirstChildHeadingToImplicitSection(nodeList, parentIsSection);
  const sectionContentItems = [];
  let sectionContentItem;
  let headingLevel;

  Array.from(nodeList).forEach(node => {
    // If the node is a heading
    // (and we are not in the special situation described in 'checkAddFirstChildHeadingToImplicitSection')
    // we need to wrap it + it's contents into a newly created section element (called an 'implicit section').
    if (addFirstChildHeadingToImplicitSection && Array.indexOf(headingNodeNames, node.nodeName) !== -1) {
      // Get the heading level.
      headingLevel = parseInt(node.nodeName.slice(-1));

      // If this is a heading of a lower level than that of the implicit section we're currently working with,
      // end sections until the correct level has been reached.
      while (sectionContentItems.length > 0 && headingLevel <= _.last(sectionContentItems).level) {
        // Pop the last implicit section of the sections stack.
        sectionContentItems.pop();
      }

      // Add a section to contain this heading + its contents.
      // Create the section content item object with an empty childIds array;
      // contentItems that 'fall under' this heading will be added to it.
      newContentItemId = generateContentItemId(slideId, contentItemSequence);
      contentItemSequence += 1;
      sectionContentItem = {
        id: newContentItemId,
        contentItemType: contentItemTypes.SECTION,
        childItemIds: [],
      };

      // Add the new section content item to the main byId object.
      contentItemsById = {
        ...contentItemsById,
        [newContentItemId]: sectionContentItem,
      };

      // Add the new section contentItem's id to the ids list of it's containing entity
      // (which can either be the parent implicit section, or the main ids list if there is no parent implicit section).
      if (sectionContentItems.length !== 0) {
        _.last(sectionContentItems).item.childItemIds.push(newContentItemId);
      } else {
        contentItemIds.push(newContentItemId);
      }

      // Push the new section item on the sections stack.
      sectionContentItems.push({
        level: headingLevel,
        item: sectionContentItem,
      });
    }

    // Parse this node into a contentItem and get the new contentItem id + the byId object of this + all child contentItems.
    ({ contentItemId: newContentItemId, contentItemsById: newContentItemsById } = parseContentItemNode(
      node,
      slideId,
      contentItemSequence,
    ));

    // If the node was correctly parsed.
    if (newContentItemId !== null) {
      // Update the contentItem sequence counter.
      contentItemSequence += Object.keys(newContentItemsById).length;

      // Merge its byId object with the larger byId object.
      contentItemsById = {
        ...contentItemsById,
        ...newContentItemsById,
      };

      // Add its id to its parent's ids list (which can either be an implicit section or the main ids list).
      if (sectionContentItems.length !== 0) {
        _.last(sectionContentItems).item.childItemIds.push(newContentItemId);
      } else {
        contentItemIds.push(newContentItemId);
      }
    }

    // This value is longer relevant after the first child is processed; it should always be TRUE.
    addFirstChildHeadingToImplicitSection = true;
  });

  return {
    contentItemIds,
    contentItemsById,
  };
}

export default function parseSlideNodes(deckId, nodes) {
  const slidesById = {};
  let contentItemsById = {};

  let slideSequence = 0;
  let slideId;
  let slideLevel;

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
  } else {
    nodes.forEach(node => {
      slideId = generateSlideId(deckId, slideSequence);
      slideLevel = node.dataset.level ? parseInt(node.dataset.level) : 0;
      ({ contentItemIds: newContentItemIds, contentItemsById: newContentItemsById } = parseContentItemNodes(
        node.children,
        slideId,
        0,
        // true // <-- set this to true to not wrap the entire slide in an implicit section
      ));

      slidesById[slideId] = {
        id: slideId,
        meta: {},
        level: slideLevel,
        contentItemIds: newContentItemIds,
        contentItemSequence: Object.keys(newContentItemsById).length,
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
