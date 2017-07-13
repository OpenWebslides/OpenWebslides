// @flow
import parseInlineProperties from './parseInlineProperties';

export default function convertContentItems(elements: Array<HTMLElement>) {
  let slideSequence = 0;
  let contentItemSequence = 0;

  const slides = {};
  const contentItems = {};

  // Return a deck with one empty slide when no existing slides are present
  if (elements.length === 0) {
    slides[slideSequence] = { meta: {}, id: slideSequence, contentItemIds: [] };
    slideSequence += 1;
  }

  elements.forEach(element => {
    slides[slideSequence] = { meta: {}, id: slideSequence, contentItemIds: [] };

    slides[slideSequence].contentItemIds = (function addcontentItems(nodeList: NodeList<HTMLElement | Node>) {
      const contentItemIds = [];

      nodeList.forEach(node => {
        const id = contentItemSequence;

        const { nodeName, childNodes, textContent } = node;

        if (node.outerHTML === undefined) {
          return;
        }

        contentItems[id] = {
          id,
          contentType: nodeName,
        };

        contentItemSequence += 1;

        if (nodeName === 'SECTION' || nodeName === 'ASIDE') {
          const childItemIds = addcontentItems(childNodes);

          contentItems[id].childItemIds = childItemIds;
        } else {
          contentItems[id].text = textContent;
          contentItems[id].inlineProperties = parseInlineProperties(childNodes);
        }

        contentItemIds.push(id);
      });

      return contentItemIds;
    })(element.childNodes);

    slideSequence += 1;
  });

  return {
    slides,
    contentItems,
    slideSequence,
    contentItemSequence,
  };
}
