import React from 'react';
import PropTypes from 'prop-types';

import Slide from './Slide';

function SlideView(props) {
  return (
    <div
      className={`c_editor-slide-view c_editor-slide-view--${props.cssIdentifier}`}
    >
      <div className="c_editor-slide-view__wrapper">
        <Slide>{props.activeSlide}</Slide>
      </div>
    </div>
  );
}

SlideView.propTypes = {
  cssIdentifier: PropTypes.string,
  activeSlide: PropTypes.node.isRequired,
};

SlideView.defaultProps = {
  cssIdentifier: 'default',
};

export default SlideView;
