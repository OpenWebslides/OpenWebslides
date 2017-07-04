import React from 'react';

function htmlToReact(htmlElement) {
  const type = htmlElement.tagName || 'text';
  switch (type) {
    case 'H1':
      return React.createElement('h1', null, htmlElement.innerText);
    case 'H2':
      return React.createElement('h2', null, htmlElement.innerText);
    case 'P':
      return React.createElement(
        'p',
        null,
        Array.from(htmlElement.childNodes).map(htmlToReact),
      );
    case 'SPAN':
      return React.createElement('span', null, htmlElement.innerText);
    case 'text':
      return React.createElement('span', null, htmlElement.data);
    case 'BR':
      return React.createElement('br', null, null);
    case 'UL':
      return React.createElement(
        'ul',
        null,
        Array.from(htmlElement.childNodes).map(htmlToReact),
      );
    case 'LI':
      return React.createElement(
        'li',
        null,
        Array.from(htmlElement.childNodes).map(htmlToReact),
      );
    case 'A':
      return React.createElement(
        'span',
        { className: 'link' },
        `${htmlElement.innerText} (Link to: ${htmlElement.href})`,
      );
    case 'STRONG':
      return React.createElement(
        'strong',
        null,
        Array.from(htmlElement.childNodes).map(htmlToReact),
      );
    case 'EM':
      return React.createElement(
        'em',
        null,
        Array.from(htmlElement.childNodes).map(htmlToReact),
      );
    case 'IMG':
      return React.createElement(
        'img',
        { src: htmlElement.src, alt: htmlElement.alt },
        null,
      );
    case 'IFRAME':
      return React.createElement('p', null, `Iframe: ${htmlElement.src}`);
    default:
      return React.createElement(
        'p',
        null,
        `Unsupported element: ${htmlElement.tagName}`,
      );
  }
}

function convertToPrint(htmlString) {
  const parser = new DOMParser();
  const document = parser.parseFromString(htmlString, 'text/html');

  // First we just keep a list of 'section' html elements
  // with class 'slide', so the list of the actual slide elements.
  const slidesArray = Array.from(document.body.children).filter(
    node => node.nodeName === 'SECTION' && node.className.includes('slide'),
  );

  const reactElementsArray = slidesArray.reduce((arr, currentSlide) => {
    const thisSlideChildren = Array.from(currentSlide.children);
    const thisSlideElements = thisSlideChildren.map(htmlToReact);
    return arr.concat(thisSlideElements);
  }, []);

  return reactElementsArray;
}

export default convertToPrint;
