import React from 'react';
import PropTypes from 'prop-types';

import ContentItemContainer from 'lib/content-item/ContentItemContainer';

export default function List(props) {
  const { contentItem } = props;

  const listType = contentItem.ordered ? 'ol' : 'ul';

  return (
    <listType>
      {contentItem.childItemIds.map(id => <ContentItemContainer key={id} id={id} />)}
    </listType>
  );
}

List.propTypes = {
  contentItem: PropTypes.objectOf(Object).isRequired,
};
