import React from 'react';

import convertContent from 'lib/convert-to-react/convertContent';
import Slide from 'presentationals/components/slide-editor/Slide';

export default function convertToReact(slides) {
  const slideComponentArr = [];

  Object.keys(slides).forEach(key => {
    const slideContent = convertContent(slides[key].content, { active: false });

    const SlideComponent = <Slide key={key} id={key}>{slideContent}</Slide>;

    slideComponentArr.push(SlideComponent);
  });
  return slideComponentArr;
}
