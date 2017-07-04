function convertToPrint(htmlString) {
  const parser = new DOMParser();
  const document = parser.parseFromString(htmlString, 'text/html');

  debugger;
  const slidesArray = Array.from(document.body.children).filter(
    node => node.nodeName === 'SECTION' && node.className.includes('slide'),
  );
}

export default convertToPrint;
