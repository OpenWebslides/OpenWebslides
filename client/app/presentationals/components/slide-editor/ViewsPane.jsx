import React from 'react';
import PropTypes from 'prop-types';

import SlideView from 'containers/slide-editor/SlideViewContainer';
// import ModeMenu from './ViewsMenu';

function ViewsPane(props) {
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
            <SlideView />
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
};

ViewsPane.defaultProps = {
  cssIdentifier: 'default',
};

export default ViewsPane;
