// @flow
const SUPPORTED_PROPERTIES = ['EM', 'STRONG'];

export default function addInlineProperties(nodes: NodeList<Node>) {
  const inlinePropertyState = [];

  const inlinePropertyNodes = Array.from(nodes);

  let charOffset = 0;

  inlinePropertyNodes.forEach(node => {
    const textLength = node.textContent.length;
    const endsAtChar = charOffset + textLength;

    if (SUPPORTED_PROPERTIES.includes(node.nodeName) === false) {
      charOffset = endsAtChar;
    } else {
      inlinePropertyState.push({
        type: node.nodeName,
        startsAtChar: charOffset,
        endsAtChar,
      });

      charOffset = endsAtChar;
    }
  });

  return inlinePropertyState;
}
