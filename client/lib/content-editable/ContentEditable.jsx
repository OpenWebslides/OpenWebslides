import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { selectionOffsetsShape, inlinePropertyShape } from 'constants/propTypeShapes';

import getHtmlStringFromInlinePropertiesAndText from 'lib/getHtmlStringFromInlinePropertiesAndText';
import { getSelectionOffsets, setSelectionByOffsets } from 'lib/content-editable/selectionOffsets';
import getFilteredTextContent from 'lib/content-editable/textContent';
import {
  addInlinePropertyToArray,
  updateInlinePropertiesAfterInputAtIndex,
} from 'lib/content-editable/inlineProperties';

import ContentEditableMenu from './ContentEditableMenu';

class ContentEditable extends Component {

  // !!! IMPORTANT !!!
  // !!! DO NOT ADD ANYTHING TO DO WITH CONTENTITEMS TO THIS FILE. !!!

  constructor(props) {
    super(props);

    this.hasInlineProperties = (props.inlineProperties !== null);

    this.handleMenuInlinePropertyAdd = this.handleMenuInlinePropertyAdd.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount() {
    this.loadSelectionOffsets();
  }

  componentDidUpdate() {
    this.loadSelectionOffsets();
  }

  handleMenuInlinePropertyAdd(
    inlinePropertyType,
    inlinePropertyAttributes,
    inlinePropertyOffsets,
  ) {
    if (this.props.onInput !== null) {
      // Deep copy inlineProperties array.
      const newInlineProperties = JSON.parse(JSON.stringify(this.props.inlineProperties));

      // Create new inlineProperty object.
      const newInlineProperty = {
        type: inlinePropertyType,
        offsets: {
          start: inlinePropertyOffsets.start,
          end: inlinePropertyOffsets.end,
        },
        attributes: inlinePropertyAttributes,
      };

      // Add the new inline property to the copied array.
      addInlinePropertyToArray(newInlineProperties, newInlineProperty);

      // Move the caret to the end of the new inlineProperty.
      const newSelectionOffsets = {
        start: inlinePropertyOffsets.end,
        end: inlinePropertyOffsets.end,
      };

      this.props.onInput(this.props.textContent, newInlineProperties, newSelectionOffsets);
    }
  }

  handleInput() {
    if (this.props.onInput !== null) {
      const selectionOffsets = getSelectionOffsets(this.contentEditable);
      const newTextContent = getFilteredTextContent(this.contentEditable);
      let newInlineProperties = null;

      if (this.hasInlineProperties) {
        // Deep copy inlineProperties array.
        newInlineProperties = JSON.parse(JSON.stringify(this.props.inlineProperties));
        // Calculate the 'distance' of the string that has changed.
        const amount = newTextContent.length - this.props.textContent.length;
        // Update the inlineProperties offsets with the added / deleted amount.
        updateInlinePropertiesAfterInputAtIndex(
          newInlineProperties,
          selectionOffsets.start,
          amount,
        );
      }

      this.props.onInput(newTextContent, newInlineProperties, selectionOffsets);
    }
  }

  handleKeyDown(e) {
    // Prevent users from inserting newlines in the contenteditable field.
    const blacklist = ['Enter'];

    if (blacklist.indexOf(e.key) >= 0) {
      // If the pressed key is in the blacklist, don't execute the event.
      e.preventDefault();
    }

    // Containers may add their own extra keydown handler.
    if (this.props.onKeyDown !== null) {
      this.props.onKeyDown(e);
    }
  }

  handleFocus() {
    if (this.props.onFocus !== null) {
      this.props.onFocus(getSelectionOffsets(this.contentEditable));
    }
  }

  handleBlur() {
    if (this.props.onBlur !== null) {
      this.props.onBlur(getSelectionOffsets(this.contentEditable));
    }
  }

  loadSelectionOffsets() {
    if (this.props.isFocused) {
      setSelectionByOffsets(
        this.contentEditable,
        this.props.initialSelectionOffsets.start,
        this.props.initialSelectionOffsets.end,
      );
    }
  }

  render() {
    return (
      <span
        className={`o_content-editable ${this.props.isFocused
          ? 'has_focus'
          : ''} ${this.props.isSingleLine ? 'o_content-editable--single-line' : ''}`}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <span className="o_content-editable__wrapper">
          {
            this.hasInlineProperties &&
            <ContentEditableMenu
              getSelectionOffsets={() => getSelectionOffsets(this.contentEditable)}
              onInlinePropertyAdd={this.handleMenuInlinePropertyAdd}
            />
          }
          <span
            className="o_content-editable__input"
            contentEditable="true"
            role="textbox"
            tabIndex={0}
            ref={(contentEditable) => {
              this.contentEditable = contentEditable;
            }}
            onKeyDown={this.handleKeyDown}
            onInput={this.handleInput}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: getHtmlStringFromInlinePropertiesAndText(
                this.props.inlineProperties,
                this.props.textContent,
              ),
            }}
            placeholder={this.props.placeholder}
          />
        </span>
      </span>
    );
  }
}

ContentEditable.propTypes = {
  // The plain text string that the contentEditable should contain; this should not contain HTML.
  textContent: PropTypes.string.isRequired,
  // Defines the inline HTML elements that should be entered into the textContent string. If this
  // property is not passed, the inlineProperty buttons in the contentEditable will be disabled.
  inlineProperties: PropTypes.arrayOf(PropTypes.shape(inlinePropertyShape)),
  // Defines the selection offsets when the contentEditable is intially rendered.
  initialSelectionOffsets: PropTypes.shape(selectionOffsetsShape).isRequired,
  // True if this contentEditable should initially be focused; false if not.
  isFocused: PropTypes.bool.isRequired,
  // True if this contentEditable should display it's text on a single line, instead of wrapping it
  // when the text is too long.
  isSingleLine: PropTypes.bool,
  // Placeholder text in an empty contentEditable.
  placeholder: PropTypes.string,
  // This function is called when the contentEditable receives focus.
  onFocus: PropTypes.func,
  // This function is called when the contentEditable loses focus.
  onBlur: PropTypes.func,
  // This function is called when a key is pressed in the contentEditable.
  onKeyDown: PropTypes.func,
  // This function is called when the textContent and/or is changed.
  onInput: PropTypes.func,
};

ContentEditable.defaultProps = {
  inlineProperties: null,
  isSingleLine: false,
  placeholder: 'Type something...',
  onFocus: null,
  onBlur: null,
  onKeyDown: null,
  onInput: null,
};

export default ContentEditable;
