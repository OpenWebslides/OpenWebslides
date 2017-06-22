import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import convertSlides from 'lib/convert-to-react/renderReadOnlySlides';

export default class NavigationPane extends Component {
  constructor(props) {
    super(props);
    this.handleAddSlide = this.handleAddSlide.bind(this);
  }

  handleAddSlide() {
    this.props.addSlide(newSlideId);
  }

  handleSetActiveSlide(selectedSlideId) {
    this.props.setActiveSlide(selectedSlideId);
  }

  render() {
    if (!_.isEmpty(this.props.slides)) {
      const slideComponents = convertSlides(this.props.slides);
      return (
        <div
          className={`c_deck-navigator c_deck-navigator--${this.props
            .cssIdentifier}`}
        >
          <div className="c_deck-navigator__wrapper">
            <ol className="o_list c_deck-navigator__list">
              {slideComponents.map(slide =>
                <li
                  className="o_list__item c_deck-navigator__item"
                  key={slide.key}
                >
                  <div className="o_list__item__wrapper c_deck-navigator__item__wrapper">
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

NavigationPane.propTypes = {
  cssIdentifier: PropTypes.string,
  addSlide: PropTypes.func.isRequired,
  setActiveSlide: PropTypes.func.isRequired,
  slides: PropTypes.objectOf(Object),
};

NavigationPane.defaultProps = {
  cssIdentifier: 'default',
  slides: null,
};
