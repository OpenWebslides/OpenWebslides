import React from 'react';

import PrintViewContainer from 'containers/printView/PrintViewContainer';

function PrintViewPage(props) {
  const id = props.location.pathname.match(/\/print\/([0-9]+)/)[1];
  return (<PrintViewContainer id={id} />);
}

export default PrintViewPage;
