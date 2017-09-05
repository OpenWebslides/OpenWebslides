import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

import InputField from 'presentationals/objects/form-fields/InputField';
import ImageInputField from './ImageInputField';


export default function ImageUploadForm(props) {
  const { submitSucceeded, error, updateDeck, handleSubmitSuccess, handleSubmit, imageTypeValue } = props;

  if (submitSucceeded) {
    updateDeck();
    handleSubmitSuccess();
  }

  return (
    <div>
      <h3>Add local image file</h3>
      <hr />
      <form onSubmit={handleSubmit}>

        <Field
          component={InputField}
          name="altText"
          errorOnPristine={true}
          placeholder="Enter image alt text"
          label="Alt text"
        />

        <Field
          component={ImageInputField}
          name="imageFile"
        />


        <label>
          <Field name="imageType" component={InputField} type="radio" value="ILLUSTRATIVE_IMAGE" />
            Illustrative
          </label>

        { (imageTypeValue === 'ILLUSTRATIVE_IMAGE') &&
          <Field
            component={InputField}
            label="Caption"
            errorOnPristine={true}
            placeholder="Enter image caption"
            name="imageCaption"
          />}

        <label>
          <Field
            name="imageType"
            errorOnPristine={true}
            component={InputField} type="radio" value="DECORATIVE_IMAGE"
          />
            Decorative
          </label>

        {error && <strong>{error}</strong>}

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

