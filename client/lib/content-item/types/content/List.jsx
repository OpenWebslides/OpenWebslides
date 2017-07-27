import React from 'react';

import ContentItemContainer from 'lib/content-item/ContentItemContainer';

export default function List(props) {
  const { contentItem } = props;

  return (
    <div
      className={`c_slide-content-view-item__section c_slide-content-view-item__section--${contentItem.ordered ? 'ordered' : 'unordered'}-list`}
    >
      {contentItem.childItemIds.map(id => {
        return (<ContentItemContainer
          key={id}
          slideViewType={props.slideViewType}
          contentItemId={id}
          ancestorItemIds={props.ancestorItemIds.concat(props.contentItem.id)}
          slideId={props.slideId}
          editable={props.editable}
          headingLevel={props.headingLevel}
        />);
      })}
    </div>
  );
}
