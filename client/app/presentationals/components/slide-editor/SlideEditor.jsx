import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DeckNavigationPaneContainer from 'containers/slide-editor/DeckNavigationPaneContainer';
import SlideEditingPaneContainer from 'containers/slide-editor/SlideEditingPaneContainer';

export default class SlideEditor extends Component {
  componentDidMount() {
    this.props.fetchDeck(2);
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
              <SlideEditingPaneContainer {...this.props} />
            </div>
          </div>
        </div>
      </main>
    );
  }
}

SlideEditor.propTypes = {
  fetchDeck: PropTypes.func.isRequired,
};
