import React from 'react';
import PropTypes from 'prop-types';

import ContentItemContainer from 'lib/content-block-editor/ContentItemContainer';

export default function ContentGroup(props) {
  return (
    <section>
      {props.childItemIds.map(id => <ContentItemContainer key={id} />)}
    </section>
  );
}

ContentGroup.propTypes = {
  childItemIds: PropTypes.childItemIds.isRequired,
};
