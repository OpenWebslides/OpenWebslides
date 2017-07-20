import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { generateSlideId } from 'lib/convert-to-state/generateIds';

import SlideContainer from 'containers/slide-editor/SlideContainer';

export default class DeckNavigationPane extends Component {
  constructor(props) {
    super(props);
    this.handleAddSlide = this.handleAddSlide.bind(this);
    this.handleDeleteSlide = this.handleDeleteSlide.bind(this);
  }

  handleAddSlide() {
    const slideId = generateSlideId(this.props.activeDeck.id, this.props.activeDeck.slideSequence);
    console.log(this.props.activeDeck.slideSequence);
    this.props.addSlide(this.props.activeDeck.id, slideId);
  }

  handleDeleteSlide(selectedSlideId) {
    this.props.deleteSlideWithContent(this.props.activeDeck.id, selectedSlideId);
  }

  handleSetActiveSlideId(selectedSlideId) {
    this.props.setActiveSlideId(selectedSlideId);
  }

  render() {
    if (this.props.activeDeck) {
      return (
        <div className={`c_deck-navigator c_deck-navigator--${this.props.cssIdentifier}`}>
          <div className="c_deck-navigator__wrapper">
            <ol className="o_list c_deck-navigator__list">
              {this.props.activeDeck.slideIds.map(slideId =>
                <li className="o_list__item c_deck-navigator__item" key={slideId}>
                  <div className="o_list__item__wrapper c_deck-navigator__item__wrapper">
                    <button
                      onClick={() => this.handleSetActiveSlideId(slideId)}
                      className="c_deck-navigator__slide-button"
                    >
                      <SlideContainer id={slideId} />
                    </button>
                    <button
                      className="c_deck-navigator__delete-button o_action o_action--delete"
                      onClick={() => this.handleDeleteSlide(slideId)}
                    >
                      <span className="c_deck-navigator__delete-button__wrapper o_action__wrapper">
                        Delete
                      </span>
                    </button>
                  </div>
                </li>,
              )}
            </ol>
            <p className="c_deck-navigator__controls">
              <button onClick={this.handleAddSlide} className="c_deck-navigator__add-button o_action o_action--add">
                Add slide
              </button>
            </p>
          </div>
        </div>
      );
    }

    return <p>Loading...</p>;
  }
}

DeckNavigationPane.propTypes = {
  cssIdentifier: PropTypes.string,
  activeDeck: PropTypes.shape({
    id: PropTypes.string.isRequired,
    slideIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    slideSequence: PropTypes.number,
    meta: PropTypes.object,
  }),
  addSlide: PropTypes.func.isRequired,
  setActiveSlideId: PropTypes.func.isRequired,
  deleteSlideWithContent: PropTypes.func.isRequired,
};

DeckNavigationPane.defaultProps = {
  cssIdentifier: 'default',
  activeDeck: null,
};
