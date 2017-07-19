import { contentItemTypes } from 'constants/contentItemTypes';

import { generateSlideId, generateContentItemId } from './generateIds';
import parseInlineProperties from './parseInlineProperties';

function parseTextContent(textContent, trim = true) {
  if (trim) {
    return textContent.replace(/\s+/g, ' ').trim();
  } else {
    return textContent;
  }
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

  const { contentItemIds: childItemIds, contentItemsById: childItemsById } = parseContentItemNodes(children, slideId, contentItemSequence + 1);

  switch (nodeName) {
    case 'SECTION':
      contentItem = {
        ...contentItem,
        contentItemType: contentItemTypes.SECTION,
        childItemIds: childItemIds,
      };
      break;
    case 'ASIDE':
      contentItem = {
        ...contentItem,
        contentItemType: contentItemTypes.ASIDE,
        childItemIds: childItemIds,
      };
      break;
    case 'H1':
    case 'H2':
    case 'H3':
    case 'H4':
    case 'H5':
    case 'H6':
      contentItem = {
        ...contentItem,
        contentItemType: contentItemTypes.TITLE,
        text: parseTextContent(textContent),
        inlineProperties: parseInlineProperties(children),
      };
      break;
    case 'P':
      contentItem = {
        ...contentItem,
        contentItemType: contentItemTypes.PARAGRAPH,
        text: parseTextContent(textContent),
        inlineProperties: parseInlineProperties(children),
      };
      break;
    case 'OL':
      contentItem = {
        ...contentItem,
        contentItemType: contentItemTypes.LIST,
        ordered: true,
        childItemIds: childItemIds,
      };
      break;
    case 'UL':
      contentItem = {
        ...contentItem,
        contentItemType: contentItemTypes.LIST,
        ordered: false,
        childItemIds: childItemIds,
      };
      break;
    case 'LI':
      contentItem = {
        ...contentItem,
        contentItemType: contentItemTypes.LIST_ITEM,
        text: parseTextContent(textContent),
        inlineProperties: parseInlineProperties(children),
      };
      break;
    case 'IMG':
      contentItem = {
        ...contentItem,
        contentItemType: contentItemTypes.IMAGE,
        src: node.src,
        altText: node.alt,
      };
      break;
    case 'IFRAME':
      contentItem = {
        ...contentItem,
        contentItemType: contentItemTypes.IFRAME,
        src: node.src,
      };
      break;
    default:
      return {
        contentItemId: null,
        contentItemsById: {},
      };
  }

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
  let contentItemIds = [];
  let contentItemsById = {};
  let newContentItemId;
  let newContentItemsById;

  Array.from(nodeList).forEach(node => {
    ({ contentItemId: newContentItemId, contentItemsById: newContentItemsById } = parseContentItemNode(node, slideId, contentItemSequence));
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
  }
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
      ({ contentItemIds: newContentItemIds, contentItemsById: newContentItemsById } = parseContentItemNodes(node.children, slideId, 0));

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
