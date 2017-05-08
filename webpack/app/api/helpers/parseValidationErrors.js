import _ from 'lodash';

function parseValidationErrors(errors) {
  const validationErrors = {};

  errors.forEach(error => {
    const fieldName = error.detail.split(' ')[0];
    const capitalizedFieldName = _.capitalize(fieldName);

    validationErrors[fieldName] = `${capitalizedFieldName} ${error.title}`;
  });
  return validationErrors;
}

export default parseValidationErrors;
