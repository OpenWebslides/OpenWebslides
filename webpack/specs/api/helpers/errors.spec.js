import faker from 'faker';
import { ApiError, ValidationError } from 'api/helpers/errors';
import parseValidationErrors
  from '../../../app/api/helpers/parseValidationErrors';

jest.mock('api/helpers/parseValidationErrors');

describe('Api Error Classes', () => {
  describe('ApiError', () => {
    const fakeMessage = faker.lorem.sentence();
    const fakeStatusCode = faker.random.number(500);
    const apiError = new ApiError(fakeMessage, fakeStatusCode);

    it('returns the correct error message', () => {
      expect(apiError.message).toEqual(fakeMessage);
    });

    it('returns the correct statusCode', () => {
      expect(apiError.statusCode).toEqual(fakeStatusCode);
    });
  });

  describe('ValidationError', () => {
    const fakeMessage = faker.lorem.sentence();
    const fakeStatusCode = faker.random.number(500);
    const fakeErrorArray = [];

    parseValidationErrors.mockReturnValue([
      { email: 'email has already been taken' },
    ]);

    const validationError = new ValidationError(
      fakeMessage,
      fakeStatusCode,
      fakeErrorArray,
    );

    it('inherits from ApiError', () => {
      expect(validationError.message).toEqual(fakeMessage);
      expect(validationError.statusCode).toEqual(fakeStatusCode);
    });

    it('has a name', () => {
      expect(validationError.name).toEqual('ValidationError');
    });

    it('has a validationErrors array', () => {
      expect(validationError.validationErrors).toEqual([
        { email: 'email has already been taken' },
      ]);
    });
  });
});
