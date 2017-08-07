import React from 'react';
import PropTypes from 'prop-types';


function PresentationToolbar(props) {
  return (
    <div id="presentation-toolbar">
      <button onClick={() => props.viewFirstSlide()}>First</button>
      <button onClick={() => props.viewPreviousSlide()}>Previous</button>
      <button onClick={() => props.viewNextSlide()}>Next</button>
      <button onClick={() => props.viewLastSlide()}>Last</button>
    </div>
  );
}

PresentationToolbar.propTypes = {
  viewFirstSlide: PropTypes.func.isRequired,
  viewPreviousSlide: PropTypes.func.isRequired,
  viewNextSlide: PropTypes.func.isRequired,
  viewLastSlide: PropTypes.func.isRequired,
};


export default PresentationToolbar;
