import React from 'react';
import PropTypes from 'prop-types';

import ContentItemContainer from 'lib/content-item/ContentItemContainer';

export default function Aside(props) {
  const { contentItem } = props;

  return (
    <aside>
      {contentItem.childItemIds.map(id => (
        <ContentItemContainer
          key={id}
          contentItemId={id}
          editable={props.editable}
          headingLevel={props.headingLevel + 1}
        />
      ))}
    </aside>
  );
}

Aside.propTypes = {
  editable: PropTypes.bool,
  contentItem: PropTypes.objectOf(Object).isRequired,
};

Aside.defaultProps = {
  editable: false,
};
