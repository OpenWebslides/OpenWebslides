import React from 'react';
import PropTypes from 'prop-types';

import { getHTMLStringFromInlinePropertiesAndText } from 'lib/content-editable/inlineProperties';

import ContentEditableContainer from 'lib/content-editable/ContentEditableContainer';

export default function ListItem(props) {
  if (props.active) {
    return (
      <li>
        <ContentEditableContainer {...props} />
      </li>
    );
  }
  return (
    <li
      dangerouslySetInnerHTML={{
        __html: getHTMLStringFromInlinePropertiesAndText(props.contentItem.inlineProperties, props.contentItem.text),
      }}
    />
  );
}

ListItem.propTypes = {
  active: PropTypes.bool,
  contentItem: PropTypes.objectOf(Object).isRequired,
};

ListItem.defaultProps = {
  active: false,
};
