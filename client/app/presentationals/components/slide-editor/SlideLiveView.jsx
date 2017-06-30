import React from 'react';
import PropTypes from 'prop-types';
import renderActiveSlide from 'lib/convert-to-react/renderActiveSlide';

function SlideLiveView(props) {
  if (props.activeSlide) {
    const ActiveSlide = renderActiveSlide(props.activeSlide);

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

SlideLiveView.propTypes = {
  cssIdentifier: PropTypes.string,
  activeSlide: PropTypes.objectOf(Object),
};

SlideLiveView.defaultProps = {
  cssIdentifier: 'default',
  activeSlide: null,
};

export default SlideLiveView;
