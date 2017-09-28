
import React from 'react';
import contentItemHOC from './contentItemHOC';

export default function renderChildrenHOC(selectedProps) {
  return function renderComponentHOC(WrappedComponent) {
    const ConnectedComponent = contentItemHOC(WrappedComponent);

    return function childrenContainer() {
      const { childItemIds, headingLevel } = selectedProps;

      // #TODO this creates an extra div in navigation / presentation view
      // where there is none in live view. This disrepancy creates styling issues; must be fixed.
      return (
        <div className="THIS-DIV-SHOULD-NOT-BE-HERE-REFACTOR-THIS">
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
