import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import ImageUploadFormContainer from 'containers/ImageUploaderContainer';
import ImageUrlFormContainer from 'containers/slide-editor/asset-forms/ImageUrlFormContainer';


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
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props || nextState !== this.state;
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.closeModal}
        style={customStyles}
        contentLabel="Add Image"
      >

        <ImageUploadFormContainer handleSubmitSuccess={this.props.closeModal} />

        <ImageUrlFormContainer handleSubmitSuccess={this.props.closeModal} />

      </Modal>
    );
  }
}

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};
