import React, { Component } from 'react';
import PropTypes from 'prop-types';

import modalTypes from 'presentationals/components/slide-editor/content-item-modals';
import { contentItemTypesById } from 'constants/contentItemTypes';
import { slideViewTypes } from 'constants/slideViewTypes';
import ToolbarButton from './ToolbarButton';


class Toolbar extends Component {
  constructor(props) {
    super(props);

    this.onButtonClick = this.onButtonClick.bind(this);
    this.addContentItemToSlide = this.addContentItemToSlide.bind(this);

    this.buttons = this.props.buttonTypes.map((typeData) => {
      const contentItemType = contentItemTypesById[typeData.id];
      return {
        id: contentItemType.id,
        key: typeData.key,
        text: contentItemType.name,
        parameters: {
          contentItemType: contentItemType.id,
          contentItemTypeProps: typeData.props,
        },
      };
    });

    this.state = {
      modalIsOpen: false,
      modalType: null,
    };
    this.handleModalSubmit = this.handleModalSubmit.bind(this);
  }

  onButtonClick(button) {
    // Check if CONTENT view type is active and if the content item requires a modal
    if (
      !this.props.activeViewTypes.includes(slideViewTypes.CONTENT) &&
      Object.keys(modalTypes).includes(button.parameters.contentItemType)
    ) {
      // Select the the type of modal we want, depending on the content Item
      const ModalType = modalTypes[button.parameters.contentItemType];

      this.setState({
        modalIsOpen: true,
        ModalType,
      });
    }
    else {
      this.addContentItemToSlide(button.parameters.contentItemType, button.parameters.contentItemTypeProps);
    }
  }

  handleModalSubmit({ contentItemType, props }) {
    this.addContentItemToSlide(contentItemType, props);
    this.setState({ modalIsOpen: false });
  }


  addContentItemToSlide(contentItemType, contentItemTypeProps) {
    // If no props are given, the props are taken from the button Object itself
    this.props.addContentItemToSlide(this.props.activeSlideId, contentItemType, contentItemTypeProps);
  }

  handleUpdateDeck() {
    this.props.updateDeck();
  }

  render() {
    let modalComponent = null;

    if (this.state.modalIsOpen) {
      const { ModalType } = this.state;

      modalComponent = (
        <ModalType
          isOpen={this.state.modalIsOpen}
          handleModalSubmit={this.handleModalSubmit}
          closeModal={() => this.setState({ modalIsOpen: false })}
        />
      );
    }

    return (
      <div className={`c_toolbar c_toolbar--${this.props.cssIdentifier}`}>
        <div className="c_toolbar__wrapper">
          <menu className="c_toolbar__list o_list">
            {modalComponent}
            {this.buttons.map(button =>
              <li className="c_toolbar__item o_list__item" key={button.key}>
                <div className="c_toolbar__item__wrapper o_list__item__wrapper">
                  <ToolbarButton
                    cssIdentifier={this.props.cssIdentifier}
                    button={button}
                    onClick={() => this.onButtonClick(button)}
                  />
                </div>
              </li>,
            )}
            <li className="c_toolbar__item o_list__item">
              <div className="c_toolbar__item__wrapper o_list__item__wrapper">
                <ToolbarButton
                  cssIdentifier={this.props.cssIdentifier}
                  button={{ key: 'save-button', id: 'save-button', text: 'Save', title: 'Save' }}
                  onClick={() => this.handleUpdateDeck()}
                />
              </div>
            </li>
          </menu>
        </div>
      </div>
    );
  }
}

Toolbar.propTypes = {
  cssIdentifier: PropTypes.string,
  updateDeck: PropTypes.func.isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      title: PropTypes.string,
      onClickArguments: PropTypes.object,
    }),
  ),
};

Toolbar.defaultProps = {
  cssIdentifier: 'default',
  buttons: [],
};

export default Toolbar;
