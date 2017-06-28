import React from 'react';
import PropTypes from 'prop-types';

import Slide from 'presentationals/components/slide-editor/Slide';
import convertContent from 'lib/convert-to-react/convertContent';

export default function renderActiveSlide({ content }) {
  const slideContent = convertContent(content, { active: true });

  return React.createElement(Slide, {}, slideContent);
}

renderActiveSlide.propTypes = {
  content: PropTypes.objectOf(Object).isRequired,
};
