import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { contentItemShape, selectionOffsetsShape } from 'constants/propTypeShapes';

import ContentEditable from 'lib/content-editable/ContentEditable';
import makeContentItemEditable from '../../higher-order-components/makeContentItemEditable';

class ContentItemContentEditable extends Component {
  constructor(props) {
    super(props);

    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleFocus(newSelectionOffsets) {
    this.props.onFocusContentItem(newSelectionOffsets, this.props.textPropName);
  }

  handleBlur(newSelectionOffsets) {
    this.props.onBlurContentItem(newSelectionOffsets);
  }

  handleKeyDown(e) {
    const { contentItem, textPropName } = this.props;

    if (e.key === 'Enter') {
      e.preventDefault();
      this.props.onAddNewContentItem();
    }
    // If backspace is pressed on an empty contentItem,
    // delete the contentItem and jump to the previous one (happens automatically).
    else if (e.key === 'Backspace' && this.props.deleteOnBackspace) {
      if (contentItem[textPropName] === '') {
        e.preventDefault();
        this.props.onDeleteContentItem();
      }
    }
  }

  handleInput(newTextContent, newInlineProperties, newSelectionOffsets) {
    const newProps = {
      [this.props.textPropName]: newTextContent,
    };

    if (this.props.hasInlineProperties) {
      newProps.inlineProperties = newInlineProperties;
    }

    this.props.onUpdateContentItem(newProps, newSelectionOffsets);
  }

  render() {
    const {
      contentItem,
      textPropName,
      hasInlineProperties,
      contentEditableOptions,
      initialSelectionOffsets,
      isFocused,
    } = this.props;

    return (
      <ContentEditable
        textContent={contentItem[textPropName]}
        inlineProperties={(hasInlineProperties) ? contentItem.inlineProperties : null}
        initialSelectionOffsets={initialSelectionOffsets}
        isFocused={isFocused}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        onInput={this.handleInput}
        {...contentEditableOptions}
      />
    );
  }
}

ContentItemContentEditable.propTypes = {
  contentItem: PropTypes.shape(contentItemShape).isRequired,
  textPropName: PropTypes.string.isRequired,
  hasInlineProperties: PropTypes.bool.isRequired,
  deleteOnBackspace: PropTypes.bool,
  contentEditableOptions: PropTypes.shape({
    isSingleLine: PropTypes.bool,
  }),
  // From makeContentItemEditable:
  initialSelectionOffsets: PropTypes.shape(selectionOffsetsShape).isRequired,
  isFocused: PropTypes.bool.isRequired,
  onFocusContentItem: PropTypes.func.isRequired,
  onBlurContentItem: PropTypes.func.isRequired,
  onUpdateContentItem: PropTypes.func.isRequired,
  onDeleteContentItem: PropTypes.func.isRequired,
  onAddNewContentItem: PropTypes.func.isRequired,
};

ContentItemContentEditable.defaultProps = {
  deleteOnBackspace: false,
  contentEditableOptions: {},
};

export default makeContentItemEditable({})(ContentItemContentEditable);
