import React from 'react';
import PropTypes from 'prop-types';

import EditorSlideView from './EditorSlideView';
import EditorContentView from './EditorContentView';

function EditorViewsPanel(props) {
  return (
    <div
      className={`c_editor-views-panel c_editor-views-panel--${props.cssIdentifier}`}
    >
      <div className="c_editor-views-panel__wrapper">
        <div className="c_editor-views-panel__switcher">
          <menu>
            <li>[Slide view]</li>
            <li>[Content view]</li>
            <li><del>[Print view]</del></li>
            <li><del>[Document view]</del></li>
          </menu>
        </div>
        <div className="c_editor-views-panel__views-list">
          <div className="c_editor-views-panel__views-item">
            <EditorSlideView />
          </div>
          <div className="c_editor-views-panel__views-item">
            <EditorContentView />
          </div>
        </div>
      </div>
    </div>
  );
}

EditorViewsPanel.propTypes = {
  cssIdentifier: PropTypes.string.isRequired,
};

EditorViewsPanel.defaultProps = {
  cssIdentifier: 'default',
};

export default EditorViewsPanel;
