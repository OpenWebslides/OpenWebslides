function parseInlineProperties(childNodes) {
  const inlineProperties = [];

  if (childNodes.length > 1) {
    const inlinePropertiesArr = Array.from(childNodes).filter(node => {
      switch (node.nodeName) {
        case 'EM':
        case 'STRONG':
        case '#text':
          return true;
        default:
          return false;
      }
    });

    let charOffset = 0;

    inlinePropertiesArr.forEach(el => {
      const textLength = el.textContent.length;
      const endsAtChar = charOffset + textLength;

      if (el.nodeName === '#text') {
        charOffset = endsAtChar;
      } else {
        inlineProperties.push({
          type: el.nodeName,
          startsAtChar: charOffset,
          endsAtChar,
        });
        charOffset = endsAtChar;
      }
    });
  }
  return inlineProperties;
}

export default parseInlineProperties;
