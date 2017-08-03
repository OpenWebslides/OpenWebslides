import React from 'react';
import PropTypes from 'prop-types';

import ContentItemContainer from 'lib/content-item/ContentItemContainer';

export default function Section(props) {
  const {
    ancestorItemIds,
    slideId,
    editable,
    attributes,
    headingLevel,
    contentItem: { childItemIds, id },
  } = props;

  return (
    <section {...attributes}>
      {childItemIds.map(childItemId => (
        <ContentItemContainer
          key={childItemId}
          contentItemId={childItemId}
          ancestorItemIds={ancestorItemIds.concat(id)}
          slideId={slideId}
          editable={editable}
          headingLevel={headingLevel + 1}
        />
      ))}
    </section>
  );
}

Section.propTypes = {
  attributes: PropTypes.objectOf(Object).isRequired,
  ancestorItemIds: PropTypes.arrayOf(String).isRequired,
  slideId: PropTypes.string.isRequired,
  editable: PropTypes.bool.isRequired,
  headingLevel: PropTypes.number.isRequired,
  contentItem: PropTypes.objectOf(Object).isRequired,
};
