import React from 'react';
import PropTypes from 'prop-types';

import { slideViewTypes } from 'constants/slideViewTypes';
import { deckShape } from 'constants/propTypeShapes';

import SlideContainer from 'containers/slide-editor/SlideContainer';

function DeckHtmlWrapper(props) {
  const { deck } = props;

  return (
    <section className="ows_deck">
      <header className="ows_deck__header">
        {/* #TODO get actual deck title */}
        <h1 className="ows_deck__title">Deck with id: {deck.id}</h1>
      </header>
      <div className="ows_deck__main ows_slides-list">
        {deck.slideIds.map(slideId => (
          <SlideContainer
            key={slideId}
            id={slideId}
            viewType={slideViewTypes.SAVE}
          />
        ))}
      </div>
    </section>
  );
}

DeckHtmlWrapper.propTypes = {
  deck: PropTypes.shape(deckShape).isRequired,
};

export default DeckHtmlWrapper;
