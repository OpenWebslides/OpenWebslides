import React from 'react';
import { imgOptions } from 'constants/printViewOptions';

export default function imageObjectToReact(img, viewType) {
  switch (viewType) {
    case imgOptions.NOTHING:
      return null;
    case imgOptions.IMAGES_ONLY:
      return React.createElement(
        'img',
        {
          src: img.src,
          alt: img.alt,
          className: 'c_print-view__image-only',
        },
        null,
      );
    case imgOptions.TEXT_ONLY:
      return React.createElement(
        'p',
        { className: 'c_print-view__image-text-only' },
        img.alt,
      );
    default:
    case imgOptions.IMAGES_AND_TEXT:
      return React.createElement(
        'figure',
        { className: 'c_print-view__image-and-text' },
        [
          React.createElement(
            'img',
            {
              src: img.src,
              alt: img.alt,
              className: 'c_print-view__image-and-text__image',
            },
            null,
          ),
          React.createElement(
            'figCaption',
            { className: 'c_print-view__image-and-text__caption' },
            img.caption,
          ),
        ],
      );
  }
}
