import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default class IframeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { iframeSource: '' };

    this.handleAddContentItem = this.handleAddContentItem.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props || nextState !== this.state;
  }

  handleAddContentItem(event) {
    event.preventDefault();

    this.props.handleModalSubmit({ contentItemType: 'IFRAME', props: { src: this.state.iframeSource } });
    this.setState({ iframeSource: '' });
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.closeModal}
        style={customStyles}
        contentLabel="Add Iframe"
      >
        <form onSubmit={this.handleAddContentItem}>

          <input
            autoFocus={true}
            type="text"
            value={this.state.iframeSource}
            placeholder="Enter Iframe URL"
            onChange={event => this.setState({ iframeSource: event.target.value })}
          />

          <button type="submit">Submit</button>
        </form>
      </Modal>
    );
  }
}

IframeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  handleModalSubmit: PropTypes.func.isRequired,
};
