import serializeSlides from './serializeSlides';

function convertToState(htmlString) {
  const parser = new DOMParser();
  const document = parser.parseFromString(htmlString, 'text/html');

  const slidesArray = Array.from(document.body.children).filter(
    node => node.nodeName === 'SECTION' && node.className.includes('slide'),
  );

  return serializeSlides(slidesArray);
}

export default convertToState;
