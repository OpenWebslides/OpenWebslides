import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { inlinePropertyTypes } from 'constants/inlinePropertyTypes';

import LinkModal from './LinkModal';

class ContentEditableMenu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      linkModalOpen: false,
      savedSelectionOffsets: null,
    };

    this.handleLinkModalClose = this.handleLinkModalClose.bind(this);
    this.handleLinkModalOpen = this.handleLinkModalOpen.bind(this);
    this.handleMenuButtonClick = this.handleMenuButtonClick.bind(this);
    this.handleAddLink = this.handleAddLink.bind(this);
  }

  handleLinkModalOpen() {
    this.setState({
      linkModalOpen: true,
      savedSelectionOffsets: this.props.getSelectionOffsets(),
    });
  }

  handleLinkModalClose() {
    this.setState({
      linkModalOpen: false,
      savedSelectionOffsets: null,
    });
  }

  handleMenuButtonClick(inlinePropertyType) {
    if (inlinePropertyType === inlinePropertyType.LINK) {
      this.handleLinkModalOpen();
    }
    else {
      this.props.onInlinePropertyAdd(
        inlinePropertyType,
        {},
        this.props.getSelectionOffsets(),
      );
    }
  }

  handleAddLink(url) {
    this.props.onInlinePropertyAdd(
      inlinePropertyTypes.LINK,
      { href: url },
      this.state.savedSelectionOffsets,
    );
    this.handleLinkModalClose();
  }

  render() {
    // #TODO make accessible; remove from inside contentEditable itself?
    return (
      <span className="o_content-editable__menu list" role="toolbar">

        <LinkModal
          isOpen={this.state.linkModalOpen}
          onAdd={this.handleAddLink}
          onClose={this.handleLinkModalClose}
        />

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
      </span>
    );
  }
}

ContentEditableMenu.propTypes = {
  getSelectionOffsets: PropTypes.func.isRequired,
  onInlinePropertyAdd: PropTypes.func.isRequired,
};

export default ContentEditableMenu;
