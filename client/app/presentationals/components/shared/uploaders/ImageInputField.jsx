import React from 'react';
import PropTypes from 'prop-types';

import Dropzone from 'react-dropzone';

function ImageInputField(props) {
  const { value } = props.input;

  if (value) {
    // TODO: Convert these inline styles to real added styles in stylesheet
    return (<img
      style={{ maxWidth: 300, maxHeight: 300 }}
      src={value[0].preview}
      alt={value[0].name}
    />);
  }

  return (
    <div className="dropzone">
      <Dropzone
        accept="image/jpeg, image/png, image/gif"
        multiple={false} onDrop={this.onDrop}
        onDropAccepted={file => props.input.onChange(file)}
        name={name}
      >
        <p>Drag and drop your image or click to select a file.</p>
      </Dropzone>

      {props.meta.touched &&
          props.meta.error &&
          <span className="c_input-field__error">
            <span className="c_input-field__error__wrapper">
              {props.meta.error}
            </span>
          </span>}
    </div>);
}

ImageInputField.propTypes = {
  input: PropTypes.objectOf(Object).isRequired,
  meta: PropTypes.objectOf(Object).isRequired,
};


export default ImageInputField;
