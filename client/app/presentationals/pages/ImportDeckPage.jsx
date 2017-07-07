import React from 'react';

import FineUploaderInstanceContainer from 'containers/FineUploaderInstanceContainer';
import FineUploaderErrorsContainer from 'containers/FineUploaderErrorsContainer';
import UserImportsContainer from 'containers/UserImportsContainer';

function CreateDeckPage() {
  return (
    <div>
      <FineUploaderInstanceContainer />
      <FineUploaderErrorsContainer />
      <UserImportsContainer />
    </div>
  );
}

export default CreateDeckPage;
