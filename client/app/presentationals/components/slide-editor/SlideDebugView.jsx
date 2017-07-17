import React from 'react';
import PropTypes from 'prop-types';

function SlideDebugView(props) {
  if (props.activeSlide) {
    return (
      <div className={`c_editor-debug-view c_editor-debug-view--${props.cssIdentifier}`}>
        <div className="c_editor-debug-view__wrapper">
          <pre><code>{JSON.stringify(props.nestedContentItems, null, 2)}</code></pre>
        </div>
      </div>
    );
  }

  return <h1>Loading...</h1>;
}

SlideDebugView.propTypes = {
  cssIdentifier: PropTypes.string,
  activeSlide: PropTypes.objectOf(Object),
};

SlideDebugView.defaultProps = {
  cssIdentifier: 'default',
  activeSlide: null,
};

export default SlideDebugView;
