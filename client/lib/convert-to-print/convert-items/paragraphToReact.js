import React from 'react';

function applyProperties(text, properties) {
  // TODO: support more than 1 property
  const property = properties[0];
  return React.createElement('p', null, [
    React.createElement('span', null, text.substring(0, property.offsets.start)),
    React.createElement(property.type, null, text.substring(property.offsets.start, property.offsets.end)),
    React.createElement('span', null, text.substring(property.offsets.end)),
  ]);
}

export default function paragraphObjetToReact(paragraph, level) {
  if (!paragraph.inlineProperties || paragraph.inlineProperties.length === 0) {
    return React.createElement(
      'p',
      {
        className: 'c_print-view__paragraph',
        'data-level': level,
      },
      paragraph.text,
    );
  }
  return applyProperties(paragraph.text, paragraph.inlineProperties);
}
