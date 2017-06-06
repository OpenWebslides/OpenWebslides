import faker from 'faker';

import asyncFetch from '../../app/api/helpers/asyncFetch';
import confirmEmail, { CONFIRM_EMAIL_API_URL } from '../../app/api/confirmEmailApi';

jest.mock('api/helpers/asyncFetch');

describe('ConfirmEmail Api Call', () => {
  it('has a happy path', async () => {
    const confirmationToken = faker.random.alphaNumeric(20);

    asyncFetch.mockReturnValue(200);

    const response = await confirmEmail(confirmationToken);
    expect(response).toEqual(200);

    const calledUrl = asyncFetch.mock.calls[0][0];
    expect(calledUrl).toEqual(CONFIRM_EMAIL_API_URL);

    const body = JSON.stringify({
      data: {
        type: 'confirmations',
        attributes: {
          confirmationToken,
        },
      },
    });
    const requestConfig = asyncFetch.mock.calls[0][1];
    expect(body).toEqual(requestConfig.body);

    expect(requestConfig.method).toEqual('POST');
  });
});
