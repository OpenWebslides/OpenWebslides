import React from 'react';
import PropTypes from 'prop-types';
import { iframeOptionsText } from 'constants/printViewOptions';

function iframeOptions() {
  return Object.keys(iframeOptionsText).map(type =>
    <option key={type} value={type}> {iframeOptionsText[type]} </option>,
  );
}

function SelectIframeOptions({ selectedIframePref, changeIframePref }) {
  return (
    <p>
      Choose image behaviour:
      <select
        key={selectedIframePref}
        value={selectedIframePref}
        onChange={e => {
          const target = e.target.value;
          return changeIframePref(target);
        }}
      >
        {iframeOptions()}
      </select>
    </p>
  );
}

SelectIframeOptions.propTypes = {
  selectedIframePref: PropTypes.oneOf(Object.keys(iframeOptionsText)),
  changeIframePref: PropTypes.func.isRequired,
};

SelectIframeOptions.defaultProps = {
  selectedIframePref: 'DESCRIPTION  ',
};

export default SelectIframeOptions;
