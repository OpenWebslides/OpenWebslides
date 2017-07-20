import React from 'react';
import PropTypes from 'prop-types';

import ContentItemContainer from 'lib/content-item/ContentItemContainer';

export default function List(props) {
  const { contentItem } = props;
  const ListType = contentItem.ordered ? 'ol' : 'ul';

  return (
    <ListType>
      {contentItem.childItemIds.map(id => {
        return <ContentItemContainer
          key={id}
          contentItemId={id}
          editable={props.editable}
          headingLevel={props.headingLevel}
        />
      })}
    </ListType>
  );
}

List.propTypes = {
  editable: PropTypes.bool,
  contentItem: PropTypes.objectOf(Object).isRequired,
};

List.defaultProps = {
  editable: false,
};
