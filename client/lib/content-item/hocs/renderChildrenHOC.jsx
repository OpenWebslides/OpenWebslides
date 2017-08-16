
import React from 'react';
import contentItemHOC from './contentItemHOC';

export default function renderChildrenHOC(selectedProps) {
  return function renderComponentHOC(WrappedComponent) {
    const ConnectedComponent = contentItemHOC(WrappedComponent);

    return function childrenContainer() {
      const { childItemIds, headingLevel } = selectedProps;

      return (
        <div>
          {childItemIds.map(childItemId => (
            <ConnectedComponent
              key={childItemId}
              contentItemId={childItemId}
              headingLevel={headingLevel}
              {...selectedProps}
            />))}
        </div>
      );
    };
  };
}
