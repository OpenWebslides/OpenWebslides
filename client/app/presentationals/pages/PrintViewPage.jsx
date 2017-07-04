import React from 'react';

import DefaultLayout from 'presentationals/layouts/DefaultLayout';
import PrintViewContainer from 'containers/PrintViewContainer';

function PrintViewPage(props) {
  return (
    <DefaultLayout
      cssIdentifier="print-view-container"
      components={{
        'print-view-container': <PrintViewContainer {...props} />,
      }}
    />
  );
}

export default PrintViewPage;
