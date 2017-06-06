import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { requestOwnDecks } from 'actions/deckManagementActions';
import { DeckThumbnail } from 'presentationals/deckManagement/DeckThumbnail';

function renderDeckThumbnail(el, index) {
  return (
    <DeckThumbnail
      key={index}
      deckLink={el.deckLink}
      deckTitle={el.name}
      deckIconImage={el.deckIconImage}
    />
  );
}

class DeckManagementContainer extends React.Component {
  componentWillMount() {
    this.props.requestOwnDecks(this.props.authState.id);
  }

  render() {
    const listOfDecks = this.props.ownDecksState.listOfDecks;
    const listOfDeckThumbnails = listOfDecks.map((el, index) =>
      renderDeckThumbnail(el, index),
    );

    return (
      <div className="c_deck-management-container">
        <h1> Your decks </h1>
        <div className="o_owned-decks-container">
          <ol>
            {listOfDeckThumbnails}
            <li key={Number.MAX_SAFE_INTEGER}>
              <Link to="/create_new_deck"> Add new </Link>
            </li>
          </ol>
        </div>
      </div>
    );
  }
}

DeckManagementContainer.propTypes = {
  requestOwnDecks: PropTypes.func.isRequired,
  ownDecksState: PropTypes.shape({
    listOfDecks: PropTypes.array.isRequired,
  }),
  authState: PropTypes.shape({
    id: PropTypes.number,
  }),
};

function mapStateToProps(state) {
  const ownDecksState = state.local.ownDecks;
  const authState = state.local.auth;
  return {
    ownDecksState,
    authState,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ requestOwnDecks }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(
  DeckManagementContainer,
);
