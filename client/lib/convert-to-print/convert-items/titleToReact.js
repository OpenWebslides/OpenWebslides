import React from 'react';

export default function titleToReact(title, level) {
  const levelToTitle = {
    1: { tag: 'h1', className: 'c_print-view__main-title' },
    2: { tag: 'h2', className: 'c_print-view__section-title' },
    3: { tag: 'h3', className: 'c_print-view__subsection-title' },
    4: { tag: 'h4', className: 'c_print-view__subsubsection-title' },
    5: { tag: 'h5', className: 'c_print-view__subsubsubsection-title' },
    6: { tag: 'h6', className: 'c_print-view__subsubsubsubsection-title' },
  };

  return React.createElement(
    levelToTitle[level].tag,
    { className: levelToTitle[level].className, 'data-level': level },
    title.text,
  );
}
