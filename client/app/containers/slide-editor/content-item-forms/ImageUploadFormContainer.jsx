import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { uploadAsset } from 'actions/other/assetActions';
import { updateDeck } from 'actions/entities/decks';

import ImageUploadForm from
  'presentationals/components/slide-editor/content-item-forms/ImageUploadForm';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateDeck }, dispatch);
}

export function validate(values) {
  const { altText, imageFile, imageType, imageCaption } = values;

  const errors = {};

  if (!altText || altText.trim() === '') {
    errors.altText = 'Alt text is required';
  }

  if (!imageFile) {
    errors.imageFile = 'Please select an image file to upload';
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
  return new Promise((resolve, reject) => {
    const assetType = values.imageType;
    dispatch(uploadAsset({ assetType, values, resolve, reject }));
  });
}


const connectedForm = reduxForm({
  form: 'imageUpload',
  validate,
  onSubmit: validateAndSubmit,
  getFormState: state => state.vendor.forms,
  initialValues: { imageType: 'ILLUSTRATIVE_IMAGE' },
  onSubmitSuccess: (result, dispatch, props) => {
    props.updateDeck();
    props.handleSubmitSuccess();
  },
})(ImageUploadForm);

const selector = formValueSelector('imageUpload', state => state.vendor.forms);

export default connect(
  (state) => {
    return { imageTypeValue: selector(state, 'imageType') };
  },
  mapDispatchToProps)(connectedForm);
