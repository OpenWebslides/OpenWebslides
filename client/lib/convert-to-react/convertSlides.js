import React from 'react';

import convertContent from 'lib/convert-to-react/convertContent';
import Slide from 'presentationals/components/editor/Slide';

export default function convertToReact(slides) {
  const slideComponentArr = [];
  Object.keys(slides).forEach(key => {
    const slideContent = convertContent(slides[key].content, { active: false });
    const SlideComponent = React.createElement(
      Slide,
      { key, id: key },
      slideContent,
    );
    slideComponentArr.push(SlideComponent);
  });
  return slideComponentArr;
}
