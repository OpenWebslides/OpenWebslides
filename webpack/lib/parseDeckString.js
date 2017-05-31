import _ from 'lodash';
import contentBlockTypes from './contentBlockTypes';

function parseDeck(deckString) {
  let id = 0;

  const slideData = {
    slides: { byId: {}, allIds: [] },
    contentBlocks: { byId: {}, allIds: [] },
  };

  const { slides, contentBlocks } = slideData;

  function parseAttributes(attributes) {
    const attributesArray = Array.from(attributes);
    const attributesObject = {};

    attributesArray.forEach(attr => {
      if (attr.name === 'class') {
        attributesObject.className = attr.nodeValue;
      }
      if (attr.name === 'id') {
        attributesObject.id = attr.nodeValue;
      }
      if (attr.name.startsWith('data-')) {
        attributesObject.data = attributesObject.data || {};
        const dataName = _.camelCase(attr.name.replace('data-', ''));
        attributesObject.data[dataName] = attr.nodeValue;
      }
    });
    return attributesObject;
  }

  function createContentBlockFrom(node) {
    const { nodeName, nodeValue, attributes } = node;

    contentBlocks.byId[id] = { id, type: contentBlockTypes[nodeName] };
    contentBlocks.allIds.push(id);

    if (nodeName === '#text') {
      Object.assign(contentBlocks.byId[id], { value: nodeValue });
    } else {
      Object.assign(contentBlocks.byId[id], { childIds: [] });
    }

    if (attributes && attributes.length > 0) {
      Object.assign(contentBlocks.byId[id], {
        attributes: parseAttributes(attributes),
      });
    }
  }

  (function parseDeckString() {
    const parser = new DOMParser();
    const document = parser.parseFromString(deckString, 'text/html');
    let slideCounter = 1;

    if (_.isUndefined(document)) {
      throw new Error('Invalid data');
    }

    const slideArray = Array.from(document.body.children).filter(
      node => node.nodeName === 'SECTION',
    );

    slideArray.forEach(slide => {
      slides.byId[slideCounter] = { id: slideCounter, contentBlocks: [] };
      slides.allIds.push(slideCounter);

      const { childNodes } = slide;

      (function createContentBlocks(nodes, parentContentBlock = null) {
        nodes.forEach(node => {
          id += 1;
          createContentBlockFrom(node);

          if (parentContentBlock) {
            contentBlocks.byId[parentContentBlock].childIds.push(id);
          } else {
            slides.byId[slideCounter].contentBlocks.push(id);
          }

          if (node.childNodes) {
            (() => {
              createContentBlocks(node.childNodes, id);
            })();
          }
        });
      })(childNodes);
      slideCounter += 1;
    });
  })(deckString);

  return slideData;
}

export default parseDeck;
