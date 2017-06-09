import React from 'react';
import PropTypes from 'prop-types';

import Slide from './Slide';

function SlideMode(props) {
  return (
    <div
      className={`c_editor-slide-view c_editor-slide-view--${props.cssIdentifier}`}
    >
      <div className="c_editor-slide-view__wrapper">
        <Slide>{props.children}</Slide>
      </div>
    </div>
  );
}

SlideMode.propTypes = {
  cssIdentifier: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

SlideMode.defaultProps = {
  cssIdentifier: 'default',
};

export default SlideMode;
