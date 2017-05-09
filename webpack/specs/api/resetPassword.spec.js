import faker from 'faker';

import asyncFetch from '../../app/api/helpers/asyncFetch';
import resetPassword, {
  RESET_PASSWORD_API_URL,
} from '../../app/api/resetPassword';

jest.mock('api/helpers/asyncFetch');

describe('resetPassword Api Call', () => {
  it('has a happy path', async () => {
    const resetPasswordToken = faker.random.alphaNumeric(20);
    const password = faker.internet.password();

    asyncFetch.mockReturnValue(200);

    const response = await resetPassword(resetPasswordToken, password);
    expect(response).toEqual(200);

    const calledUrl = asyncFetch.mock.calls[0][0];
    expect(calledUrl).toEqual(RESET_PASSWORD_API_URL);

    const body = JSON.stringify({
      data: {
        type: 'passwords',
        id: '',
        attributes: {
          resetPasswordToken,
          password,
        },
      },
    });
    const requestConfig = asyncFetch.mock.calls[0][1];
    expect(body).toEqual(requestConfig.body);

    expect(requestConfig.method).toEqual('PUT');
  });
});
