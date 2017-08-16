import React, { PureComponent } from 'react';

import contentItemHOC from './contentItemHOC';

export default function renderChildrenHOC(selectedProps) {
  return function renderComponentHOC(WrappedComponent) {
    return class HOC extends PureComponent {
      render() {
        const { childItemIds, headingLevel } = selectedProps;

        const ConnectedComponent = contentItemHOC(WrappedComponent);

        return (<div>
          {childItemIds.map(childItemId => (
            <ConnectedComponent
              key={childItemId}
              contentItemId={childItemId}
              headingLevel={headingLevel}
              {...selectedProps}
            />))}
        </div>);
      }
    };
  };
}
