import React from 'react';
import PropTypes from 'prop-types';

import { feedElementTypes } from '../../constants/feedConstants';

function FeedToolbar({ selectedType, typeChange }) {
  function types() {
    const typeOptions = Object.keys(feedElementTypes).map(type => (
      <option value={type}> {feedElementTypes[type]} </option>
    ));
    return typeOptions;
  }

  return (
    <div className="c_feed-toolbar">
      <p>
        {' '}Filter by type: <select
          key={selectedType}
          value={selectedType}
          onChange={e => {
            // pass the new value to the feedContainer method
            const target = e.target.value;
            return typeChange(target);
          }}
        >
          {types()}
        </select>{' '}
      </p>
    </div>
  );
}

FeedToolbar.propTypes = {
  selectedType: PropTypes.oneOf(Object.keys(feedElementTypes)),
  typeChange: PropTypes.func.isRequired,
};

FeedToolbar.defaultProps = {
  selectedType: 'ALL',
};
export default FeedToolbar;
