import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import convertToReact from 'lib/convert-to-react/renderReadOnlySlides';

export default class DeckNavigationPane extends Component {
  constructor(props) {
    super(props);
    this.handleAddSlide = this.handleAddSlide.bind(this);
    this.handleDeleteSlide = this.handleDeleteSlide.bind(this);
  }

  handleAddSlide() {
    const slideId = `${this.props.activeDeckId}-${this.props.slideSequence}`;
    console.log(slideId);
    this.props.addSlide(slideId);
  }

  handleDeleteSlide(selectedSlideId) {
    this.props.deleteSlideWithContent(selectedSlideId);
  }

  handleSetActiveSlide(selectedSlideId) {
    this.props.setActiveSlide(selectedSlideId);
  }

  render() {
    if (!_.isEmpty(this.props.slides)) {
      const slideComponents = convertToReact(this.props.slides);
      return (
        <div className={`c_deck-navigator c_deck-navigator--${this.props.cssIdentifier}`}>
          <div className="c_deck-navigator__wrapper">
            <ol className="o_list c_deck-navigator__list">
              {slideComponents.map(slide =>
                <li className="o_list__item c_deck-navigator__item" key={slide.key}>
                  <div className="o_list__item__wrapper c_deck-navigator__item__wrapper">
                    <button onClick={() => this.handleDeleteSlide(slide.props.id)}>
                      Delete
                    </button>
                    <button
                      key={slide.key}
                      onClick={() => this.handleSetActiveSlide(slide.props.id)}
                      className="c_deck-navigator__button"
                    >
                      {slide}
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

    return <div>Loading...</div>;
  }
}

DeckNavigationPane.propTypes = {
  cssIdentifier: PropTypes.string,
  activeDeckId: PropTypes.number,
  addSlide: PropTypes.func.isRequired,
  setActiveSlide: PropTypes.func.isRequired,
  deleteSlideWithContent: PropTypes.func.isRequired,
  slides: PropTypes.objectOf(Object),
  slideSequence: PropTypes.number,
};

DeckNavigationPane.defaultProps = {
  cssIdentifier: 'default',
  slideSequence: null,
  activeDeckId: null,
  slides: null,
};
