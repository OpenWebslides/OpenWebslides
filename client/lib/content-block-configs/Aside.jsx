import React from 'react';
import PropTypes from 'prop-types';

import ContentItemContainer from 'lib/content-item/ContentItemContainer';

export default function Aside(props) {
  const { contentItem } = props;

  return (
    <aside>
      {contentItem.childItemIds.map(id => <ContentItemContainer key={id} id={id} />)}
    </aside>
  );
}

Aside.propTypes = {
  contentItem: PropTypes.ObjectOf(Object).isRequired,
};
