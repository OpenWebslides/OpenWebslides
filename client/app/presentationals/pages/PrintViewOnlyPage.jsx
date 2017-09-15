import React from 'react';

import PrintViewContainer from 'containers/printView/PrintViewContainer';

function PrintViewOnlyPage(props) {
  const id = props.location.pathname.match(/\/printOnly\/([0-9]+)/)[1];
  return (<PrintViewContainer id={id} printAndClose={true} />);
}

export default PrintViewOnlyPage;
