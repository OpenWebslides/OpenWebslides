import { takeLatest, call, select } from 'redux-saga/effects';
import updateDeckApi from 'api/updateDeckApi';

import { UPDATE_DECK } from 'actions/entities/decks';

function addWrappingHtml(string) {
  return `
    <header class="caption">
    <h1>Presentation</h1>
    <p><a href="">Author</a></p>
    </header>
    ${string}
    <div class="progress"></div>
    <footer><p>Just some random data</p></footer>
  `;
}

function convertSlidesToHtml(slides, contentBlocks) {
  const slideIds = Object.keys(slides);
  let htmlString = '';

  slideIds.forEach(id => {
    const slideContentHTML = (function convertContentToHTML(slideContent) {
      let HTMLContent = '';

      slideContent.forEach(content => {
        if (content.type === 'contentGroup') {
          const childContent = convertContentToHTML(content.childContent);

          HTMLContent += `<section>${childContent}</section>`;
        } else {
          HTMLContent += convertToHTML(
            contentBlocks[content.id].data.getCurrentContent(),
          );
        }
      });
      return HTMLContent;
    })(slides[id].content);

    htmlString += `<section class="slide">${slideContentHTML}</section>`;
  });
  console.log(htmlString);
  return addWrappingHtml(htmlString);
}

function* doUpdateDeck() {
  try {
    const state = yield select();
    const HTMLString = yield convertSlidesToHtml(
      state.entities.slides.byId,
      state.entities.contentItems.byId,
    );

    yield call(updateDeckApi, 2, HTMLString);
  } catch (e) {
    console.log(e);
  }
}

function* fetchSlidesWatcher() {
  yield takeLatest(UPDATE_DECK, doUpdateDeck);
}

export default fetchSlidesWatcher;
