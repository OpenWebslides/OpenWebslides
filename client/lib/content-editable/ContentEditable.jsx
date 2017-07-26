import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'seamless-immutable';

import {
  addInlinePropertyToArray,
  updateInlinePropertiesAfterInputAtIndex,
  getHTMLStringFromInlinePropertiesAndText,
} from 'lib/content-editable/inlineProperties';

import getFilteredTextContent from 'lib/content-editable/textContent';

import {
  getSelectionOffsets,
  setSelectionByOffsets,
} from 'lib/content-editable/selectionOffsets';
import inlinePropertyTypes from 'constants/inlinePropertyTypes';

import LinkModal from './LinkModal';

class ContentEditable extends Component {
  loadSelectionOffsets() {
    if (this.props.isFocused) {
      setSelectionByOffsets(
        this.contentEditable,
        this.props.selectionOffsets.start,
        this.props.selectionOffsets.end,
      );
    }
  }

  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleLinkModalClose = this.handleLinkModalClose.bind(this);
    this.handleLinkModalOpen = this.handleLinkModalOpen.bind(this);
    this.handleAddLink = this.handleAddLink.bind(this);

    this.state = {
      linkModalOpen: false,
    };
  }

  componentDidMount() {
    this.loadSelectionOffsets();
  }

  componentDidUpdate() {
    this.loadSelectionOffsets();
  }

  loadSelectionOffsets() {
    if (this.props.isFocused) {
      setSelectionByOffsets(this.contentEditable, this.props.selectionOffsets.start, this.props.selectionOffsets.end);
    }
  }

  handleKeyDown(e) {
    // Prevent users from inserting newlines in the contenteditable field.
    const blacklist = ['Enter'];

    if (blacklist.indexOf(e.key) >= 0) {
      // If the pressed key is in the blacklist, don't execute the event.
      e.preventDefault();
    }

    // Containers may add an extra keypress handler.
    if (this.props.handleKeyDown !== null) {
      this.props.handleKeyDown(e, this.props.contentItem);
    }
  }

  // Map state to contenteditable innerHTML.
  handleInput() {
    const text = getFilteredTextContent(this.contentEditable);
    const selectionOffsets = getSelectionOffsets(this.contentEditable);

    let props = {
      [this.props.textPropName]: text,
    };

    if (this.props.hasInlineProperties) {
      const inlineProperties = Immutable.asMutable(
        this.props.contentItem.inlineProperties,
        { deep: true },
      );
      const amount =
        text.length - this.props.contentItem[this.props.textPropName].length;
      updateInlinePropertiesAfterInputAtIndex(
        inlineProperties,
        selectionOffsets.start,
        amount,
      );

      props = { ...props, inlineProperties };
    }

    this.props.updateContentItem(
      this.props.contentItem.id,
      props,
      getSelectionOffsets(this.contentEditable),
    );
  }

  handleFocus() {
    this.props.setActiveContentItemId(
      this.props.contentItem.id,
      getSelectionOffsets(this.contentEditable),
      this.props.slideViewType,
    );
  }

  handleBlur() {
    this.props.setActiveContentItemId(
      null,
      getSelectionOffsets(this.contentEditable),
      null,
    );
  }

  handleMenuButtonClick(inlinePropertyType) {
    // get copy of current inlineProperties
    const inlineProperties = Immutable.asMutable(
      this.props.contentItem.inlineProperties,
      { deep: true },
    );
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
    this.props.updateContentItem(
      this.props.contentItem.id,
      {
        inlineProperties,
      },
      {
        start: selectionOffsets.end,
        end: selectionOffsets.end,
      },
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props || nextState !== this.state;
  }

  handleLinkModalOpen() {
    this.setState({ linkModalOpen: true });
  }

  handleLinkModalClose() {
    this.setState({ linkModalOpen: false });
  }

  handleAddLink(url) {
    this.setState({ linkModalOpen: false });
    console.log(url);
  }

  render() {
    return (
      <span
        className={`o_content-editable ${this.props.isFocused
          ? 'has_focus'
          : ''}`}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <LinkModal
          isOpen={this.state.linkModalOpen}
          onAdd={this.handleAddLink}
          onClose={this.handleLinkModalClose}
        />

        <span className="o_content-editable__wrapper">
          {this.props.hasInlineProperties &&
            <span className="o_content-editable__menu list" role="toolbar">
              <span className="o_content-editable__menu-item list__item">
                <button
                  className="o_content-editable__menu-button"
                  tabIndex="-1"
                  onClick={() => this.handleLinkModalOpen()}
                >
                  <span className="o_content-editable__menu-text">
                    Link
                  </span>
                </button>
              </span>
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
                    this.handleMenuButtonClick(inlinePropertyTypes.EM)}
                >
                  <span className="o_content-editable__menu-text">
                    Emphasis
                  </span>
                </button>
              </span>
            </span>}
          <span
            className="o_content-editable__input"
            contentEditable="true"
            role="textbox"
            ref={(contentEditable) => {
              this.contentEditable = contentEditable;
            }}
            onKeyDown={this.handleKeyDown}
            onInput={this.handleInput}
            dangerouslySetInnerHTML={{
              __html: getHTMLStringFromInlinePropertiesAndText(
                this.props.hasInlineProperties
                  ? this.props.contentItem.inlineProperties
                  : {},
                this.props.contentItem[this.props.textPropName],
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
  contentItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  updateDeck: PropTypes.func.isRequired,
  textPropName: PropTypes.string.isRequired,
  hasInlineProperties: PropTypes.bool.isRequired,
  isFocused: PropTypes.bool.isRequired,
  slideViewType: PropTypes.string.isRequired,
  selectionOffsets: PropTypes.shape({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
  }).isRequired,
  setActiveContentItemId: PropTypes.func.isRequired,
  updateContentItem: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func,
};

ContentEditable.defaultProps = {
  handleKeyDown: null,
};

export default ContentEditable;
