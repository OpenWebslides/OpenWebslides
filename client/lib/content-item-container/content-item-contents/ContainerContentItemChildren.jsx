import React from 'react';
import PropTypes from 'prop-types';

import { containerContentItemShape } from 'constants/propTypeShapes';

import ContentItemContainer from '../ContentItemContainer';

function ContainerContentItemChildren(props) {
  const { contentItem, headingLevel, ancestorItemIds, ...passThroughProps } = props;

  // #TODO appearantly React 16.0 supports rendering arrays of elements; upgrade asap
  return (
    <div className="ows_pass-through">
      {contentItem.childItemIds.map(childItemId => (
        <ContentItemContainer
          key={childItemId}
          {...passThroughProps}
          contentItemId={childItemId}
          headingLevel={headingLevel + 1}
          ancestorItemIds={ancestorItemIds.concat(contentItem.id)}
        />
      ))}
    </div>
  );
}

ContainerContentItemChildren.propTypes = {
  contentItem: PropTypes.shape(containerContentItemShape).isRequired,
  headingLevel: PropTypes.number.isRequired,
  ancestorItemIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ContainerContentItemChildren;
