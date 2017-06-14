import React from 'react';

import DefaultLayout from 'presentationals/layouts/DefaultLayout';
import FeedContainer from 'containers/FeedContainer';

function FeedPage() {
  return (
    <DefaultLayout
      cssIdentifier="feed"
      components={{
        feed: <FeedContainer />,
      }}
    />
  );
}

export default FeedPage;
