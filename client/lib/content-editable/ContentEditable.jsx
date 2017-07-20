import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'seamless-immutable';

import { getSelectionOffsets, setSelectionByOffsets } from 'lib/content-editable/selectionOffsets';
import inlinePropertyTypes from 'constants/inlinePropertyTypes';

import {
  addInlinePropertyToArray,
  updateInlinePropertiesAfterInputAtIndex,
  getHTMLStringFromInlinePropertiesAndText,
} from 'lib/content-editable/inlineProperties';

import getFilteredTextContent from 'lib/content-editable/textContent';

class ContentEditable extends Component {
  constructor(props) {
    super(props);

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidUpdate() {
    if (this.props.contentItem.id === this.props.activeContentItemId) {
      setSelectionByOffsets(this.contentEditable, this.props.selectionOffsets.start, this.props.selectionOffsets.end);
    }
  }

  // Prevent users from inserting newlines in the contenteditable field.
  handleKeyPress(e) {
    const blacklist = ['Enter'];
    if (blacklist.indexOf(e.key) >= 0) {
      // if the pressed key is in the blacklist, don't execute the event
      e.preventDefault();
    }

    this.props.updateSelection(getSelectionOffsets(this.contentEditable));
  }

  // Map state to contenteditable innerHTML.
  handleInput() {
    const text = getFilteredTextContent(this.contentEditable);
    const selectionOffsets = getSelectionOffsets(this.contentEditable);

    const inlineProperties = Immutable.asMutable(this.props.contentItem.inlineProperties, { deep: true });
    const amount = text.length - this.props.contentItem.text.length;

    this.props.updateSelection(getSelectionOffsets(this.contentEditable));

    updateInlinePropertiesAfterInputAtIndex(inlineProperties, selectionOffsets.start, amount);

    this.props.updateContentBlock(this.props.contentItem.id, text, inlineProperties);
  }

  handleFocus() {
    this.props.setActiveContentBlock(this.props.contentItem.id);
    this.props.updateSelection(getSelectionOffsets(this.contentEditable));
  }

  handleBlur() {
    this.props.setActiveContentBlock(null);
    this.props.updateSelection(getSelectionOffsets(this.contentEditable));
  }

  handleMenuButtonClick(inlinePropertyType) {
    // get copy of current inlineProperties
    const inlineProperties = Immutable.asMutable(this.props.contentItem.inlineProperties, { deep: true });
    // get current selection
    const selectionOffsets = getSelectionOffsets(this.contentEditable);
    // create new inlineProperty object
    const newInlineProperty = {
      type: inlinePropertyType,
      offSets: {
        start: selectionOffsets.start,
        end: selectionOffsets.end,
      },
    };

    // add the new inline property to the copied array
    addInlinePropertyToArray(inlineProperties, newInlineProperty);

    // set the new inlineProperties array in the state
    // and move the caret to the end of the new inlineProperty
    this.props.updateContentBlock(this.props.contentItem.id, this.props.contentItem.text, inlineProperties);
    this.props.updateSelection({
      start: selectionOffsets.end,
      end: selectionOffsets.end,
    });
  }

  render() {
    return (
      <span
        className={`o_content-editable ${this.props.contentItem.id === this.props.activeContentItemId ? 'has_focus' : ''}`}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <span className="o_content-editable__wrapper">
          <span className="o_content-editable__menu list" role="toolbar">
            <span className="o_content-editable__menu-item list__item">
              <button
                className="o_content-editable__menu-button o_content-editable__menu-button--id_strong"
                tabIndex="-1"
                onClick={() => this.handleMenuButtonClick(inlinePropertyTypes.STRONG)}
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
                onClick={() => this.handleMenuButtonClick(inlinePropertyTypes.EM)}
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
                this.props.contentItem.inlineProperties,
                this.props.contentItem.text,
              ),
            }}
            placeholder="Type something..."
          />
        </span>
      </span>
    );
  }
}

ContentEditable.propTypes = {
  contentItem: PropTypes.object.isRequired,
  activeContentItemId: PropTypes.string,
  selectionOffsets: PropTypes.object.isRequired,
  setActiveContentBlock: PropTypes.func.isRequired,
  updateContentBlock: PropTypes.func.isRequired,
  updateSelection: PropTypes.func.isRequired,
};

ContentEditable.defaultProps = {
  activecontentItemId: null,
};

export default ContentEditable;