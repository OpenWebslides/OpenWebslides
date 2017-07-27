import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { slideViewTypes } from 'constants/slideViewTypes';
import ToolbarButton from './ToolbarButton';
import modalTypes from './modals';

class Toolbar extends Component {
  constructor(props) {
    super(props);

    this.onButtonClick = this.onButtonClick.bind(this);
    this.onHandleModal = this.onHandleModal.bind(this);
    this.addContentItemToSlide = this.addContentItemToSlide.bind(this);

    this.state = {
      modalIsOpen: false,
      modalType: null,
      contentItemType: null,
    };
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
        contentItemType: button.parameters.contentItemType,
      });
    }
    else {
      this.addContentItemToSlide(button.parameters.contentItemType, button.parameters.contentItemTypeProps);
    }
  }

  onHandleModal(props) {
    this.addContentItemToSlide(this.state.contentItemType, props);
  }

  addContentItemToSlide(contentItemType, contentItemTypeProps) {
    // If no props are given, the props are taken from the button Object itself
    this.props.addContentItemToSlide(this.props.activeSlideId, contentItemType, contentItemTypeProps);
  }

  render() {
    let modalComponent = null;

    if (this.state.modalIsOpen) {
      const { ModalType } = this.state;

      modalComponent = (
        <ModalType
          onHandleModal={this.onHandleModal}
          isOpen={this.state.modalIsOpen}
          onClose={() => this.setState({ modalIsOpen: false })}
        />
      );
    }

    return (
      <div className={`c_toolbar c_toolbar--${this.props.cssIdentifier}`}>
        <div className="c_toolbar__wrapper">
          <menu className="c_toolbar__list o_list">
            {modalComponent}
            {this.props.buttons.map(button =>
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
          </menu>
        </div>
      </div>
    );
  }
}

Toolbar.propTypes = {
  cssIdentifier: PropTypes.string,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      title: PropTypes.string,
      onClickArguments: PropTypes.object,
    }),
  ).isRequired,
};

Toolbar.defaultProps = {
  cssIdentifier: 'default',
};

export default Toolbar;
