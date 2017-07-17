import React from 'react';
import { iframeOptions } from 'constants/printViewOptions';

function detectType(srcString) {
  // TODO
  return 'This will contain a description of the iFrame contents';
}

export default function iframeObjectToReact(iframe, viewType) {
  switch (viewType) {
    default:
    case iframeOptions.DESCRIPTION:
      return React.createElement(
        'p',
        {
          className: 'c_print-view__iframe-description',
        },
        detectType(iframe.src),
      );
  }
}
