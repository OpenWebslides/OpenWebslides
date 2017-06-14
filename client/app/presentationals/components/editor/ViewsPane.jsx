import React from 'react';
import PropTypes from 'prop-types';

import ViewsMenu from './ViewsMenu';
import SlideView from './SlideView';

function ViewsPane(props) {
  return (
    <div
      className={`c_editor-views-panel c_editor-views-panel--${props.cssIdentifier}`}
    >
      <div className="c_editor-views-panel__wrapper">
        <div className="c_editor-views-panel__switcher">
          <ViewsMenu />
        </div>
        <div className="c_editor-views-panel__views-list">
          <div className="c_editor-views-panel__views-item">
            <SlideView activeSlide={props.activeSlide} />
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

ViewsPane.propTypes = {
  cssIdentifier: PropTypes.string,
  activeSlide: PropTypes.node.isRequired,
};

ViewsPane.defaultProps = {
  cssIdentifier: 'default',
};

export default ViewsPane;
