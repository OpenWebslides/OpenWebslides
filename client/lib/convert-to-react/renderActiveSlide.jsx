import React from 'react';
import PropTypes from 'prop-types';

import Slide from 'presentationals/components/slide-editor/Slide';

export default function renderActiveSlide({ content }) {
  return <h1>Another placeholder</h1>;
}

renderActiveSlide.propTypes = {
  content: PropTypes.objectOf(Object).isRequired,
};
