import Immutable from 'seamless-immutable';

import userImportsReducer from 'reducers/app/userImportsReducer';

import {
  REQUEST_USER_IMPORTS,
  REQUEST_USER_IMPORTS_SUCCESS,
  REQUEST_USER_IMPORTS_FAILURE,
} from 'actions/userImportsActions';

describe('Deck Management Reducer', () => {
  const emptyState = undefined;
  const stateWithImports = Immutable({
    listOfUserImports: [],
    sentRequestForList: false,
    receivedList: false,
    errorMessage: '',
  });

  it('has a default immutable state', () => {
    const emptyAction = { type: '' };
    expect(userImportsReducer(emptyState, emptyAction)).toEqual(
      Immutable({
        listOfUserImports: [],
        sentRequestForList: false,
        receivedList: false,
        errorMessage: '',
      }),
    );
  });
  it('Can resolve a REQUEST_USER_IMPORTS action', () => {
    const action = { type: 'REQUEST_USER_IMPORTS' };
    expect(userImportsReducer(emptyState, action)).toEqual(
      Immutable({
        listOfUserImports: [],
        sentRequestForList: true,
        receivedList: false,
        errorMessage: '',
      }),
    );
  });

  it('Can resolve a REQUEST_USER_IMPORTS_SUCCESS action', () => {
    const action = {
      type: 'REQUEST_USER_IMPORTS_SUCCESS',
      payload: {
        listOfImports: [
          { id: 'import1' },
          { id: 'import2' },
          { id: 'import3' },
        ],
      },
    };
    expect(userImportsReducer(emptyState, action)).toEqual(
      Immutable({
        listOfUserImports: [
          { id: 'import1' },
          { id: 'import2' },
          { id: 'import3' },
        ],
        sentRequestForList: false,
        receivedList: true,
        errorMessage: '',
      }),
    );
  });
  it('Can resolve a REQUEST_USER_IMPORTS_FAILURE action', () => {
    const action = {
      type: 'REQUEST_USER_IMPORTS_FAILURE',
      payload: 'error',
    };
    expect(userImportsReducer(emptyState, action)).toEqual(
      Immutable({
        listOfUserImports: [],
        sentRequestForList: false,
        receivedList: false,
        errorMessage: 'error',
      }),
    );
  });
});
