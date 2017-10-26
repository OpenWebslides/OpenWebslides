import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SlideContainer from 'lib/slide-container/SlideContainer';
import { slideViewTypes } from 'constants/slideViewTypes';


export default class DeckNavigationPane extends Component {
  constructor(props) {
    super(props);
    this.handleAddSlide = this.handleAddSlide.bind(this);
    this.handleDeleteSlide = this.handleDeleteSlide.bind(this);
    this.handleIncreaseSlideLevel = this.handleIncreaseSlideLevel.bind(this);
    this.handleDecreaseSlideLevel = this.handleDecreaseSlideLevel.bind(this);
  }

  handleAddSlide() {
    // const numberOfSlides = this.props.activeDeck.slideIds.length;
    // const lastSlideId = this.props.activeDeck.slideIds[numberOfSlides - 1];
    this.props.addSlideToDeck(this.props.activeDeck.id, this.props.activeSlideId);
  }

  handleDeleteSlide(selectedSlideId) {
    this.props.deleteSlideFromDeck(this.props.activeDeck.id, selectedSlideId);
  }

  handleSetActiveSlideId(selectedSlideId) {
    this.props.setActiveSlideId(selectedSlideId);
  }

  handleIncreaseSlideLevel(selectedSlideId) {
    const selectedSlideIndex = this.props.activeDeck.slideIds.indexOf(selectedSlideId);
    // If the selected slide is the first one, there's no previous ID:
    const previousSlideId = selectedSlideIndex === 0 ?
      null : this.props.activeDeck.slideIds[selectedSlideIndex - 1];
    this.props.increaseSlideLevel(selectedSlideId, previousSlideId);
  }
  handleDecreaseSlideLevel(selectedSlideId) {
    const selectedSlideIndex = this.props.activeDeck.slideIds.indexOf(selectedSlideId);
    // If the selected slide is the last one, there's no next ID:
    const nextSlideId = selectedSlideIndex === this.props.activeDeck.slideIds.length - 1 ?
      null : this.props.activeDeck.slideIds[selectedSlideIndex + 1];
    this.props.decreaseSlideLevel(selectedSlideId, nextSlideId);
  }

  render() {
    if (this.props.activeDeck) {
      return (
        <div
          className={`c_deck-navigator c_deck-navigator--${this.props.cssIdentifier}`}
        >
          <div className="c_deck-navigator__wrapper">
            <p className="c_deck-navigator__controls">
              <button
                onClick={this.handleAddSlide}
                className="c_deck-navigator__add-button o_action o_action--add"
              >
                Add slide
              </button>
            </p>
            <ol className="o_list c_deck-navigator__list">
              {this.props.activeDeck.slideIds.map(slideId =>
                <li
                  className="o_list__item c_deck-navigator__item" key={slideId}
                >
                  <div
                    className="o_list__item__wrapper c_deck-navigator__item__wrapper"
                  >
                    <button
                      onClick={() => this.handleSetActiveSlideId(slideId)}
                      className="c_deck-navigator__slide-button"
                    >
                      <SlideContainer id={slideId} viewType={slideViewTypes.NAVIGATION} />
                    </button>
                    <button
                      className="c_deck-navigator__delete-button o_action o_action--delete"
                      onClick={() => this.handleDeleteSlide(slideId)}
                    >
                      <span
                        className="c_deck-navigator__delete-button__wrapper o_action__wrapper"
                      >
                        Delete
                      </span>
                    </button>
                    <button
                      className="c_deck-navigator__increase-slide-level-button
                      o_action o_action--increase-slide-level"
                      onClick={() => this.handleIncreaseSlideLevel(slideId)}
                    >
                      <span
                        className="c_deck-navigator__increase-slide-level-button__wrapper
                        o_action__wrapper"
                      >
                        Increase level
                      </span>
                    </button>
                    <button
                      className="c_deck-navigator__decrease-slide-level-button
                      o_action o_action--decrease-slide-level"
                      onClick={() => this.handleDecreaseSlideLevel(slideId)}
                    >
                      <span
                        className="c_deck-navigator__decrease-slide-level-button__wrapper
                        o_action__wrapper"
                      >
                        Decrease level
                      </span>
                    </button>
                  </div>
                </li>,
              )}
            </ol>
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
  setActiveSlideId: PropTypes.func.isRequired,
  addSlideToDeck: PropTypes.func.isRequired,
  deleteSlideFromDeck: PropTypes.func.isRequired,
  increaseSlideLevel: PropTypes.func.isRequired,
  decreaseSlideLevel: PropTypes.func.isRequired,
};

DeckNavigationPane.defaultProps = {
  cssIdentifier: 'default',
  activeDeck: null,
};
