import faker from 'faker';

import asyncFetch from '../../app/api/helpers/asyncFetch';
import forgotPassword, { FORGOT_PASSWORD_API_URL } from '../../app/api/forgotPasswordApi';

jest.mock('api/helpers/asyncFetch');

describe('RequestResetPassword Api Call', () => {
  it('has a happy path', async () => {
    const email = faker.internet.email();

    asyncFetch.mockReturnValue(200);

    const response = await forgotPassword(email);
    expect(response).toEqual(200);

    const calledUrl = asyncFetch.mock.calls[0][0];
    expect(calledUrl).toEqual(FORGOT_PASSWORD_API_URL);

    const body = JSON.stringify({
      data: {
        type: 'passwords',
        attributes: {
          email,
        },
      },
    });
    const requestConfig = asyncFetch.mock.calls[0][1];
    expect(body).toEqual(requestConfig.body);

    expect(requestConfig.method).toEqual('POST');
  });
});
