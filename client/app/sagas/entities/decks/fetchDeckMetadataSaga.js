import { put, call } from 'redux-saga/effects';
import { ADD_DECK_METADATA } from 'actions/entities/decks';
import { SIGNOUT } from 'actions/signoutActions';

import fetchDeckJsonApi from 'api/fetchDeckJsonApi';

function metadataJsonToObject(json) {
  const collaboratorsIds = json.data.relationships.collaborators.data.map(obj => obj.id);
  const conversationsIds = json.data.relationships.conversations.data.map(obj => obj.id);
  const authorId = json.data.relationships.owner.data.id;
  const authorObj = json.included.filter(obj => (obj.id === authorId && obj.type === 'users'))[0];

  const firstName = authorObj.attributes.firstName ? authorObj.attributes.firstName : '';
  const lastName = authorObj.attributes.lastName ? authorObj.attributes.lastName : '';
  const authorName = `${firstName} ${lastName}`;

  return {
    title: json.data.attributes.name,
    description: json.data.attributes.description,
    authorId,
    authorName,
    collaboratorsIds,
    conversationsIds,
  };
}

export function* fetchDeckMetadataFlow(id) {
  try {
    const metadataResponse = yield call(fetchDeckJsonApi, id, { conversations: true, collaborators: true, owner: true });
    const metadata = metadataJsonToObject(metadataResponse);
    yield put({ type: ADD_DECK_METADATA, payload: { id, metadata } });
  }
  catch (e) {
    if (e.statusCode === 401) {
      yield put({ type: SIGNOUT });
    }
    console.log(e);
  }
}
