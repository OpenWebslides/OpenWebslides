import React from 'react';
import PropTypes from 'prop-types';

import SlideContainer from './SlideContainer';

function EditorSlideView(props) {
  return (
    <div
      className={`c_editor-slide-view c_editor-slide-view--${props.cssIdentifier}`}
    >
      <div className="c_editor-slide-view__wrapper">
        <SlideContainer>{props.children}</SlideContainer>
      </div>
    </div>
  );
}

EditorSlideView.propTypes = {
  cssIdentifier: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

EditorSlideView.defaultProps = {
  cssIdentifier: 'default',
};

export default EditorSlideView;
