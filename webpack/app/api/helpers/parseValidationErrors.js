import _ from 'lodash';

function parseValidationErrors(errors) {
  const fieldValidationErrors = {};

  errors.forEach((error) => {
    const fieldName = error.detail.split(' ')[0];
    const capitalizedFieldName = _.capitalize(fieldName);

    fieldValidationErrors[fieldName] = `${capitalizedFieldName} ${error.title}`;
  });
  return fieldValidationErrors;
}

export default parseValidationErrors;

