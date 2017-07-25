import React from 'react';
import PropTypes from 'prop-types';

import SlideEditingPaneToolbarContainer from 'containers/slide-editor/SlideEditingPaneToolbarContainer';
import SlideViewsPaneContainer from 'containers/slide-editor/SlideViewsPaneContainer';

function SlideEditingPane(props) {
  return (
    <div className={`c_slide-editor c_slide-editor--${props.cssIdentifier}`}>
      <div className="c_slide-editor__wrapper">
        <div className="c_slide-editor__item c_slide-editor__item--toolbar">
          <SlideEditingPaneToolbarContainer />
        </div>
        <div className="c_slide-editor__item c_slide-editor__item--views-panel">
          <SlideViewsPaneContainer />
        </div>
        {/* #TODO
      <div className="c_slide-editor__item c_slide-editor__item--slide-health">
        <p>[Slide health goes here]</p>
      </div> */}
      </div>
    </div>
  );
}

SlideEditingPane.propTypes = {
  cssIdentifier: PropTypes.string,
};

SlideEditingPane.defaultProps = {
  cssIdentifier: 'default',
};

export default SlideEditingPane;
