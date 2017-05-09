import faker from 'faker';

import asyncFetch from '../../app/api/helpers/asyncFetch';
import signup, { SIGNUP_API_URL } from '../../app/api/signupApi';

jest.mock('api/helpers/asyncFetch');

describe('Signup Api Call', () => {
  it('has a happy path', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    asyncFetch.mockReturnValue(200);

    const response = await signup(email, password, firstName, lastName);
    expect(response).toEqual(200);

    const calledUrl = asyncFetch.mock.calls[0][0];
    expect(calledUrl).toEqual(SIGNUP_API_URL);

    const body = JSON.stringify({
      data: {
        type: 'users',
        attributes: {
          email,
          password,
          firstName,
          lastName,
        },
      },
    });

    const requestConfig = asyncFetch.mock.calls[0][1];
    expect(body).toEqual(requestConfig.body);

    expect(requestConfig.method).toEqual('POST');
  });
});
