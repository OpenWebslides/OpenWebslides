import React, { Component } from 'react';

import {
  getSelectionOffsets,
  setSelectionByOffsets,
} from 'lib/content-editable/selectionOffsets';

import {
  inlinePropertyTypes,
  addInlinePropertyToArray,
  updateInlinePropertiesAfterInputAtIndex,
  getHTMLStringFromInlinePropertiesAndText,
} from 'lib/content-editable/inlineProperties';

import { getFilteredTextContent } from 'lib/content-editable/textContent';

export default class ContentEditable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: this.props.contentBlock.text,
      inlineProperties: this.props.contentBlock.inlineProperties,
      selectionOffsets: {
        start: 0,
        end: 0,
      },
      focused: false,
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidUpdate() {
    if (this.state.focused) {
      setSelectionByOffsets(
        this.contentEditable,
        this.state.selectionOffsets.start,
        this.state.selectionOffsets.end,
      );
    }
  }

  updateSelectionOffsets() {
    this.setState({
      selectionOffsets: getSelectionOffsets(this.contentEditable),
    });
  }

  // Prevent users from inserting newlines in the contenteditable field.
  handleKeyPress(e) {
    const blacklist = ['Enter'];
    if (blacklist.indexOf(e.key) >= 0) {
      // if the pressed key is in the blacklist, don't execute the event
      e.preventDefault();
      console.log(getSelectionOffsets(this.contentEditable)); // #TODO remove debug
    }
    // else, proceed as normal

    // keep caret position in the state
    this.updateSelectionOffsets();
  }

  // Map state to contenteditable innerHTML.
  handleInput() {
    const text = getFilteredTextContent(this.contentEditable);
    const selectionOffsets = getSelectionOffsets(this.contentEditable);
    // get copy of current inlineProperties
    const inlineProperties = this.state.inlineProperties.slice();
    const amount = text.length - this.state.text.length;

    this.updateSelectionOffsets();

    console.log(amount);
    console.log(JSON.stringify(inlineProperties));

    updateInlinePropertiesAfterInputAtIndex(
      inlineProperties,
      selectionOffsets.start,
      amount,
    );

    console.log(JSON.stringify(inlineProperties));

    this.setState({
      inlineProperties,
      text,
    });
  }

  handleFocus() {
    this.updateSelectionOffsets();
    this.setState({
      focused: true,
    });
  }

  handleBlur() {
    this.updateSelectionOffsets();
    this.setState({
      focused: false,
    });
  }

  handleMenuButtonClick(inlinePropertyType) {
    // get copy of current inlineProperties
    const inlineProperties = this.state.inlineProperties.slice();
    // get current selection
    const selectionOffsets = getSelectionOffsets(this.contentEditable);
    // create new inlineProperty object
    const newInlineProperty = {
      type: inlinePropertyType,
      startsAtChar: selectionOffsets.start,
      endsAtChar: selectionOffsets.end,
    };

    // add the new inline property to the copied array
    addInlinePropertyToArray(inlineProperties, newInlineProperty);

    // set the new inlineProperties array in the state
    // and move the caret to the end of the new inlineProperty
    this.setState({
      inlineProperties,
      seletionOffsets: {
        start: selectionOffsets.end,
        end: selectionOffsets.end,
      },
    });
  }

  render() {
    return (
      <span
        className={`o_content-editable ${this.state.focused
          ? 'has_focus'
          : ''}`}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <span className="o_content-editable__wrapper">
          <span className="o_content-editable__menu list" role="toolbar">
            <span className="o_content-editable__menu-item list__item">
              <button
                className="o_content-editable__menu-button o_content-editable__menu-button--id_strong"
                tabIndex="-1"
                onClick={() =>
                  this.handleMenuButtonClick(inlinePropertyTypes.STRONG)}
              >
                <span className="o_content-editable__menu-text">
                  Strong
                </span>
              </button>
            </span>
            <span className="o_content-editable__menu-item list__item">
              <button
                className="o_content-editable__menu-button o_content-editable__menu-button--id_em"
                tabIndex="-1"
                onClick={() =>
                  this.handleMenuButtonClick(inlinePropertyTypes.EMPHASIS)}
              >
                <span className="o_content-editable__menu-text">
                  Emphasis
                </span>
              </button>
            </span>
          </span>
          <span
            className="o_content-editable__input"
            contentEditable="true"
            role="textbox"
            ref={contentEditable => {
              this.contentEditable = contentEditable;
            }}
            onKeyPress={this.handleKeyPress}
            onInput={this.handleInput}
            dangerouslySetInnerHTML={{
              __html: getHTMLStringFromInlinePropertiesAndText(
                this.state.inlineProperties,
                this.state.text,
              ),
            }}
            placeholder="Type something..."
          />
        </span>
      </span>
    );
  }
}
