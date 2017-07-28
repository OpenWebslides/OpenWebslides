import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

export default class ImageUploader extends Component {
  constructor() {
    super();
    this.state = { files: [] };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(acceptedFiles) {
    this.props.uploadAssets(acceptedFiles);
  }

  render() {
    return (
      <section>
        <div className="dropzone">
          <Dropzone accept="image/jpeg, image/png" onDrop={this.onDrop} onDropAccepted={this.handleDropAccepted}>
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </div>
      </section>
    );
  }
}
