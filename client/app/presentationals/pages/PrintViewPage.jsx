import React from 'react';

import DefaultLayout from 'presentationals/layouts/DefaultLayout';
import PrintViewContainer from 'containers/PrintViewContainer';

function PrintViewPage(props) {
  const id = props.location.pathname.match(/\/print\/([0-9]+)/)[1];
  return (
    <DefaultLayout
      cssIdentifier="print-view-container"
      components={{
        'print-view-container': <PrintViewContainer id={id} />,
      }}
    />
  );
}

export default PrintViewPage;
