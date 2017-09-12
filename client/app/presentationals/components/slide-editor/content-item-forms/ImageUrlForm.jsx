import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import InputField from 'presentationals/objects/form-fields/InputField';

export default function ImageUrlForm(props) {
  const { error, handleSubmit, imageTypeValue } = props;

  return (
    <div>
      <h3>Add Image URL</h3>
      <hr />
      <form onSubmit={handleSubmit}>

        <Field
          type="text"
          name="imageUrl"
          placeholder="Enter Image URL"
          component={InputField}
        />

        <Field
          type="text"
          name="altText"
          placeholder="Enter Image Alt Text"
          component={InputField}
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
          <Field name="imageType" component={InputField} type="radio" value="DECORATIVE_IMAGE" />
            Decorative
          </label>

        {error && <strong>{error}</strong>}

        <button type="submit">Submit</button>
      </form>
    </div>

  );
}

ImageUrlForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  imageTypeValue: PropTypes.string,
};

ImageUrlForm.defaultProps = {
  error: '',
  imageTypeValue: '',
};
