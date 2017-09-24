import React from 'react';

import DefaultLayout from 'presentationals/layouts/DefaultLayout';
import CreateDeckFormContainer from 'containers/CreateDeckFormContainer';

function CreateDeckPage() {
  return (
    <DefaultLayout
      cssIdentifier="create-deck-page-container"
      components={{
        'create-deck-form': <CreateDeckFormContainer />,
      }}
    />
  );
}

export default CreateDeckPage;
