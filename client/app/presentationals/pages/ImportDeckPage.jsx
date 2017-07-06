import React from 'react';

import ImportDeckForm from 'containers/ImportDeckFormContainer';
import UserImports from 'containers/UserImportsContainer';

function CreateDeckPage() {
  return (
    <div>
      <ImportDeckForm />
      <UserImports />
    </div>
  );
}

export default CreateDeckPage;
