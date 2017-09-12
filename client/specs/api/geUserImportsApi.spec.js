import faker from 'faker';

import asyncFetch from '../../app/api/helpers/asyncFetch';

import getUserImports from '../../app/api/getUserImportsApi';

jest.mock('api/helpers/asyncFetch');

describe('get user imports Api Call', () => {
  it('has a happy path', async () => {
    asyncFetch.mockReturnValue({
      status: 200,
      json: () => ({ data: 'sample' }),
    });

    const dummyId = faker.random.number();

    const response = await getUserImports(dummyId);
    expect(response).toEqual('sample');

    const calledUrl = asyncFetch.mock.calls[0][0];

    expect(calledUrl).toEqual(
      `http://owsqas.ugent.be/api/users/${dummyId}/conversions?sort=-createdAt`,
    );

    const requestConfig = asyncFetch.mock.calls[0][1];
    expect(requestConfig.method).toEqual('GET');
  });
});
