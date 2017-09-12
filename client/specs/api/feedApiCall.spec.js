import faker from 'faker';

import asyncFetch from '../../app/api/helpers/asyncFetch';

import requestFeedNotifications from '../../app/api/feedApiCall';

jest.mock('api/helpers/asyncFetch');

describe('get feed notifications Api Call', () => {
  it('has a happy path', async () => {
    asyncFetch.mockReturnValue({
      status: 200,
      json: () => ({ data: 'sample' }),
    });
    const response = await requestFeedNotifications(234);

    expect(response).toEqual('sample');

    const calledUrl = asyncFetch.mock.calls[0][0];

    expect(calledUrl).toEqual(
      'http://owsqas.ugent.be/api/notifications?sort=-createdAt&page[offset]=234',
    );

    const requestConfig = asyncFetch.mock.calls[0][1];
    expect(requestConfig.method).toEqual('GET');
  });
});
