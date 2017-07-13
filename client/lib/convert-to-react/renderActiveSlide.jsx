import React from 'react';
import PropTypes from 'prop-types';

import Slide from 'presentationals/components/slide-editor/Slide';
import ContentItemContainer from 'lib/content-item/ContentItemContainer';

export default function renderActiveSlide({ contentItemIds }) {
  return (
    <Slide>
      {contentItemIds.map(id => <ContentItemContainer key={id} />)}
    </Slide>
  );
}

renderActiveSlide.propTypes = {
  contentItemIds: PropTypes.arrayOf(Number).isRequired,
};
