import React from 'react';
import PropTypes from 'prop-types';

// Components:
import { DeckImportInfo } from 'presentationals/components/deckManagement/DeckImportInfo';
import NeedSigninWarning from 'presentationals/objects/NeedSigninWarning';

import IfAuthHOC from 'lib/IfAuthHOC';

function renderDeckImportInfo(el) {
  return (
    <DeckImportInfo
      key={el.id}
      timestamp={el.timestamp}
      format={el.format}
      status={el.status}
      title={el.name}
    />
  );
}

class UserImports extends React.Component {
  componentWillMount() {
    if (this.props.authState.isAuthenticated) {
      setInterval(
        () => this.props.requestUserImports(this.props.authState.id),
        1000,
      );
    }
  }

  render() {
    const listOfUserImports = this.props.userImportsState.listOfUserImports;
    let contentToDisplay = <p> No imports yet! </p>;
    let listOfImportElements;
    if (listOfUserImports.length > 0) {
      listOfImportElements = listOfUserImports.map(el =>
        renderDeckImportInfo(el),
      );
      contentToDisplay = (
        <ol>
          {listOfImportElements}
        </ol>
      );
    }

    return (
      <IfAuthHOC
        isAuthenticated={this.props.authState.isAuthenticated}
        fallback={() =>
          <NeedSigninWarning requestedAction="see your imports" />}
      >
        <div className="c_user-imports-container">
          <h1> Your imports :</h1>

          <div className="c_user-imports">
            {contentToDisplay}
          </div>
        </div>
      </IfAuthHOC>
    );
  }
}

UserImports.propTypes = {
  authState: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    id: PropTypes.strings,
  }).isRequired,
  requestUserImports: PropTypes.func.isRequired,
  userImportsState: PropTypes.shape().isRequired,
  listOfUserImports: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      timestamp: PropTypes.string.isRequired,
      format: PropTypes.oneOf(['ppt', 'pdf']).isRequired,
      status: PropTypes.oneOf(['queued', 'processing', 'success', 'error'])
        .isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
};

UserImports.defaultProps = {
  listOfImports: [],
};

export default UserImports;
