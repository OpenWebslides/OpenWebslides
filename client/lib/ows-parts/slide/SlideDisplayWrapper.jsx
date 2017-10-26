import React from 'react';
import PropTypes from 'prop-types';

import { slideShape } from 'constants/propTypeShapes';

function SlideDisplayWrapper(props) {
  const {
    slide,
    slideIndexInDeck,
    numberOfSlidesInDeck,
    children,
  } = props;

  return (
    <div
      className="ows_slide"
      data-slide-position={slideIndexInDeck + 1}
      data-slide-count={numberOfSlidesInDeck}
      data-level={slide.level}
    >
      <div className="ows_slide__overflow">
        <div className="ows_slide__wrapper">
          {children}
        </div>
      </div>
    </div>
  );
}

SlideDisplayWrapper.propTypes = {
  slide: PropTypes.shape(slideShape).isRequired,
  numberOfSlidesInDeck: PropTypes.number.isRequired,
  slideIndexInDeck: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default SlideDisplayWrapper;
