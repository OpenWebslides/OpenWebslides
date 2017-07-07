import React from 'react';

export default function convertToReact(slides) {
  const slideComponentArr = [];

  Object.keys(slides).forEach(() => {
    const SlideComponent = <h4>Placeholder</h4>;

    slideComponentArr.push(SlideComponent);
  });
  return slideComponentArr;
}
