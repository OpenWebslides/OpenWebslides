import React from 'react';
import PropTypes from 'prop-types';

import { getHTMLStringFromInlinePropertiesAndText } from 'lib/content-editable/inlineProperties';

import ContentEditableContainer from 'lib/content-editable/ContentEditableContainer';

export default function Title(props) {
  if (props.editable) {
    const TitleTag = `h${props.headingLevel}`;

    return (
      <TitleTag>
        <ContentEditableContainer contentItem={props.contentItem} />
      </TitleTag>
    );
  }
  return (
    <h1
      dangerouslySetInnerHTML={{
        __html: getHTMLStringFromInlinePropertiesAndText(props.contentItem.inlineProperties, props.contentItem.text),
      }}
    />
  );
}

Title.propTypes = {
  editable: PropTypes.bool,
  contentItem: PropTypes.object.isRequired,
};

Title.defaultProps = {
  editable: false,
};
