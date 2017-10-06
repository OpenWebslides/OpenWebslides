import _ from 'lodash';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  addInlinePropertyToArray,
  updateInlinePropertiesAfterInputAtIndex,
  getHTMLStringFromInlinePropertiesAndText,
} from 'lib/content-editable/inlineProperties';

import getFilteredTextContent from 'lib/content-editable/textContent';

import { contentItemTypes } from 'constants/contentItemTypes';

import {
  getSelectionOffsets,
  setSelectionByOffsets,
} from 'lib/content-editable/selectionOffsets';
import { inlinePropertyTypes } from 'constants/inlinePropertyTypes';

import LinkModal from './LinkModal';

class ContentEditable extends Component {

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
      setSelectionByOffsets(
        this.contentEditable,
        this.props.selectionOffsets.start,
        this.props.selectionOffsets.end,
      );
    }
  }

  handleKeyDown(e) {
    const { contentItem, slideId, ancestorItemIds } = this.props;

    if (e.key === 'Enter') {
      let newContentItemType;

      if (contentItem.contentItemType === contentItemTypes.LIST_ITEM) {
        newContentItemType = contentItemTypes.LIST_ITEM;
      }
      else {
        newContentItemType = contentItemTypes.PARAGRAPH;
      }

      this.props.addContentItemToSlide(
          slideId,
          newContentItemType,
          {},
          _.last(ancestorItemIds),
          contentItem.id,
        );
    }
    // If backspace is pressed on an empty contentItem, delete the contentItem
    // and jump to the previous one.
    else if (e.key === 'Backspace') {
      if (contentItem.text === '') {
        e.preventDefault();
        this.props.deleteContentItemFromSlide(
          slideId,
          contentItem.id,
          ancestorItemIds,
        );
      }
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
      const inlineProperties = this.props.contentItem.inlineProperties.asMutable({ deep: true });
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
    this.props.setFocusedContentItemId(
      this.props.contentItem.id,
      getSelectionOffsets(this.contentEditable),
      this.props.slideViewType,
    );
  }

  handleBlur() {
    this.props.setFocusedContentItemId(
      null,
      getSelectionOffsets(this.contentEditable),
      null,
    );
  }

  handleMenuButtonClick(inlinePropertyType) {
    this.props.setSelectionOffsets(getSelectionOffsets(this.contentEditable));

    if (inlinePropertyType === inlinePropertyType.LINK) {
      this.setState({ linkModalOpen: true });
    }
    else {
      this.handleContentItemUpdate(inlinePropertyType, {});
    }
  }

  handleContentItemUpdate(inlinePropertyType, attributes) {
    const selectionOffsets = this.props.selectionOffsets;

    // get copy of current inlineProperties
    const inlineProperties = this.props.contentItem.inlineProperties.asMutable({ deep: true });

    // create new inlineProperty object
    const newInlineProperty = {
      type: inlinePropertyType,
      offsets: {
        start: selectionOffsets.start,
        end: selectionOffsets.end,
      },
      attributes,
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

  handleLinkModalOpen() {
    this.setState({ linkModalOpen: true });
  }

  handleLinkModalClose() {
    this.setState({ linkModalOpen: false });
  }

  handleAddLink(url) {
    this.setState({ linkModalOpen: false });

    this.handleContentItemUpdate(inlinePropertyTypes.LINK, { href: url });
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
                  className="o_content-editable__menu-button o_content-editable__menu-button--id_link"
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
                  className="o_content-editable__menu-button o_content-editable__menu-button--id_sup"
                  tabIndex="-1"
                  onClick={() =>
                    this.handleMenuButtonClick(inlinePropertyTypes.SUP)}
                >
                  <span className="o_content-editable__menu-text">
                    Super
                  </span>
                </button>
              </span>

              <span className="o_content-editable__menu-item list__item">
                <button
                  className="o_content-editable__menu-button o_content-editable__menu-button--id_sub"
                  tabIndex="-1"
                  onClick={() =>
                    this.handleMenuButtonClick(inlinePropertyTypes.SUB)}
                >
                  <span className="o_content-editable__menu-text">
                    Super
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
  textPropName: PropTypes.string.isRequired,
  hasInlineProperties: PropTypes.bool.isRequired,
  isFocused: PropTypes.bool.isRequired,
  slideViewType: PropTypes.string.isRequired,
  selectionOffsets: PropTypes.shape({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
  }).isRequired,
  setFocusedContentItemId: PropTypes.func.isRequired,
  updateContentItem: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func,
};

ContentEditable.defaultProps = {
  handleKeyDown: null,
};

export default ContentEditable;
