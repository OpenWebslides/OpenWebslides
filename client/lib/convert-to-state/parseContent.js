import contentItemTypes from 'constants/contentItemTypes';

import parseInlineProperties from './parseInlineProperties';

export default function parseContent(deckId, elements) {
  let slideSequence = 0;
  let contentItemSequence = 0;

  const slides = {};
  const contentItems = {};

  // Return a deck with one empty slide when no existing slides are present
  if (elements.length === 0) {
    slides[slideSequence] = {
      meta: {},
      id: `${deckId}-${slideSequence}`,
      contentItemIds: [],
    };
    slideSequence += 1;
  }

  elements.forEach(element => {
    slides[slideSequence] = {
      meta: {},
      id: `${deckId}-${slideSequence}`,
      contentItemIds: [],
    };

    slides[slideSequence].contentItemIds = (function addcontentItems(nodeList) {
      const contentItemIds = [];

      nodeList.forEach(node => {
        const id = `${deckId}-${slideSequence}-${contentItemSequence}`;

        const { nodeName, children, textContent } = node;

        if (node.outerHTML === undefined) {
          return;
        }

        contentItems[id] = { id };
        contentItemSequence += 1;

        switch (nodeName) {
          case 'SECTION':
            contentItems[id] = Object.assign({}, contentItems[id], {
              contentItemType: contentItemTypes.SECTION,
              childItemIds: addcontentItems(children),
            });
            break;
          case 'ASIDE':
            contentItems[id] = Object.assign({}, contentItems[id], {
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
            contentItems[id] = Object.assign({}, contentItems[id], {
              contentItemType: contentItemTypes.TITLE,
              text: textContent,
              inlineProperties: parseInlineProperties(children),
            });
            break;
          case 'P':
            contentItems[id] = Object.assign({}, contentItems[id], {
              contentItemType: contentItemTypes.PARAGRAPH,
              text: textContent,
              inlineProperties: parseInlineProperties(children),
            });
            break;
          case 'OL':
            contentItems[id] = Object.assign({}, contentItems[id], {
              contentItemType: contentItemTypes.LIST,
              ordered: true,
              childItemIds: parseInlineProperties(children),
            });
            break;
          case 'UL':
            contentItems[id] = Object.assign({}, contentItems[id], {
              contentItemType: contentItemTypes.LIST,
              ordered: false,
              childItemIds: parseInlineProperties(children),
            });
            break;
          case 'IMG':
            contentItems[id] = Object.assign({}, contentItems[id], {
              contentItemType: contentItemTypes.IMAGE,
              src: node.src,
              altText: node.alt,
            });
            break;
          case 'IFRAME':
            contentItems[id] = Object.assign({}, contentItems[id], {
              contentItemType: contentItemTypes.IFRAME,
              src: node.src,
            });
            break;
          default:
            return;
        }

        contentItemIds.push(id);
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
