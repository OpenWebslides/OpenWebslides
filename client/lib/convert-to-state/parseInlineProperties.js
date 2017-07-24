const SUPPORTED_PROPERTIES = ['EM', 'STRONG'];

export default function parseInlineProperties(nodes) {
  const inlineProperties = [];

  let charOffset = 0;
  let textContent;
  let endsAtChar;
  let node;

  for (let i = 0; i < nodes.length; i++) {
    node = nodes[i];
    // Trim left side & merge successive whitespace chars into one.
    textContent = node.textContent.replace(/^\s+/, '').replace(/\s+/g, ' ');
    endsAtChar = charOffset + textContent.length;

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
