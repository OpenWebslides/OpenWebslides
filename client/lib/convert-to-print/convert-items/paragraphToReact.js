import React from 'react';

function applyProperty(text, property) {
  return React.createElement('p', null, [
    React.createElement('span', null, text.substring(0, property.offsets.start)),
    React.createElement(property.type, null, text.substring(property.offsets.start, property.offsets.end)),
    React.createElement('span', null, text.substring(property.offsets.end)),
  ]);
}

export default function paragraphObjetToReact(paragraph, level) {
  debugger;
  if (!paragraph.inlineProperties) {
    return React.createElement(
      'p',
      {
        className: 'c_print-view__iframe-description',
        'data-level': level,
      },
      paragraph.text,
    );
  }
  return applyProperty(paragraph.text, paragraph.inlineProperties[0]); // TODO: support more than 1 property
}
