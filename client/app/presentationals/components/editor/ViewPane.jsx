import React from 'react';
import PropTypes from 'prop-types';

import ModeMenu from './ViewsMenu';
import SlideMode from './SlideView';

function ViewPane(props) {
  return (
    <div
      className={`c_editor-views-panel c_editor-views-panel--${props.cssIdentifier}`}
    >
      <div className="c_editor-views-panel__wrapper">
        <div className="c_editor-views-panel__switcher">
          <ModeMenu />
        </div>
        <div className="c_editor-views-panel__views-list">
          <div className="c_editor-views-panel__views-item">
            <SlideMode>{props.activeSlide}</SlideMode>
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

ViewPane.propTypes = {
  cssIdentifier: PropTypes.string,
  activeSlide: PropTypes.arrayOf(PropTypes.element).isRequired,
};

ViewPane.defaultProps = {
  cssIdentifier: 'default',
};

export default ViewPane;
