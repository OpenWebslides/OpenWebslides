import faker from 'faker';

import asyncFetch from '../../app/api/helpers/asyncFetch';
import signup from '../../app/api/signupApi';

jest.mock('api/helpers/asyncFetch');

describe('Signup Api Call', () => {
  it('has a happy path', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const tosAccepted = true;

    asyncFetch.mockReturnValue(200);

    const response = await signup(email, password, firstName, lastName, tosAccepted);
    expect(response).toEqual(200);

    const calledUrl = asyncFetch.mock.calls[0][0];
    expect(calledUrl).toEqual('http://owsqas.ugent.be/api/users');

    const body = JSON.stringify({
      data: {
        type: 'users',
        attributes: {
          email,
          password,
          firstName,
          lastName,
          tosAccepted,
        },
      },
    });

    const requestConfig = asyncFetch.mock.calls[0][1];
    expect(body).toEqual(requestConfig.body);

    expect(requestConfig.method).toEqual('POST');
  });
});
