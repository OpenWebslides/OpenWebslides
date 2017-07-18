import contentItemTypes from 'constants/contentItemTypes';

import parseInlineProperties from './parseInlineProperties';

function generateContentItemId(slideId, sequenceValues) {
  return `${slideId}-${sequenceValues.contentItemSequence}`;
}

function generateSlideId(deckId, sequenceValues) {
  return `${deckId}-${sequenceValues.slideSequence}`;
}

function parseTextContent(textContent, trim = true) {
  if (trim) {
    return textContent.replace(/\s+/g, ' ').trim();
  } else {
    return textContent;
  }
}

function parseContentItemNode(node, contentItems, slideId, sequenceValues) {
  const { nodeName, children, textContent } = node;
  const contentItemId = generateContentItemId(slideId, sequenceValues);
  let contentItem = {
    id: contentItemId,
  };

  // We increase this here because otherwise nested children contain a duplicate id.
  sequenceValues.contentItemSequence += 1;

  if (node.outerHTML === undefined) {
    // No contentItem added; undo raising sequence value.
    sequenceValues.contentItemSequence -= 1;
    return -1;
  }

  switch (nodeName) {
    case 'SECTION':
      contentItem = {
        ...contentItem,
        contentItemType: contentItemTypes.SECTION,
        childItemIds: parseContentItemNodes(children, contentItems, slideId, sequenceValues),
      };
      break;
    case 'ASIDE':
      contentItem = {
        ...contentItem,
        contentItemType: contentItemTypes.ASIDE,
        childItemIds: parseContentItemNodes(children, contentItems, slideId, sequenceValues),
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
        childItemIds: parseContentItemNodes(children, contentItems, slideId, sequenceValues),
      };
      break;
    case 'UL':
      contentItem = {
        ...contentItem,
        contentItemType: contentItemTypes.LIST,
        ordered: false,
        childItemIds: parseContentItemNodes(children, contentItems, slideId, sequenceValues),
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
      // No contentItem added; undo raising sequence value.
      sequenceValues.contentItemSequence -= 1;
      return -1;
  }

  contentItems[contentItemId] = contentItem;
  return contentItemId;
}

function parseContentItemNodes(nodeList, contentItems, slideId, sequenceValues) {
  let contentItemIds = [];
  let contentItemId;

  Array.from(nodeList).forEach(node => {
    contentItemId = parseContentItemNode(node, contentItems, slideId, sequenceValues);
    if (contentItemId !== -1) {
      contentItemIds.push(contentItemId);
    }
  });

  return contentItemIds;
}

export default function parseSlideNodes(deckId, nodes) {
  const sequenceValues = {
    slideSequence: 0,
    contentItemSequence: 0,
  };
  const slides = {};
  let contentItems = {};

  // Return a deck with one empty slide when no existing slides are present
  if (nodes.length === 0) {
    const slideId = generateSlideId(deckId, sequenceValues);
    slides[slideId] = {
      id: slideId,
      meta: {},
      contentItemIds: [],
    };
    sequenceValues.slideSequence += 1;
  }

  nodes.forEach(node => {
    const slideId = generateSlideId(deckId, sequenceValues);
    slides[slideId] = {
      id: slideId,
      meta: {},
      contentItemIds: parseContentItemNodes(node.children, contentItems, slideId, sequenceValues),
    };
    sequenceValues.slideSequence += 1;
    sequenceValues.contentItemSequence = 0;
  });

  return {
    slides,
    contentItems,
    ...sequenceValues,
  };
}
