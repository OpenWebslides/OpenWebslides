import Immutable from 'seamless-immutable';

import deckManagementReducer from 'reducers/deckManagementReducer';

import {
  DECK_DELETION_REQUEST,
  DECK_DELETION_REQUEST_FAILURE,
  DECK_DELETION_REQUEST_SUCCESS,
  REQUEST_DECK_LIST,
  REQUEST_DECK_LIST_FAILURE,
  REQUEST_DECK_LIST_SUCCESS,
} from 'actions/deckManagementActions';

describe('Deck Management Reducer', () => {
  const emptyState = undefined;
  const stateWithDecks = Immutable({
    listOfDecks: [
      { deckName: 'deck1', deckId: '22' },
      { deckName: 'deck2', deckId: '653' },
      { deckName: 'deck3', deckId: '3422' },
      { deckName: 'deck4', deckId: '345' },
    ],
    sentRequestForDecksList: false,
    receivedList: false,
    listErrorMessage: '',
    sentDeletionRequestFor: '345',
    deletionErrorMessage: '',
  });

  it('has a default immutable state', () => {
    const emptyAction = { type: '' };
    expect(deckManagementReducer(emptyState, emptyAction)).toEqual(
      Immutable({
        listOfDecks: [],
        sentRequestForDecksList: false,
        receivedList: false,
        listErrorMessage: '',
        sentDeletionRequestFor: null,
        deletionErrorMessage: '',
      }),
    );
  });
  it('Can resolve a REQUEST_DECK_LIST action', () => {
    const action = { type: 'REQUEST_DECK_LIST' };
    expect(deckManagementReducer(emptyState, action)).toEqual(
      Immutable({
        listOfDecks: [],
        sentRequestForDecksList: true,
        receivedList: false,
        listErrorMessage: '',
        sentDeletionRequestFor: null,
        deletionErrorMessage: '',
      }),
    );
  });

  it('Can resolve a REQUEST_DECK_LIST_SUCCESS action', () => {
    const action = {
      type: 'REQUEST_DECK_LIST_SUCCESS',
      payload: { listOfDecks: ['deck1', 'deck2', 'deck3'] },
    };
    expect(deckManagementReducer(emptyState, action)).toEqual(
      Immutable({
        listOfDecks: ['deck1', 'deck2', 'deck3'],
        sentRequestForDecksList: false,
        receivedList: true,
        listErrorMessage: '',
        sentDeletionRequestFor: null,
        deletionErrorMessage: '',
      }),
    );
  });
  it('Can resolve a REQUEST_DECK_LIST_FAILURE action', () => {
    const action = {
      type: 'REQUEST_DECK_LIST_FAILURE',
      payload: 'Error',
    };
    expect(deckManagementReducer(emptyState, action)).toEqual(
      Immutable({
        listOfDecks: [],
        sentRequestForDecksList: false,
        receivedList: false,
        listErrorMessage: 'Error',
        sentDeletionRequestFor: null,
        deletionErrorMessage: '',
      }),
    );
  });

  it('Can resolve a DECK_DELETION_REQUEST action', () => {
    const action = {
      type: 'DECK_DELETION_REQUEST',
      payload: '345',
    };
    expect(deckManagementReducer(emptyState, action)).toEqual(
      Immutable({
        listOfDecks: [],
        sentRequestForDecksList: false,
        receivedList: false,
        listErrorMessage: '',
        sentDeletionRequestFor: '345',
        deletionErrorMessage: '',
      }),
    );
  });
  it('Can resolve a DECK_DELETION_REQUEST_FAILURE action', () => {
    const action = {
      type: 'DECK_DELETION_REQUEST_FAILURE',
      payload: 'Error during deck deletion',
    };
    expect(deckManagementReducer(emptyState, action)).toEqual(
      Immutable({
        listOfDecks: [],
        sentRequestForDecksList: false,
        receivedList: false,
        listErrorMessage: '',
        sentDeletionRequestFor: null,
        deletionErrorMessage: 'Error during deck deletion',
      }),
    );
  });
  it('Can resolve a DECK_DELETION_REQUEST_SUCCESS action', () => {
    const action = {
      type: 'DECK_DELETION_REQUEST_SUCCESS',
    };
    expect(deckManagementReducer(stateWithDecks, action)).toEqual(
      Immutable({
        listOfDecks: [
          { deckName: 'deck1', deckId: '22' },
          { deckName: 'deck2', deckId: '653' },
          { deckName: 'deck3', deckId: '3422' },
        ],
        sentRequestForDecksList: false,
        receivedList: false,
        listErrorMessage: '',
        sentDeletionRequestFor: null,
        deletionErrorMessage: '',
      }),
    );
  });
});
