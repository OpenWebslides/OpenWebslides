import _ from 'lodash';
import contentBlockTypes from './contentBlockTypes';

function parseAttributes(attributes) {
  const attributesArray = Array.from(attributes);
  const attributesObject = {};

  attributesArray.forEach(attr => {
    if (attr.name === 'class') {
      attributesObject.classList = attr.nodeValue;
    }
    if (attr.name === 'id') {
      attributesObject.id = attr.nodeValue;
    }
    if (attr.name.startsWith('data-')) {
      attributesObject.dataset = attributesObject.dataset || {};
      const dataName = _.camelCase(attr.name.replace('data-', ''));
      attributesObject.dataset[dataName] = attr.nodeValue;
    }
  });
  return attributesObject;
}

function convertNodesToObject(nodes) {
  const activeSlideObj = {};
  let id = 0;

  function parseNode(node) {
    const { nodeName, nodeValue, attributes } = node;

    const slideElement = {
      id,
      type: contentBlockTypes[nodeName],
    };

    if (nodeName === '#text') {
      slideElement.data = nodeValue;
    } else {
      slideElement.children = [];
    }

    if (attributes && attributes.length > 0) {
      slideElement.attributes = parseAttributes(attributes);
    }

    return slideElement;
  }

  (function parseNodeList(nodeList = nodes, parentNodeId = null) {
    nodeList.forEach(node => {
      id += 1;
      activeSlideObj[id] = parseNode(node);

      if (parentNodeId) {
        activeSlideObj[parentNodeId].children.push(id);
      }

      const { childNodes } = node;
      if (childNodes) {
        (function parseChildNodes() {
          parseNodeList(childNodes, id);
        })();
      }
    });
  })();

  return activeSlideObj;
}

function parseSlide(htmlString) {
  const parser = new DOMParser();
  const document = parser.parseFromString(htmlString, 'text/html');

  if (
    _.isUndefined(document) ||
    document.body.firstChild.localName !== 'section'
  ) {
    throw new Error('Invalid data');
  }

  // Extracts all child nodes of the section element
  const { childNodes } = document.body.firstChild;

  // Converts child nodes to normalized js object
  const activeSlide = convertNodesToObject(childNodes);
  return activeSlide;
}

export default parseSlide;
