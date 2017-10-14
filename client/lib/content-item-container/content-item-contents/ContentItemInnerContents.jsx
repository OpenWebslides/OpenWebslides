import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { contentItemShape } from 'constants/propTypeShapes';

import getHtmlStringFromInlinePropertiesAndText from 'lib/getHtmlStringFromInlinePropertiesAndText';

import ContentItemContentEditable from './make-editable/ContentItemContentEditable';
import ContentItemEditableWrapper from './make-editable/ContentItemEditableWrapper';

function renderContentItemInnerContentsWithTextProps(
  contentItem,
  renderOptions,
  textPropOptions,
  passThroughProps,
) {
  let innerContents;

  if (renderOptions.isEditable) {
    const contentEditableContainers = [];
    let contentEditableContainer;

    textPropOptions.forEach((textPropOption) => {
      contentEditableContainer = (
        <ContentItemContentEditable
          key={`${contentItem.id}-${textPropOption.textPropName}`}
          contentItem={contentItem}
          {...textPropOption}
          {...passThroughProps}
        />
      );
      if (textPropOptions.length > 1) {
        contentEditableContainer = (
          <span
            className="o_content-editable-container-item"
            key={`${contentItem.id}-${textPropOption.textPropName}`}
          >
            <span className="o_content-editable-container-item__wrapper">
              {(textPropOption.textPropTitle !== '') && (
                <span className="o_content-editable-container-item__title">
                  <strong>{textPropOption.textPropTitle}:</strong>
                </span>
              )}
              <span className="o_content-editable-container-item__widget">
                {contentEditableContainer}
              </span>
            </span>
          </span>
        );
      }
      contentEditableContainers.push(contentEditableContainer);
    });

    innerContents = (
      <span className="o_content-editable-container">
        <span className="o_content-editable-container__wrapper">
          {contentEditableContainers.map(ContentEditableContainer => ContentEditableContainer)}
        </span>
      </span>
    );
  }
  else {
    let textPropHtmlString = '';

    textPropOptions.forEach((textPropOption, index) => {
      textPropHtmlString += (textPropOption.textPropTitle !== '')
        ? _.escape(`${textPropOption.textPropTitle}: `)
        : '';
      textPropHtmlString += getHtmlStringFromInlinePropertiesAndText(
        (textPropOption.hasInlineProperties) ? contentItem.inlineProperties : null,
        contentItem[textPropOption.textPropName],
      );
      if (index !== textPropOptions.length - 1) textPropHtmlString += ', ';
    });

    innerContents = (
      <span
        className="ows_pass-through"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: textPropHtmlString,
        }}
      />
    );
  }

  return innerContents;
}

function renderContentItemInnerContentsWithChildren(
  contentItem,
  renderOptions,
  children,
  passThroughProps,
) {
  let innerContents;

  if (renderOptions.isEditable) {
    innerContents = (
      <ContentItemEditableWrapper
        contentItem={contentItem}
        {...passThroughProps}
      >
        {children}
      </ContentItemEditableWrapper>
    );
  }
  else {
    innerContents = children;
  }

  return innerContents;
}

function ContentItemInnerContents(props) {
  const { contentItem, renderOptions, textPropOptions, children, ...passThroughProps } = props;
  let innerContents;

  if (textPropOptions.length > 0) {
    innerContents = renderContentItemInnerContentsWithTextProps(
      contentItem,
      renderOptions,
      textPropOptions,
      passThroughProps,
    );
  }
  else {
    innerContents = renderContentItemInnerContentsWithChildren(
      contentItem,
      renderOptions,
      children,
      passThroughProps,
    );
  }

  return innerContents;
}

ContentItemInnerContents.propTypes = {
  contentItem: PropTypes.shape(contentItemShape).isRequired,
  renderOptions: PropTypes.shape({
    isEditable: PropTypes.bool.isRequired,
  }).isRequired,
  textPropOptions: PropTypes.arrayOf(PropTypes.shape({
    textPropTitle: PropTypes.string.isRequired,
    textPropName: PropTypes.string.isRequired,
    hasInlineProperties: PropTypes.bool.isRequired,
    deleteOnBackspace: PropTypes.bool,
    contentEditableOptions: PropTypes.shape({
      isSingleLine: PropTypes.bool,
    }),
  })),
  children: PropTypes.node,
};

ContentItemInnerContents.defaultProps = {
  textPropOptions: [],
  children: null,
};

export default ContentItemInnerContents;
