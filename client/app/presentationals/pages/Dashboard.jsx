import React from 'react';

import DefaultLayout from 'presentationals/layouts/DefaultLayout';
import FeedContainer from 'containers/FeedContainer';
import OwnDecksContainer from 'containers/OwnDecksContainer';
import OwnCollaborationsContainer from 'containers/OwnCollaborationsContainer';

function Dashboard() {
  return (
    <DefaultLayout
      cssIdentifier="feed"
      components={{
        ownDecks: <OwnDecksContainer />,
        ownCollaborations: <OwnCollaborationsContainer />,
        feed: <FeedContainer />,
      }}
    />
  );
}

export default Dashboard;
