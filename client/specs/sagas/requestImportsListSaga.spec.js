import { call, put } from 'redux-saga/effects';
import faker from 'faker';

import {
  REQUEST_USER_IMPORTS_SUCCESS,
  REQUEST_USER_IMPORTS_FAILURE,
} from 'actions/userImportsActions';

import getUserImports from 'api/getUserImportsApi';

import {
  getUserImportsFlow,
  computeType,
} from 'sagas/deckManagement/requestImportsListSaga';

function fakeResponseElement() {
  const id = faker.random.number();
  const type = faker.random.arrayElement([
    'queued',
    'processing',
    'success',
    'error',
  ]);
  const timestamp = faker.random.number();
  const name = faker.system.fileName();
  return {
    id,
    type: 'conversions',
    links: {
      self: `http://localhost:5000/api/conversions/${id}`,
    },
    attributes: {
      status: type,
      name,
    },
    relationships: {
      deck: {
        links: {
          self: `http://localhost:5000/api/conversions/${id}/relationships/deck`,
          related: `http://localhost:5000/api/conversions/${id}/deck`,
        },
      },
      user: {
        links: {
          self: `http://localhost:5000/api/conversions/${id}/relationships/user`,
          related: `http://localhost:5000/api/conversions/${id}/user`,
        },
      },
    },
    meta: {
      createdAt: timestamp,
    }
  };
}
function fakeResponseList(amount) {
  let res = [];
  for (let i = 0; i < amount; i += 1) {
    res = res.concat(fakeResponseElement());
  }
  return res;
}

describe('Request for imports list Saga', () => {
  describe('Request list of imports flow', () => {
    const dummyError = { message: 'blablabla' };
    const dummyResponse = fakeResponseList(12);

    it('has a happy path', () => {
      const generator = getUserImportsFlow({
        meta: 'someID',
      });
      expect(generator.next().value).toEqual(call(getUserImports, 'someID'));

      const resultListOfImports = [];

      for (let i = 0; i < 12; i += 1) {
        resultListOfImports.push({
          id: dummyResponse[i].id,
          name: dummyResponse[i].attributes.name,
          timestamp: dummyResponse[i].meta.createdAt,
          status: dummyResponse[i].attributes.status,
          type: computeType(dummyResponse[i].attributes.name),
        });
      }
      expect(generator.next(dummyResponse).value).toEqual(
        put({
          type: REQUEST_USER_IMPORTS_SUCCESS,
          payload: {
            listOfImports: resultListOfImports,
          },
        }),
      );

      expect(generator.next().done).toBeTruthy();
    });
    it('throws an error if the list is undefined', () => {
      const generator = getUserImportsFlow({
        meta: 'someID',
      });
      expect(generator.next().value).toEqual(
        call(getUserImports, 'someID'),
      );

      expect(
        generator.throw(new Error('Received undefined list.')).value,
      ).toEqual(
        put({
          type: REQUEST_USER_IMPORTS_FAILURE,
          payload: {
            message: 'Received undefined list.',
          },
        }),
      );
      expect(generator.next().done).toBeTruthy();
    });

    it('throws an error if the call returns an error', () => {
      const generator = getUserImportsFlow({
        meta: 'someID',
      });
      expect(generator.next().value).toEqual(call(getUserImports, 'someID'));

      expect(generator.throw(dummyError).value).toEqual(
        put({
          type: REQUEST_USER_IMPORTS_FAILURE,
          payload: dummyError,
        }),
      );

      expect(generator.next().done).toBeTruthy();
    });
  });
});
