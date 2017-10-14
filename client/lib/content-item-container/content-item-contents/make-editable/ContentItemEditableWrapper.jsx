import React, { Component } from 'react';
import PropTypes from 'prop-types';

import makeContentItemEditable from '../../higher-order-components/makeContentItemEditable';

class ContentItemEditableWrapper extends Component {

  constructor(props) {
    super(props);

    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleFocus() {
    this.props.onFocusContentItem();
  }

  handleBlur() {
    this.props.onBlurContentItem();
  }

  render() {
    const { children, isFocused, onDeleteContentItem } = this.props;

    return (
      <div
        className={`ows_pass-through ows_editable-wrapper ${isFocused ? 'has_focus' : ''}`}
        // #TODO accessibility
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex="0" // make element focusable
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        {/* #TODO add edit button here for images / iframes / etc. */}
        <button
          onClick={() => onDeleteContentItem()}
          className="ows_editable-wrapper-delete-button"
        >
          <span className="ows_editable-wrapper-delete-button-wrapper">Delete contentItem</span>
        </button>
        {children}
      </div>
    );
  }
}

ContentItemEditableWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  // From makeContentItemEditable:
  isFocused: PropTypes.bool.isRequired,
  onFocusContentItem: PropTypes.func.isRequired,
  onBlurContentItem: PropTypes.func.isRequired,
  onDeleteContentItem: PropTypes.func.isRequired,
};

export default makeContentItemEditable({})(ContentItemEditableWrapper);
