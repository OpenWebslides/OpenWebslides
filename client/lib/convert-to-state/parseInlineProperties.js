const SUPPORTED_PROPERTIES = ['EM', 'STRONG'];

export default function addInlineProperties(nodes) {
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
        offSets: {
          start: charOffset,
          end: endsAtChar,
        },
      });

      charOffset = endsAtChar;
    }
  });

  return inlinePropertyState;
}
