import _ from 'lodash';

// #TODO use constants for this
const SUPPORTED_PROPERTIES = {
  EM: 'EM',
  STRONG: 'STRONG',
  A: 'LINK',
  SUP: 'SUP',
  SUB: 'SUB',
};

export default function parseNodeInlineProperties(node) {
  const inlineProperties = [];
  let nodes = node.childNodes;

  // Node contents might be wrapped in a <span class="ows_pass-through">.
  if (
    nodes.length === 1 &&
    nodes[0].className !== undefined &&
    _.includes(nodes[0].className.split(' '), 'ows_pass-through')
  ) {
    nodes = nodes[0].children;
  }

  let charOffset = 0;
  let textContent;
  let endsAtChar;
  let inlinePropertyNode;

  for (let i = 0; i < nodes.length; i += 1) {
    inlinePropertyNode = nodes[i];

    // Trim left side & merge successive whitespace chars into one.
    textContent = inlinePropertyNode.textContent.replace(/^\s+/, '').replace(/\s+/g, ' ');
    endsAtChar = charOffset + textContent.length;

    if (Object.keys(SUPPORTED_PROPERTIES).includes(inlinePropertyNode.nodeName)) {
      const attributes = {};

      if (inlinePropertyNode.attributes) {
        Array.from(inlinePropertyNode.attributes).forEach((attr) => {
          attributes[attr.name] = attr.value;
        });
      }

      inlineProperties.push({
        type: SUPPORTED_PROPERTIES[inlinePropertyNode.nodeName], // #TODO fix this
        offsets: {
          start: charOffset,
          end: endsAtChar,
        },
        attributes,
      });
    }

    charOffset = endsAtChar;
  }

  return inlineProperties;
}
