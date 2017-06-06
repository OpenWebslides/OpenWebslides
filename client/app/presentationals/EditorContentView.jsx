import React from 'react';
import PropTypes from 'prop-types';

function EditorContentView(props) {
  return (
    <div
      className={`c_editor-content-view c_editor-content-view--${props.cssIdentifier}`}
    >
      <div className="c_editor-content-view__wrapper">
        <p>[Content view goes here]</p>
      </div>
    </div>
  );
}

EditorContentView.propTypes = {
  cssIdentifier: PropTypes.string.isRequired,
};

EditorContentView.defaultProps = {
  cssIdentifier: 'default',
};

export default EditorContentView;
