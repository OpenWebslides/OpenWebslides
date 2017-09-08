import React from 'react';

export default function titleToReact(title, level) {
  const levelToClassName = {
    1: { tag: 'h1', className: 'c_print-view__main-title' },
    2: { tag: 'h2', className: 'c_print-view__section-title' },
    3: { tag: 'h3', className: 'c_print-view__subsection-title' },
    4: { tag: 'h4', className: 'c_print-view__subsubsection-title' },
    5: { tag: 'h5', className: 'c_print-view__subsubsubsection-title' },
    6: { tag: 'h6', className: 'c_print-view__subsubsubsubsection-title' },
  };
  // if it's an h1 or h2, add an horizontal line:
  const elements = level === 1
    ? [
      React.createElement('hr', { className: 'c_print-view__main-title__separator-before' }, null),
      title.text,
      React.createElement('hr', { className: 'c_print-view__main-title__separator-after' }, null),
    ]
    : level === 2
      ? [
        title.text, React.createElement(
          'hr',
          { className: 'c_print-view__section-title__separator' },
          null,
        ),
      ]
      : title.text;

  return React.createElement(
    'h1',
    { className: levelToClassName[level].className, 'data-level': level },
    elements,
  );
}
