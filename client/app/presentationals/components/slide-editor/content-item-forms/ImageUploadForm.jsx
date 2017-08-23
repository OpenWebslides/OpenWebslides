import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

import InputField from 'presentationals/objects/form-fields/InputField';
import ImageInputField from './ImageInputField';


export default function ImageUploadForm(props) {
  if (props.submitSucceeded) {
    props.updateDeck();
    props.handleSubmitSuccess();
  }

  return (
    <div>
      <h3>Add local image file</h3>
      <hr />
      <form onSubmit={props.handleSubmit}>

        <Field
          component={InputField}
          name="altText"
          placeholder="Enter image alt text"
          label="Alt text"
        />

        <Field
          component={ImageInputField}
          name="imageFile"
        />

        <label>
          <Field name="imageType" component={InputField} type="radio" value="ILLUSTRATIVE" />
            Illustrative
          </label>

        <label>
          <Field name="imageType" component={InputField} type="radio" value="DECORATIVE" />
            Decorative
          </label>

        {props.error && <strong>{props.error}</strong>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

ImageUploadForm.propTypes = {
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  updateDeck: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  handleSubmitSuccess: PropTypes.func.isRequired,
};

ImageUploadForm.defaultProps = {
  error: '',
};

