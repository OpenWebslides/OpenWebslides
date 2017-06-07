import parseDeck from '../../lib/parseDeckString';
import contentBlockTypes from '../../lib/contentBlockTypes';

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

describe('parseSlideString', () => {
  xit('throws an error when target is no html string', () => {
    const string = 'In a hole under the ground, there lived a hobbit.';

    expect(() => parseDeck(string)).toThrowError('Invalid data');
  });

  xit('throws an error when no wrapping section element is found', () => {
    const wrongData = '<div><h1>Presentation Title</h1><div>';
    const deckString = addWrappingHtml(wrongData);

    expect(() => parseDeck(deckString)).toThrowError('Invalid data');
  });

  xit('returns an empty deck when no slides are present', () => {
    const slides = '';
    const deckString = addWrappingHtml(slides);

    expect(parseDeck(deckString)).toEqual({
      slides: { byId: {}, allIds: [] },
      contentBlocks: { byId: {}, allIds: [] },
    });
  });

  xit('can parse a simple slide', () => {
    const slideElement = '<section><h1>Like tears in the rain.</h1></section>';
    const string = addWrappingHtml(slideElement);

    expect(parseDeck(string)).toEqual({
      slides: {
        byId: { 1: { id: 1, contentBlocks: [1] } },
        allIds: [1],
      },
      contentBlocks: {
        byId: {
          1: { id: 1, type: contentBlockTypes.H1, childIds: [2] },
          2: {
            id: 2,
            type: contentBlockTypes['#text'],
            value: 'Like tears in the rain.',
          },
        },
        allIds: [1, 2],
      },
    });
  });

  xit('can parse a top level node with a nested node of 1 level deep', () => {
    const slides = '<section><h1>Like<em>tears</em>in the rain.</h1></section>';
    const deckString = addWrappingHtml(slides);

    expect(parseDeck(deckString)).toEqual({
      slides: {
        byId: { 1: { id: 1, contentBlocks: [1] } },
        allIds: [1],
      },
      contentBlocks: {
        byId: {
          1: { id: 1, type: contentBlockTypes.H1, childIds: [2, 3, 5] },
          2: { id: 2, type: contentBlockTypes['#text'], value: 'Like' },
          3: { id: 3, type: contentBlockTypes.EM, childIds: [4] },
          4: { id: 4, type: contentBlockTypes['#text'], value: 'tears' },
          5: { id: 5, type: contentBlockTypes['#text'], value: 'in the rain.' },
        },
        allIds: [1, 2, 3, 4, 5],
      },
    });
  });

  xit(
    'can parse a top level node with multiple nested nodes of 1 level deep',
    () => {
      const slides =
        '<section><h1>Like<em>tears</em><strong>in</strong>the<em>rain.</em></h1></section>';
      const deckString = addWrappingHtml(slides);

      expect(parseDeck(deckString)).toEqual({
        slides: {
          byId: { 1: { id: 1, contentBlocks: [1] } },
          allIds: [1],
        },
        contentBlocks: {
          byId: {
            1: { id: 1, type: contentBlockTypes.H1, childIds: [2, 3, 5, 7, 8] },
            2: { id: 2, type: contentBlockTypes['#text'], value: 'Like' },
            3: { id: 3, type: contentBlockTypes.EM, childIds: [4] },
            4: { id: 4, type: contentBlockTypes['#text'], value: 'tears' },
            5: { id: 5, type: contentBlockTypes.STRONG, childIds: [6] },
            6: { id: 6, type: contentBlockTypes['#text'], value: 'in' },
            7: { id: 7, type: contentBlockTypes['#text'], value: 'the' },
            8: { id: 8, type: contentBlockTypes.EM, childIds: [9] },
            9: { id: 9, type: contentBlockTypes['#text'], value: 'rain.' },
          },
          allIds: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        },
      });
    },
  );

  xit(
    'can parse a top level node with a nested node of multiple levels deep',
    () => {
      const slides =
        '<section><h1>Like<em>tears in the<strong>rain.</strong</em</h1></section>';
      const deckString = addWrappingHtml(slides);

      expect(parseDeck(deckString)).toEqual({
        slides: {
          byId: { 1: { id: 1, contentBlocks: [1] } },
          allIds: [1],
        },
        contentBlocks: {
          byId: {
            1: { id: 1, type: contentBlockTypes.H1, childIds: [2, 3] },
            2: { id: 2, type: contentBlockTypes['#text'], value: 'Like' },
            3: { id: 3, type: contentBlockTypes.EM, childIds: [4, 5] },
            4: {
              id: 4,
              type: contentBlockTypes['#text'],
              value: 'tears in the',
            },
            5: { id: 5, type: contentBlockTypes.STRONG, childIds: [6] },
            6: { id: 6, type: contentBlockTypes['#text'], value: 'rain.' },
          },
          allIds: [1, 2, 3, 4, 5, 6],
        },
      });
    },
  );

  xit(
    'can parse a top level node with multiple nested nodes of multiple levels deep',
    () => {
      const slides =
        '<section><h1>Like<em>tears<strong>in</strong></em><em>the<strong>rain.</strong</em</h1></section>';
      const deckString = addWrappingHtml(slides);

      expect(parseDeck(deckString)).toEqual({
        slides: {
          byId: { 1: { id: 1, contentBlocks: [1] } },
          allIds: [1],
        },
        contentBlocks: {
          byId: {
            1: { id: 1, type: contentBlockTypes.H1, childIds: [2, 3, 7] },
            2: { id: 2, type: contentBlockTypes['#text'], value: 'Like' },
            3: { id: 3, type: contentBlockTypes.EM, childIds: [4, 5] },
            4: { id: 4, type: contentBlockTypes['#text'], value: 'tears' },
            5: { id: 5, type: contentBlockTypes.STRONG, childIds: [6] },
            6: { id: 6, type: contentBlockTypes['#text'], value: 'in' },
            7: { id: 7, type: contentBlockTypes.EM, childIds: [8, 9] },
            8: { id: 8, type: contentBlockTypes['#text'], value: 'the' },
            9: { id: 9, type: contentBlockTypes.STRONG, childIds: [10] },
            10: { id: 10, type: contentBlockTypes['#text'], value: 'rain.' },
          },
          allIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
      });
    },
  );

  xit('can parse multiple top level nodes', () => {
    const slides =
      '<section><h1>Like</h1><h2>tears</h2><h1>in the</h1><h2>rain.</h2></section>';
    const deckString = addWrappingHtml(slides);

    expect(parseDeck(deckString)).toEqual({
      slides: {
        byId: { 1: { id: 1, contentBlocks: [1, 3, 5, 7] } },
        allIds: [1],
      },
      contentBlocks: {
        byId: {
          1: { id: 1, type: contentBlockTypes.H1, childIds: [2] },
          2: { id: 2, type: contentBlockTypes['#text'], value: 'Like' },
          3: { id: 3, type: contentBlockTypes.H2, childIds: [4] },
          4: { id: 4, type: contentBlockTypes['#text'], value: 'tears' },
          5: { id: 5, type: contentBlockTypes.H1, childIds: [6] },
          6: { id: 6, type: contentBlockTypes['#text'], value: 'in the' },
          7: { id: 7, type: contentBlockTypes.H2, childIds: [8] },
          8: { id: 8, type: contentBlockTypes['#text'], value: 'rain.' },
        },
        allIds: [1, 2, 3, 4, 5, 6, 7, 8],
      },
    });
  });

  xit('can parse multiple top level nodes with multiple nested nodes', () => {
    const slides =
      '<section><h1>Like<em>tears</em></h1><h2>in<strong>the</strong>rain.</h2></section>';
    const deckString = addWrappingHtml(slides);

    expect(parseDeck(deckString)).toEqual({
      slides: {
        byId: { 1: { id: 1, contentBlocks: [1, 5] } },
        allIds: [1],
      },
      contentBlocks: {
        byId: {
          1: { id: 1, type: contentBlockTypes.H1, childIds: [2, 3] },
          2: { id: 2, type: contentBlockTypes['#text'], value: 'Like' },
          3: { id: 3, type: contentBlockTypes.EM, childIds: [4] },
          4: { id: 4, type: contentBlockTypes['#text'], value: 'tears' },
          5: { id: 5, type: contentBlockTypes.H2, childIds: [6, 7, 9] },
          6: { id: 6, type: contentBlockTypes['#text'], value: 'in' },
          7: { id: 7, type: contentBlockTypes.STRONG, childIds: [8] },
          8: { id: 8, type: contentBlockTypes['#text'], value: 'the' },
          9: { id: 9, type: contentBlockTypes['#text'], value: 'rain.' },
        },
        allIds: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
    });
  });

  xit('can parse multiple slides with 1 content block', () => {
    const slides =
      '<section><h1>Like<em>tears</em></h1></section><section><h2>in<strong>the</strong>rain.</h2></section>';
    const deckString = addWrappingHtml(slides);

    expect(parseDeck(deckString)).toEqual({
      slides: {
        byId: {
          1: { id: 1, contentBlocks: [1] },
          2: { id: 2, contentBlocks: [5] },
        },
        allIds: [1, 2],
      },
      contentBlocks: {
        byId: {
          1: { id: 1, type: contentBlockTypes.H1, childIds: [2, 3] },
          2: { id: 2, type: contentBlockTypes['#text'], value: 'Like' },
          3: { id: 3, type: contentBlockTypes.EM, childIds: [4] },
          4: { id: 4, type: contentBlockTypes['#text'], value: 'tears' },
          5: { id: 5, type: contentBlockTypes.H2, childIds: [6, 7, 9] },
          6: { id: 6, type: contentBlockTypes['#text'], value: 'in' },
          7: { id: 7, type: contentBlockTypes.STRONG, childIds: [8] },
          8: { id: 8, type: contentBlockTypes['#text'], value: 'the' },
          9: { id: 9, type: contentBlockTypes['#text'], value: 'rain.' },
        },
        allIds: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
    });
  });

  xit('can parse multiple slides with multiple nested content blocks', () => {
    const slides =
      '<section><h1>Like<em>tears<strong>in</strong></em></h1></section><section><h2><em>the<strong>rain.</strong</em</h2></section>';
    const deckString = addWrappingHtml(slides);

    expect(parseDeck(deckString)).toEqual({
      slides: {
        byId: {
          1: { id: 1, contentBlocks: [1] },
          2: { id: 2, contentBlocks: [7] },
        },
        allIds: [1, 2],
      },
      contentBlocks: {
        byId: {
          1: { id: 1, type: contentBlockTypes.H1, childIds: [2, 3] },
          2: { id: 2, type: contentBlockTypes['#text'], value: 'Like' },
          3: { id: 3, type: contentBlockTypes.EM, childIds: [4, 5] },
          4: { id: 4, type: contentBlockTypes['#text'], value: 'tears' },
          5: { id: 5, type: contentBlockTypes.STRONG, childIds: [6] },
          6: { id: 6, type: contentBlockTypes['#text'], value: 'in' },
          7: { id: 7, type: contentBlockTypes.H2, childIds: [8] },
          8: { id: 8, type: contentBlockTypes.EM, childIds: [9, 10] },
          9: { id: 9, type: contentBlockTypes['#text'], value: 'the' },
          10: { id: 10, type: contentBlockTypes.STRONG, childIds: [11] },
          11: { id: 11, type: contentBlockTypes['#text'], value: 'rain.' },
        },
        allIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      },
    });
  });

  xit('can save the html classes of content blocks', () => {
    const slides =
      '<section><h1 class="blade runner">Like tears in the rain.</h1></section>';
    const deckString = addWrappingHtml(slides);

    expect(parseDeck(deckString)).toEqual({
      slides: {
        byId: { 1: { id: 1, contentBlocks: [1] } },
        allIds: [1],
      },
      contentBlocks: {
        byId: {
          1: {
            id: 1,
            type: contentBlockTypes.H1,
            childIds: [2],
            attributes: { className: 'blade runner' },
          },
          2: {
            id: 2,
            type: contentBlockTypes['#text'],
            value: 'Like tears in the rain.',
          },
        },
        allIds: [1, 2],
      },
    });
  });

  xit('can parse data attributes of content blocks', () => {
    const slides =
      '<section><h1 data-property1="value1" data-property2="value2">Like tears in the rain.</h1></section>';
    const deckString = addWrappingHtml(slides);

    expect(parseDeck(deckString)).toEqual({
      slides: {
        byId: { 1: { id: 1, contentBlocks: [1] } },
        allIds: [1],
      },
      contentBlocks: {
        byId: {
          1: {
            id: 1,
            type: contentBlockTypes.H1,
            childIds: [2],
            attributes: { data: { property1: 'value1', property2: 'value2' } },
          },
          2: {
            id: 2,
            type: contentBlockTypes['#text'],
            value: 'Like tears in the rain.',
          },
        },
        allIds: [1, 2],
      },
    });
  });

  xit('can save long data attribute names with dashes in camelCase', () => {
    const slides =
      '<section><h1 data-long-property-name-with-1-2-numbers="value1">Like tears in the rain.</h1></section>';
    const deckString = addWrappingHtml(slides);

    expect(parseDeck(deckString)).toEqual({
      slides: {
        byId: { 1: { id: 1, contentBlocks: [1] } },
        allIds: [1],
      },
      contentBlocks: {
        byId: {
          1: {
            id: 1,
            type: contentBlockTypes.H1,
            childIds: [2],
            attributes: { data: { longPropertyNameWith12Numbers: 'value1' } },
          },
          2: {
            id: 2,
            type: contentBlockTypes['#text'],
            value: 'Like tears in the rain.',
          },
        },
        allIds: [1, 2],
      },
    });
  });

  xit('can save the html id of content blocks', () => {
    const slides =
      '<section><h1 id="blade">Like tears in the rain.</h1></section>';
    const deckString = addWrappingHtml(slides);
    expect(parseDeck(deckString)).toEqual({
      slides: {
        byId: { 1: { id: 1, contentBlocks: [1] } },
        allIds: [1],
      },
      contentBlocks: {
        byId: {
          1: {
            id: 1,
            type: contentBlockTypes.H1,
            childIds: [2],
            attributes: { id: 'blade' },
          },
          2: {
            id: 2,
            type: contentBlockTypes['#text'],
            value: 'Like tears in the rain.',
          },
        },
        allIds: [1, 2],
      },
    });
  });
});
