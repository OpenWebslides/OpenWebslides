import React from 'react';
import PropTypes from 'prop-types';

import ContentItemContainer from 'lib/content-item/ContentItemContainer';

export default function List(props) {
  const { contentItem } = props;

  const ListType = contentItem.ordered ? 'ol' : 'ul';

  return (
    <ListType>
      {contentItem.childItemIds.map(id => <ContentItemContainer key={id} id={id} />)}
    </ListType>
  );
}

List.propTypes = {
  contentItem: PropTypes.objectOf(Object).isRequired,
};
