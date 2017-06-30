import React from 'react';
import PropTypes from 'prop-types';

function SlideContentView(props) {
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

SlideContentView.propTypes = {
  cssIdentifier: PropTypes.string,
};

SlideContentView.defaultProps = {
  cssIdentifier: 'default',
};

export default SlideContentView;
