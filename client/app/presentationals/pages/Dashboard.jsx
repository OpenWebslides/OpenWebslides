import React from 'react';

import DefaultLayout from 'presentationals/layouts/DefaultLayout';
import FeedContainer from 'containers/FeedContainer';
import OwnDecksContainer from 'containers/OwnDecksContainer';

function Dashboard() {
  return (
    <DefaultLayout
      cssIdentifier="feed"
      components={{
        ownDecks: <OwnDecksContainer />,
        feed: <FeedContainer />,
      }}
    />
  );
}

export default Dashboard;
