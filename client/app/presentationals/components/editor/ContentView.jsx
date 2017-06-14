import React from 'react';
import PropTypes from 'prop-types';

function ContentView(props) {
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

ContentView.propTypes = {
  cssIdentifier: PropTypes.string,
};

ContentView.defaultProps = {
  cssIdentifier: 'default',
};

export default ContentView;
