import React from 'react';
import PropTypes from 'prop-types';

import ContentItemContainer from 'lib/content-item/ContentItemContainer';

export default function Section(props) {
  const { contentItem } = props;

  return (
    <section>
      {contentItem.childItemIds.map(id => (
        <ContentItemContainer
          key={id}
          contentItemId={id}
          editable={props.editable}
          headingLevel={props.headingLevel + 1}
        />
      ))}
    </section>
  );
}

Section.propTypes = {
  editable: PropTypes.bool,
  contentItem: PropTypes.objectOf(Object).isRequired,
};

Section.defaultProps = {
  editable: false,
};
