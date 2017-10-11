import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';

// Presentationals:
import NeedSigninWarning from 'presentationals/objects/NeedSigninWarning';
import UserCollaborationThumbnail from 'presentationals/components/profile-page/UserCollaborationThumbnail';

// Helpers:
import IfAuthHOC from 'lib/IfAuthHOC';

function renderDeckThumbnail(el) {
  return (
    <UserCollaborationThumbnail
      key={el.id}
      deckId={el.id}
      deckTitle={el.meta.title}
      ownerName={el.meta.ownerName}
      ownerId={el.meta.ownerId}
    />
  );
}

function UserCollaborations({ entities, userId, authState }) {

  const ids = entities.users.byId[userId].collaborations;
  const listOfDecks = ids.map(id => entities.decks.byId[id]);
  const listOfDeckThumbnails = listOfDecks.map(el =>
    renderDeckThumbnail(el),
  );

  let tableOrNothing;
  if (listOfDecks.length > 0) {
    tableOrNothing = (
      <table className="c_user-collaborations--table">
        <tbody>
          {listOfDeckThumbnails}
        </tbody>
      </table>
     );
  }
  else {
    tableOrNothing = (<p> No collaborations yet! </p>);
  }
  return (
    <IfAuthHOC
      isAuthenticated={authState.isAuthenticated}
      fallback={() =>
        <NeedSigninWarning requestedAction="display this user's decks" />}
    >
      <div className="c_user-collaborations--container">
        <h2 className="c_user-collaborations--title"> Collaborations: </h2>
        <div className="c_user-collaborations--container" >
          {tableOrNothing}
        </div>
      </div>
    </IfAuthHOC>
  );
}


UserCollaborations.propTypes = {
  authState: PropTypes.shape({
    id: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
  }),
};

export default UserCollaborations;
