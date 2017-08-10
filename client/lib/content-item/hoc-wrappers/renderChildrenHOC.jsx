import React, { Component } from 'react';

export default function renderChildrenHOC(selectedProps) {
  return function renderComponentHOC(WrappedComponent) {
    return class HOC extends Component {
      render() {
        const { childItemIds, headingLevel } = selectedProps;

        return childItemIds.map(childItemId => (
          <WrappedComponent
            key={childItemId}
            contentItemId={childItemId}
            headingLevel={headingLevel}
            {...selectedProps}
          />),
        );
      }
    };
  };
}
