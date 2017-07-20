/* eslint-disable no-case-declarations */
import { contentItemTypes } from 'constants/contentItemTypes';

import { generateSlideId, generateContentItemId } from './generateIds';
import parseInlineProperties from './parseInlineProperties';

const headingNodeNames = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
const plaintextNodeNames = [...headingNodeNames, 'P', 'LI'];
const listNodeNames = ['UL', 'OL'];
const containerNodeNames = ['SECTION', 'ASIDE', ...listNodeNames];

function parseTextContent(textContent, trim = true) {
  if (trim) {
    return textContent.replace(/\s+/g, ' ').trim();
  }
  return textContent;
}

function parseContentItemNode(node, slideId, contentItemSequence) {
  if (node.outerHTML === undefined) {
    return {
      contentItemId: null,
      contentItemsById: {},
    };
  }

  const { nodeName, children, textContent } = node;
  const contentItemId = generateContentItemId(slideId, contentItemSequence);
  let contentItem = { id: contentItemId };
  let childItemIds = [];
  let childItemsById = {};

  // SECTION, ASIDE, LIST, etc.
  if (Array.indexOf(containerNodeNames, nodeName) !== -1) {
    // Add contentItemType + custom properties for different contentItemTypes.
    if (Array.indexOf(listNodeNames, nodeName) !== -1) {
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
    ({contentItemIds: childItemIds, contentItemsById: childItemsById } = parseContentItemNodes(
      children,
      slideId,
      contentItemSequence + 1
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
      console.error('Unrecognized plain text node name.');
    }

    // Add text + inlineProperties.
    contentItem = {
      ...contentItem,
      text: parseTextContent(textContent),
      inlineProperties: parseInlineProperties(children),
    };
  }
  else if (nodeName === 'IMG') {
    contentItem = {
      ...contentItem,
      contentItemType: contentItemTypes.DECORATIVE_IMAGE,
      src: node.src,
      altText: node.alt,
    };
  }
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
  else if (nodeName === 'IFRAME') {
    contentItem = {
      ...contentItem,
      contentItemType: contentItemTypes.IFRAME,
      src: node.src,
    };
  }
  // Skip unrecognized nodeNames.
  else {
    return {
      contentItemId: null,
      contentItemsById: {},
    };
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

function parseContentItemNodes(nodeList, slideId, contentItemSequence) {
  const contentItemIds = [];
  let contentItemsById = {};
  let newContentItemId;
  let newContentItemsById;

  Array.from(nodeList).forEach(node => {
    ({ contentItemId: newContentItemId, contentItemsById: newContentItemsById } = parseContentItemNode(
      node,
      slideId,
      contentItemSequence,
    ));
    if (newContentItemId !== null) {
      contentItemIds.push(newContentItemId);
      contentItemsById = {
        ...contentItemsById,
        ...newContentItemsById,
      };
      contentItemSequence += Object.keys(newContentItemsById).length;
    }
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
      ({ contentItemIds: newContentItemIds, contentItemsById: newContentItemsById } = parseContentItemNodes(
        node.children,
        slideId,
        0,
      ));

      slidesById[slideId] = {
        id: slideId,
        meta: {},
        level: 0, // #TODO
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
    slideSequence,
  };
}
