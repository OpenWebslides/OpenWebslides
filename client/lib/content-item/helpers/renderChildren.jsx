import React from 'react';
import ContentItemContainer from 'lib/content-item/ContentItemContainer';

export default function renderChildren(props) {
  const {
    ancestorItemIds,
    slideId,
    editable,
    headingLevel,
    slideViewType,
    viewType,
    contentItem: { childItemIds, id },
  } = props;

  return childItemIds.map(childItemId => (
    <ContentItemContainer
      key={childItemId}
      viewType={viewType}
      slideViewType={slideViewType}
      contentItemId={childItemId}
      ancestorItemIds={ancestorItemIds.concat(id)}
      slideId={slideId}
      editable={editable}
      headingLevel={headingLevel + 1}
    />
      ),
  );
}
