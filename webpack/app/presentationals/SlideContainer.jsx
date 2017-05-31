import React from 'react';
import PropTypes from 'prop-types';

function SlideContainer(props) {
  return (
    <div
      className={`c_slide-container c_slide-container--${props.cssIdentifier}`}
    >
      <div className="c_slide-container__wrapper">
        <div className="c_slide-container__size">
          <div className="c_slide-container__content">
            <p>[Slide content goes here]</p>
          </div>
        </div>
      </div>
    </div>
  );
}

SlideContainer.propTypes = {
  cssIdentifier: PropTypes.string.isRequired,
};

SlideContainer.defaultProps = {
  cssIdentifier: 'default',
};

export default SlideContainer;
