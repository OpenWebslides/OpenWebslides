import React from 'react';
import { imgOptions } from 'constants/printViewOptions';

export default function imageObjectToReact(img, viewType, level) {
  switch (viewType) {
    case imgOptions.NOTHING:
      return null;
    case imgOptions.IMAGES_ONLY:
      return React.createElement(
        'figure',
        {
          className: 'c_print-view__illustrative-image-only',
          'data-level': level,
        },
        React.createElement(
          'img',
          {
            src: img.src,
            alt: img.alt,
            className: 'c_print-view__image-only__image',
            'data-level': level,
          },
          null,
        ),
      );
    case imgOptions.TEXT_ONLY:
      return React.createElement(
        'p',
        {
          className: 'c_print-view__illustrative-image-text-only',
          'data-level': level,
        },
        `Image: ${img.alt}`,
      );
    default:
    case imgOptions.IMAGES_AND_TEXT:
      return React.createElement('figure', { className: 'c_print-view__illustrative-image-and-text' }, [
        React.createElement(
          'img',
          {
            src: img.src,
            alt: img.alt,
            className: 'c_print-view__image-and-text__image',
            'data-level': level,
          },
          null,
        ),
        React.createElement(
          'figCaption',
          {
            className: 'c_print-view__illustrative-image-and-text__caption',
            'data-level': level,
          },
          img.caption,
        ),
      ]);
  }
}
