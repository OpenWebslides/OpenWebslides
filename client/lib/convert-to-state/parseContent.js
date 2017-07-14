import contentItemTypes from 'constants/contentItemTypes';

import parseInlineProperties from './parseInlineProperties';

export default function parseContent(deckId, elements) {
  let slideSequence = 0;
  let contentItemSequence = 0;

  const slides = {};
  const contentItems = {};

  // Return a deck with one empty slide when no existing slides are present
  if (elements.length === 0) {
    const slideId = `${deckId}-${slideSequence}`;

    slides[slideId] = {
      meta: {},
      id: slideId,
      contentItemIds: [],
    };
    slideSequence += 1;
  }

  elements.forEach(element => {
    const slideId = `${deckId}-${slideSequence}`;
    slides[slideId] = {
      meta: {},
      id: slideId,
      contentItemIds: [],
    };

    slides[slideId].contentItemIds = (function addcontentItems(nodeList) {
      const contentItemIds = [];

      Array.from(nodeList).forEach(node => {
        const contentItemId = `${deckId}-${slideSequence}-${contentItemSequence}`;

        const { nodeName, children, textContent } = node;

        if (node.outerHTML === undefined) {
          return;
        }

        contentItems[contentItemId] = { id: contentItemId };
        contentItemSequence += 1;

        switch (nodeName) {
          case 'SECTION':
            contentItems[contentItemId] = Object.assign({}, contentItems[contentItemId], {
              contentItemType: contentItemTypes.SECTION,
              childItemIds: addcontentItems(children),
            });
            break;
          case 'ASIDE':
            contentItems[contentItemId] = Object.assign({}, contentItems[contentItemId], {
              contentItemType: contentItemTypes.ASIDE,
              childItemIds: addcontentItems(children),
            });
            break;
          case 'H1':
          case 'H2':
          case 'H3':
          case 'H4':
          case 'H5':
          case 'H6':
            contentItems[contentItemId] = Object.assign({}, contentItems[contentItemId], {
              contentItemType: contentItemTypes.TITLE,
              text: textContent,
              inlineProperties: parseInlineProperties(children),
            });
            break;
          case 'P':
            contentItems[contentItemId] = Object.assign({}, contentItems[contentItemId], {
              contentItemType: contentItemTypes.PARAGRAPH,
              text: textContent,
              inlineProperties: parseInlineProperties(children),
            });
            break;
          case 'OL':
            contentItems[contentItemId] = Object.assign({}, contentItems[contentItemId], {
              contentItemType: contentItemTypes.LIST,
              ordered: true,
              childItemIds: parseInlineProperties(children),
            });
            break;
          case 'UL':
            contentItems[contentItemId] = Object.assign({}, contentItems[contentItemId], {
              contentItemType: contentItemTypes.LIST,
              ordered: false,
              childItemIds: parseInlineProperties(children),
            });
            break;
          case 'IMG':
            contentItems[contentItemId] = Object.assign({}, contentItems[contentItemId], {
              contentItemType: contentItemTypes.IMAGE,
              src: node.src,
              altText: node.alt,
            });
            break;
          case 'IFRAME':
            contentItems[contentItemId] = Object.assign({}, contentItems[contentItemId], {
              contentItemType: contentItemTypes.IFRAME,
              src: node.src,
            });
            break;
          default:
            return;
        }

        contentItemIds.push(contentItemId);
      });

      return contentItemIds;
    })(element.children);

    slideSequence += 1;
  });

  return {
    slides,
    contentItems,
    slideSequence,
    contentItemSequence,
  };
}
