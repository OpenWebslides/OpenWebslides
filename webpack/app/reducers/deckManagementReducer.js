import Immutable from 'seamless-immutable';
import {
  DECK_DELETION_REQUEST,
  DECK_DELETION_REQUEST_SUCCESS,
  DECK_DELETION_REQUEST_FAILURE,
  DECK_CREATION_REQUEST,
  DECK_CREATION_REQUEST_SUCCESS,
  DECK_CREATION_REQUEST_FAILURE } from 'actions/deckManagementActions';


const initialState = Immutable({
  listOfDecks: [],
  sentRequestForDecksList: false,
  receivedList: false,
  errorMessage: '',
  sentDeletionRequest: false,
});

