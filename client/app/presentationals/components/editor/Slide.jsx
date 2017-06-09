import React from 'react';
import PropTypes from 'prop-types';

function SlideContainer(props) {
  return (
    <div
      className={`c_slide-container c_slide-container--${props.cssIdentifier}`}
    >
      <div className="c_slide-container__wrapper">
        <div className="c_slide-container__size">
          <div className="c_slide-container__content">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}

SlideContainer.propTypes = {
  cssIdentifier: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
};

SlideContainer.defaultProps = {
  cssIdentifier: 'default',
};

export default SlideContainer;
