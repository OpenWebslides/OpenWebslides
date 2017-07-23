import React from 'react';
import PropTypes from 'prop-types';

import SlideContainer from 'containers/slide-editor/SlideContainer';

function SlideLiveView(props) {
  if (props.activeSlideId) {
    return (
      <div className={`c_editor-slide-view c_editor-slide-view--${props.cssIdentifier}`}>
        <div className="c_editor-slide-view__wrapper">
          <SlideContainer id={props.activeSlideId} editable />
        </div>
      </div>
    );
  }

  return <h1>Loading...</h1>;
}

SlideLiveView.propTypes = {
  cssIdentifier: PropTypes.string,
  activeSlideId: PropTypes.string,
};

SlideLiveView.defaultProps = {
  cssIdentifier: 'default',
  activeSlideId: null,
};

export default SlideLiveView;
