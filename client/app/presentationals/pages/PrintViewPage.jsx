import React from 'react';

import DefaultLayout from 'presentationals/layouts/DefaultLayout';
import PrintViewContainer from 'containers/printView/PrintViewContainer';
import PrintViewToolbarContainer from 'containers/printView/PrintViewToolbarContainer';

function PrintViewPage(props) {
  const id = props.location.pathname.match(/\/print\/([0-9]+)/)[1];
  return (
    <DefaultLayout
      cssIdentifier="print-view-container"
      components={{
        'print-view-toolbar': <PrintViewToolbarContainer id={id} />,
        'print-view-container': <PrintViewContainer id={id} printAndClose={false} />,
      }}
    />
  );
}

export default PrintViewPage;
