import React from 'react';
import PropTypes from 'prop-types';

import SlideContainer from 'containers/slide-editor/SlideContainer';

function SlideLiveView(props) {
  if (props.activeSlideId) {
    return (
      <div className={`c_editor-slide-view c_editor-slide-view--${props.cssIdentifier}`}>
        <div className="c_editor-slide-view__wrapper">
          <SlideContainer id={props.activeSlideId} activeSlideViewtypes={props.activeSlideViewTypes} editable />
        </div>
      </div>
    );
  }

  return <h1>Loading...</h1>;
}

SlideLiveView.propTypes = {
  cssIdentifier: PropTypes.string,
  activeSlideId: PropTypes.string,
  // We need to pass these to the SlideContainer
  // to force a rerender (and thus a resize) when the active slide view types change.
  activeSlideViewTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

SlideLiveView.defaultProps = {
  cssIdentifier: 'default',
  activeSlideId: null,
};

export default SlideLiveView;
