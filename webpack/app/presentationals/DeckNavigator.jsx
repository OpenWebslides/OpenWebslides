import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchSlides } from 'actions/fetchSlidesActions';
import { addSlide, selectSlide } from 'actions/slideActions';
import SlideContainer from './SlideContainer';
import parseDeckObject from '../../lib/parseDeckObject';

class DeckNavigator extends Component {
  constructor(props) {
    super(props);
    this.handleAddSlide = this.handleAddSlide.bind(this);
  }

  componentDidMount() {
    const id = 1;
    this.props.fetchSlides(id);
  }

  handleAddSlide() {
    const newSlideId = this.props.activeDeck.slides.allIds.length + 1;
    this.props.addSlide(newSlideId);
  }

  handleSelectSlide(selectedSlideId) {
    this.props.selectSlide(selectedSlideId);
  }

  render() {
    const { activeDeck } = this.props;

    if (!_.isEmpty(activeDeck)) {
      const slides = parseDeckObject(activeDeck);
      return (
        <div
          className={`c_deck-navigator c_deck-navigator--${this.props.cssIdentifier}`}
        >
          <div className="c_deck-navigator__wrapper">
            <ol className="o_list c_deck-navigator__list">
              {slides.map(slide => (
                <li
                  className="o_list__item c_deck-navigator__item"
                  key={slide.key}
                >
                  <div className="o_list__item__wrapper c_deck-navigator__item__wrapper">
                    <button
                      key={slide.key}
                      onClick={() => this.handleSelectSlide(slide.props.id)}
                      className="c_deck-navigator__button"
                    >
                      <SlideContainer key={slide.key}>
                        {slide}
                      </SlideContainer>
                    </button>
                  </div>
                </li>
              ))}
            </ol>
            <p className="c_deck-navigator__controls">
              <button
                onClick={this.handleAddSlide}
                className="c_deck-navigator__add-button o_action o_action--add"
              >
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

DeckNavigator.propTypes = {
  cssIdentifier: PropTypes.string.isRequired,
  fetchSlides: PropTypes.func.isRequired,
  addSlide: PropTypes.func.isRequired,
  selectSlide: PropTypes.func.isRequired,
  activeDeck: PropTypes.objectOf(Object),
};

DeckNavigator.defaultProps = {
  cssIdentifier: 'default',
  activeDeck: null,
};

function mapStateToProps(state) {
  return {
    activeDeck: state.data.activeDeck,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchSlides, addSlide, selectSlide }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckNavigator);
