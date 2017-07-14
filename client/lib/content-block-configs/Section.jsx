import React from 'react';
import PropTypes from 'prop-types';

import ContentItemContainer from 'lib/content-item/ContentItemContainer';

export default function Section(props) {
  const { contentItem } = props;

  return (
    <section>
      {contentItem.childItemIds.map(id => <ContentItemContainer key={id} id={id} />)}
    </section>
  );
}

Section.propTypes = {
  contentItem: PropTypes.ObjectOf(Object).isRequired,
};
