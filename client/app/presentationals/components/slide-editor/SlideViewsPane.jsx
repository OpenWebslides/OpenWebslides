import React from 'react';
import PropTypes from 'prop-types';

import SlideLiveViewContainer
  from 'containers/slide-editor/SlideLiveViewContainer';
// import ModeMenu from './ViewsMenu';

function SlideViewsPane(props) {
  return (
    <div
      className={`c_editor-views-panel c_editor-views-panel--${props.cssIdentifier}`}
    >
      <div className="c_editor-views-panel__wrapper">
        {/* <div className="c_editor-views-panel__switcher">
          <ModeMenu />
        </div>*/}
        <div className="c_editor-views-panel__views-list">
          <div className="c_editor-views-panel__views-item">
            <SlideLiveViewContainer />
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

SlideViewsPane.propTypes = {
  cssIdentifier: PropTypes.string,
};

SlideViewsPane.defaultProps = {
  cssIdentifier: 'default',
};

export default SlideViewsPane;
