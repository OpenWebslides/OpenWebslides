import { reduxForm } from 'redux-form';

import ImageUrlForm from 'presentationals/components/slide-editor/content-item-forms/ImageUrlForm';
import { ADD_URI } from 'actions/app/slide-editor';


export function validate(values) {
  const { altText, imageUrl, imageType } = values;

  const errors = {};

  if (!altText || altText.trim() === '') {
    errors.altText = 'Alt text is required';
  }

  if (!imageUrl) {
    errors.imageUrl = 'Please paste an image Url';
  }

  if (!imageType) {
    errors.imageType = 'Please select an image type';
  }

  return errors;
}

function validateAndSubmit(values, dispatch) {
  const { imageType } = values;

  return new Promise((resolve, reject) => {
    dispatch({ type: ADD_URI, meta: { contentItemType: `${imageType}_IMAGE`, values, resolve, reject } });
  });
}

const connectedForm = reduxForm({
  form: 'imageUrl',
  validate,
  onSubmit: validateAndSubmit,
  getFormState: state => state.vendor.forms,
  initialValues: { imageType: 'ILLUSTRATIVE' },
})(ImageUrlForm);


export default connectedForm;
