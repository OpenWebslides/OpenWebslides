import React from 'react';
import PropTypes from 'prop-types';

import EditorSlideView from './EditorSlideView';
// import EditorContentView from './EditorContentView';
import SwitcherMenu from './SwitcherMenu';

function EditorViewsPanel(props) {
  return (
    <div
      className={`c_editor-views-panel c_editor-views-panel--${props.cssIdentifier}`}
    >
      <div className="c_editor-views-panel__wrapper">
        <div className="c_editor-views-panel__switcher">
          <SwitcherMenu />
        </div>
        <div className="c_editor-views-panel__views-list">
          <div className="c_editor-views-panel__views-item">
            <EditorSlideView>{props.activeSlide}</EditorSlideView>
          </div>
          {/* #TODO
          <div className="c_editor-views-panel__views-item">
            <EditorContentView />
          </div> */}
        </div>
      </div>
    </div>
  );
}

EditorViewsPanel.propTypes = {
  cssIdentifier: PropTypes.string.isRequired,
  activeSlide: PropTypes.arrayOf(PropTypes.element).isRequired,
};

EditorViewsPanel.defaultProps = {
  cssIdentifier: 'default',
};

export default EditorViewsPanel;
