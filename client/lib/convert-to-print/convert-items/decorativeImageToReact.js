import React from 'react';
import { decorativeImgOptions } from 'constants/printViewOptions';

export default function imageObjectToReact(img, viewType) {
  switch (viewType) {
    case decorativeImgOptions.DONT_SHOW:
      return null;
    default:
    case decorativeImgOptions.SHOW:
      return React.createElement(
        'img',
        {
          src: img.src,
          alt: img.alt,
          className: 'c_print-view__decorative-image',
        },
        null,
      );
  }
}
