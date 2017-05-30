import React from 'react';
import PropTypes from 'prop-types';

import EditorViewsPanel from './EditorViewsPanel';

function SlideEditor(props) {
  return (
    <div className={`c_slide-editor c_slide-editor--${props.cssIdentifier}`}>
      <div className="c_slide-editor__wrapper">
        <div className="c_slide-editor__toolbar">
          <p>[Toolbar goes here]</p>
        </div>
        <div className="c_slide-editor__views-panel">
          <EditorViewsPanel />
        </div>
        <div className="c_slide-editor__slide-health">
          <p>[Slide health goes here]</p>
        </div>
      </div>
    </div>
  );
}

SlideEditor.propTypes = {
  cssIdentifier: PropTypes.string.isRequired,
};

SlideEditor.defaultProps = {
  cssIdentifier: 'default',
};

export default SlideEditor;
