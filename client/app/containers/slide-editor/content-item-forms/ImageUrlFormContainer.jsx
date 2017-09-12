import { reduxForm, formValueSelector } from 'redux-form';

import ImageUrlForm from 'presentationals/components/slide-editor/content-item-forms/ImageUrlForm';
import { ADD_URI } from 'actions/app/slide-editor';

import { connect } from 'react-redux';

export function validate(values) {
  const { altText, imageUrl, imageType, imageCaption } = values;

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

  if (imageType === 'ILLUSTRATIVE_IMAGE' && (!imageCaption || imageCaption.trim() === '')) {
    errors.imageCaption = 'Please add a caption for your image';
  }

  return errors;
}

function validateAndSubmit(values, dispatch) {
  const { imageType } = values;

  return new Promise((resolve, reject) => {
    dispatch({ type: ADD_URI, meta: { contentItemType: imageType, values, resolve, reject } });
  });
}

const selector = formValueSelector('imageUrl', state => state.vendor.forms);

const connectedForm = reduxForm({
  form: 'imageUrl',
  validate,
  onSubmit: validateAndSubmit,
  getFormState: state => state.vendor.forms,
  initialValues: { imageType: 'ILLUSTRATIVE_IMAGE' },
  onSubmitSuccess: (result, dispatch, props) => {
    props.handleSubmitSuccess();
  },
})(ImageUrlForm);

export default connect(
  (state) => {
    return { imageTypeValue: selector(state, 'imageType') };
  })(connectedForm);
