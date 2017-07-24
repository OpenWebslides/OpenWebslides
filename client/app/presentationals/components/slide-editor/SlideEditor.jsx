import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DeckNavigationPaneContainer from 'containers/slide-editor/DeckNavigationPaneContainer';
import SlideEditingPane from 'presentationals/components/slide-editor/SlideEditingPane';

export default class SlideEditor extends Component {
  componentDidMount() {
    const { deckId } = this.props.match.params;
    this.props.fetchDeck(deckId);
  }

  render() {
    // #TODO get rid of .l_main in presentational component
    return (
      <main className="l_main">
        <div className="l_main__wrapper">
          <div className="l_main__item l_main__item--deck-navigator">
            <div className="l_main__item__wrapper">
              <DeckNavigationPaneContainer {...this.props} />
            </div>
          </div>
          <div className="l_main__item l_main__item--slide-editor">
            <div className="l_main__item__wrapper">
              <SlideEditingPane {...this.props} />
            </div>
          </div>
        </div>
      </main>
    );
  }
}

SlideEditor.propTypes = {
  fetchDeck: PropTypes.func.isRequired,
  match: PropTypes.objectOf(Object).isRequired,
};
