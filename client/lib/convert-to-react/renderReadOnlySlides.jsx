import React from 'react';

import Slide from 'presentationals/components/slide-editor/Slide';
import ContentItemContainer from 'lib/content-item/ContentItemContainer';

export default function convertToReact(slides) {
  const slideComponentArr = [];

  Object.keys(slides).forEach(slideId => {
    const slide = (
      <Slide key={slideId} id={slideId}>
        {slides[slideId].contentItemIds.map(id => <ContentItemContainer key={id} id={id} />)}
      </Slide>
    );

    slideComponentArr.push(slide);
  });

  return slideComponentArr;
}
