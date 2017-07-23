const SUPPORTED_PROPERTIES = ['EM', 'STRONG'];

export default function parseInlineProperties(nodes) {
  const inlineProperties = [];

  let charOffset = 0;
  let endsAtChar;
  let node;

  for (let i = 0; i < nodes.length; i++) {
    node = nodes[i];
    endsAtChar = charOffset + node.textContent.length;

    if (SUPPORTED_PROPERTIES.includes(node.nodeName)) {
      inlineProperties.push({
        type: node.nodeName, // #TODO fix this
        offSets: {
          start: charOffset,
          end: endsAtChar,
        },
      });
    }

    charOffset = endsAtChar;
  }

  return inlineProperties;
}
