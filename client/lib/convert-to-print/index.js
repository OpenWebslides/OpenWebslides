/* eslint-disable no-case-declarations */
import React from 'react';

function htmlToReact(htmlElement) {
  const type = htmlElement.tagName || 'text';
  switch (type) {
    case 'FIGURE':
    case 'DIV':
      return Array.from(htmlElement.childNodes).map(htmlToReact);
    case 'H1':
      return React.createElement('h1', null, htmlElement.innerText);
    case 'H2':
      return React.createElement('h2', null, htmlElement.innerText);
    case 'H3':
      return React.createElement('h3', null, htmlElement.innerText);
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
      return React.createElement('a', null, htmlElement.innerText);
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
      return React.createElement('div', { className: 'o__print-view-image' }, [
        React.createElement(
          'img',
          {
            src: require(`../../assets/images/testPrintView/${htmlElement
              .attributes[0].nodeValue}`),
            alt: htmlElement.alt,
            width: 400,
            height: 300,
          },
          null,
        ),
        React.createElement('figcaption', null, `Image: ${htmlElement.alt}`),
      ]);
    case 'VIDEO':
      return React.createElement(
        'p',
        null,
        `Video: ${htmlElement.children[0].attributes[2].nodeValue}`,
      );
    case 'IFRAME':
      return React.createElement('p', null, `iFrame: ${htmlElement.alt}`);
    case 'BLOCKQUOTE':
      return React.createElement(
        'blockquote',
        null,
        Array.from(htmlElement.childNodes).map(htmlToReact),
      );
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

  return slidesArray.reduce((arr, currentSlide) => {
    const thisSlideChildren = Array.from(currentSlide.children);
    const thisSlideElements = thisSlideChildren.map(htmlToReact);
    return arr.concat(thisSlideElements);
  }, []);
}

export default convertToPrint;
