import React from 'react';
import Modal from 'react-modal';

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

export default class LinkModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleAddLink = this.handleAddLink.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props || nextState !== this.state;
  }

  handleAddLink() {
    this.props.onAdd(this.state.value);
    this.setState({ value: '' });
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onClose}
        style={customStyles}
        contentLabel="Add URL"
      >

        <h2>Add URL</h2>
        <button onClick={this.handleAddLink}>
          Add URL
        </button>
        <button onClick={this.props.onClose}>close</button>
        <form>
          <input
            autoFocus
            type="text"
            value={this.state.value}
            placeholder="Enter URL"
            onChange={event => this.setState({ value: event.target.value })}
          />
        </form>
      </Modal>
    );
  }
}
