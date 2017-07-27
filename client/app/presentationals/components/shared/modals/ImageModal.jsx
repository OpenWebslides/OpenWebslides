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

export default class ImageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageSource: '', altText: '', imageType: 'ILLUSTRATIVE' };

    this.handleAddContentItem = this.handleAddContentItem.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props || nextState !== this.state;
  }

  handleAddContentItem(event) {
    event.preventDefault();
    this.props.onHandleModalSubmit({ src: this.state.imageSource, alt: this.state.altText });
    this.setState({ imageSource: '', altText: '', imageType: 'ILLUSTRATIVE' });
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onClose}
        style={customStyles}
        contentLabel="Add Image"
      >
        <form onSubmit={this.handleAddContentItem}>
          <input
            type="radio"
            id="imageTypeChoice1"
            onChange={event => this.setState({ imageType: event.target.value })}
            name="imageTypeChoice"
            value="ILLUSTRATIVE"
            defaultChecked
          />
          <label htmlFor="imageTypeChoice1">Illustrative</label>

          <input
            type="radio"
            id="imageTypeChoice2"
            name="imageTypeChoice"
            value="DECORATIVE"
            onChange={event => this.setState({ imageType: event.target.value })}
          />
          <label htmlFor="imageTypeChoice2">Decorative</label>

          <input
            autoFocus
            type="text"
            value={this.state.imageSource}
            placeholder="Enter Image URL"
            onChange={event => this.setState({ imageSource: event.target.value })}
          />

          <input
            type="text"
            value={this.state.altText}
            placeholder="Enter Image Alt Text"
            onChange={event => this.setState({ altText: event.target.value })}
          />

          <button type="submit">Submit</button>
        </form>
      </Modal>
    );
  }
}

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onHandleModalSubmit: PropTypes.func.isRequired,
};
