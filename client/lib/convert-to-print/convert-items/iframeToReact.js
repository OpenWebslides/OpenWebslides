import React from 'react';
import { iframeOptions } from 'constants/printViewOptions';

function detectType(srcString) {
  // TODO

  if (srcString.match(/youtube/)) {
    return `Youtube video: watch it at ${srcString}`;
  }
  else if (srcString.match(/mentimeter/)) {
    return '[Mentimeter question]';
  }
  return `Website: ${srcString}`;
}

export default function iframeObjectToReact(iframe, viewType, level) {
  debugger;
  switch (viewType) {
    default:
    case iframeOptions.DESCRIPTION:
      return React.createElement(
        'p',
        {
          className: 'c_print-view__iframe-description',
          'data-level': level,
        },
        detectType(iframe.src),
      );
    case iframeOptions.SHOW:
      return React.createElement(
        'iframe',
        { className: 'c_print-view__iframe', src: iframe.src },
        null,
      );
    case iframeOptions.NOTHING:
      return null;
  }
}
