import React from 'react';
import PropTypes from 'prop-types';

function ContentMode(props) {
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

ContentMode.propTypes = {
  cssIdentifier: PropTypes.string,
};

ContentMode.defaultProps = {
  cssIdentifier: 'default',
};

export default ContentMode;
