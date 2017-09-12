import React from 'react';

import DefaultLayout from 'presentationals/layouts/DefaultLayout';

import FineUploaderInstanceContainer from 'containers/FineUploaderInstanceContainer';
import FineUploaderErrorsContainer from 'containers/FineUploaderErrorsContainer';
import UserImportsContainer from 'containers/UserImportsContainer';

function CreateDeckPage() {
  return (
    <DefaultLayout
      cssIdentifier="imports"
      components={{
        FineUploaderInstanceContainer: <FineUploaderInstanceContainer />,
        FineUploaderErrorsContainer: <FineUploaderErrorsContainer />,
        UserImportsContainer: <UserImportsContainer />,
      }}
    />
  );
}

export default CreateDeckPage;
