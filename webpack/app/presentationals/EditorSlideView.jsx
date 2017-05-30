import React from 'react';
import PropTypes from 'prop-types';

function EditorSlideView(props) {
  return (
    <div
      className={`c_editor-slide-view c_editor-slide-view--${props.cssIdentifier}`}
    >
      <div className="c_editor-slide-view__wrapper">
        <p>[Slide view goes here]</p>
      </div>
    </div>
  );
}

EditorSlideView.propTypes = {
  cssIdentifier: PropTypes.string.isRequired,
};

EditorSlideView.defaultProps = {
  cssIdentifier: 'default',
};

export default EditorSlideView;
