import React from 'react';
import PropTypes from 'prop-types';

import { listItemContentItemShape } from 'constants/propTypeShapes';

export default function ListItem(props) {
  const { children, attributes } = props;

  return (
    <li {...attributes} >
      {children}
    </li>
  );
}

ListItem.propTypes = {
  contentItem: PropTypes.shape(listItemContentItemShape).isRequired,
  attributes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

ListItem.defaultProps = {
  children: '',
};
