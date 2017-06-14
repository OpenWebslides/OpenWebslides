import React from 'react';
import PropTypes from 'prop-types';

import ViewsPane from './ViewsPane';

function EditingPane(props) {
  const activeSlide = <h1>Dummy slide content</h1>;

  return (
    <div className={`c_slide-editor c_slide-editor--${props.cssIdentifier}`}>
      <div className="c_slide-editor__wrapper">
        {/* <div className="c_slide-editor__item c_slide-editor__item--toolbar">
          <p>[Toolbar goes here]</p>
        </div> */}
        <div className="c_slide-editor__item c_slide-editor__item--views-panel">
          <ViewsPane activeSlide={activeSlide} />
        </div>
        {/* #TODO
        <div className="c_slide-editor__item c_slide-editor__item--slide-health">
          <p>[Slide health goes here]</p>
        </div> */}
      </div>
    </div>
  );
}

EditingPane.propTypes = {
  cssIdentifier: PropTypes.string,
};

EditingPane.defaultProps = {
  cssIdentifier: 'default',
};

export default EditingPane;
