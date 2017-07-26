import React from 'react';

export default function imageObjectToReact(img, viewType, level) {
  switch (viewType) {
    case false:
      return null;
    default:
    case true:
      return React.createElement(
        'img',
        {
          src: img.src,
          alt: img.alt,
          className: 'c_print-view__decorative-image',
          'data-level': level,
        },
        null,
      );
  }
}
