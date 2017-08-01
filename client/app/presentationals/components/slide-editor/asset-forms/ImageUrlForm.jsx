import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import InputField from 'presentationals/objects/form-fields/InputField';

export default function ImageUrlForm(props) {
  if (props.submitSucceeded) {
    props.handleSubmitSuccess();
  }

  return (
    <div>
      <h3>Add Image URL</h3>
      <hr />
      <form onSubmit={props.handleSubmit}>

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

ImageUrlForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitSucceeded: PropTypes.bool.isRequired,
  handleSubmitSuccess: PropTypes.func.isRequired,
};

ImageUrlForm.defaultProps = {
  error: '',
};
