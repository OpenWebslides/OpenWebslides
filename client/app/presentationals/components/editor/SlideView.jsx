import React from 'react';
import PropTypes from 'prop-types';
import renderActiveSlide from 'lib/render-active-slide/renderActiveSlide';

function SlideView(props) {
  if (props.activeSlide) {
    const { slides, activeSlide } = props;
    const ActiveSlide = renderActiveSlide(slides[activeSlide]);

    return (
      <div
        className={`c_editor-slide-view c_editor-slide-view--${props.cssIdentifier}`}
      >
        <div className="c_editor-slide-view__wrapper">
          {ActiveSlide}
        </div>
      </div>
    );
  }
  return <h1>Loading...</h1>;
}

SlideView.propTypes = {
  cssIdentifier: PropTypes.string,
  activeSlide: PropTypes.node.isRequired,
  slides: PropTypes.objectOf(Object).isRequired,
};

SlideView.defaultProps = {
  cssIdentifier: 'default',
};

export default SlideView;
