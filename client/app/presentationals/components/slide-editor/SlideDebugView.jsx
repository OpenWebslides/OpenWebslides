import React from 'react';
import PropTypes from 'prop-types';

function SlideDebugView(props) {
  if (props.nestedContentItems) {
    return (
      <div
        className={`c_editor-debug-view c_editor-debug-view--${props.cssIdentifier}`}
      >
        <div className="c_editor-debug-view__wrapper">
          <div className="o_code-block">
            <div className="o_code-block__wrapper">
              <pre><code>{JSON.stringify(
                props.nestedContentItems,
                null,
                2,
              )}</code></pre>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <p>Loading...</p>;
}

SlideDebugView.propTypes = {
  cssIdentifier: PropTypes.string,
  nestedContentItems: PropTypes.arrayOf(PropTypes.object),
};

SlideDebugView.defaultProps = {
  cssIdentifier: 'default',
  nestedContentItems: [],
};

export default SlideDebugView;
