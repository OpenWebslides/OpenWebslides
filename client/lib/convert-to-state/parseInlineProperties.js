const SUPPORTED_PROPERTIES = { EM: 'EM', STRONG: 'STRONG', A: 'LINK', SUP: 'SUP' };

export default function parseInlineProperties(nodes) {
  const inlineProperties = [];

  let charOffset = 0;
  let textContent;
  let endsAtChar;
  let node;

  for (let i = 0; i < nodes.length; i += 1) {
    node = nodes[i];

    // Trim left side & merge successive whitespace chars into one.
    textContent = node.textContent.replace(/^\s+/, '').replace(/\s+/g, ' ');
    endsAtChar = charOffset + textContent.length;

    if (Object.keys(SUPPORTED_PROPERTIES).includes(node.nodeName)) {
      const attributes = {};

      if (node.attributes) {
        Array.from(node.attributes).forEach((attr) => {
          attributes[attr.name] = attr.value;
        });
      }

      inlineProperties.push({
        type: SUPPORTED_PROPERTIES[node.nodeName], // #TODO fix this
        offSets: {
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
