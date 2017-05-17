import parseSlide from '../../lib/parseSlide';
import contentBlockTypes from '../../lib/contentBlockTypes';

describe('parseSlide', () => {
  // it('throws an error when target is no html string', () => {
  //   const string = 'In a hole under the ground, there lived a hobbit.';

  //   expect(() => parseSlide(string)).toThrowError('Invalid data');
  // });

  // it('throws an error when no wrapping section element is found', () => {
  //   const string =
  //     '<div><h1>In a hole under the ground, there lived a hobbit.</h1><div>';

  //   expect(() => parseSlide(string)).toThrowError('Invalid data');
  // });

  // it('returns an empty object when no childNodes are present', () => {
  //   const string = '<section></section>';

  //   expect(parseSlide(string)).toEqual({});
  // });

  it('can parse a top level node', () => {
    const string =
      '<section><h1>In a hole under the ground, there lived a hobbit.</h1></section>';

    expect(parseSlide(string)).toEqual({
      1: { id: 1, type: contentBlockTypes.H1, children: [2] },
      2: {
        id: 2,
        type: contentBlockTypes['#text'],
        data: 'In a hole under the ground, there lived a hobbit.',
      },
    });
  });

  it('can parse a top level node with a nested node of 1 level deep', () => {
    const string = '<section><h1>Like<em>tears</em>in the rain.</h1></section>';

    expect(parseSlide(string)).toEqual({
      1: { id: 1, type: contentBlockTypes.H1, children: [2, 3, 5] },
      2: { id: 2, type: contentBlockTypes['#text'], data: 'Like' },
      3: { id: 3, type: contentBlockTypes.EM, children: [4] },
      4: { id: 4, type: contentBlockTypes['#text'], data: 'tears' },
      5: { id: 5, type: contentBlockTypes['#text'], data: 'in the rain.' },
    });
  });

  it('can parse a top level node with multiple nested nodes of 1 level deep', () => {
    const string =
      '<section><h1>Like<em>tears</em><strong>in</strong>the<em>rain.</em></h1></section>';

    expect(parseSlide(string)).toEqual({
      1: { id: 1, type: contentBlockTypes.H1, children: [2, 3, 5, 7, 8] },
      2: { id: 2, type: contentBlockTypes['#text'], data: 'Like' },
      3: { id: 3, type: contentBlockTypes.EM, children: [4] },
      4: { id: 4, type: contentBlockTypes['#text'], data: 'tears' },
      5: { id: 5, type: contentBlockTypes.STRONG, children: [6] },
      6: { id: 6, type: contentBlockTypes['#text'], data: 'in' },
      7: { id: 7, type: contentBlockTypes['#text'], data: 'the' },
      8: { id: 8, type: contentBlockTypes.EM, children: [9] },
      9: { id: 9, type: contentBlockTypes['#text'], data: 'rain.' },
    });
  });

  it('can parse a top level node with a nested node of multiple levels deep', () => {
    const string =
      '<section><h1>Like<em>tears in the<strong>rain.</strong</em</h1></section>';

    expect(parseSlide(string)).toEqual({
      1: { id: 1, type: contentBlockTypes.H1, children: [2, 3] },
      2: { id: 2, type: contentBlockTypes['#text'], data: 'Like' },
      3: { id: 3, type: contentBlockTypes.EM, children: [4, 5] },
      4: { id: 4, type: contentBlockTypes['#text'], data: 'tears in the' },
      5: { id: 5, type: contentBlockTypes.STRONG, children: [6] },
      6: { id: 6, type: contentBlockTypes['#text'], data: 'rain.' },
    });
  });

  it('can parse a top level node with multiple nested nodes of multiple levels deep', () => {
    const string =
      '<section><h1>Like<em>tears<strong>in</strong></em><em>the<strong>rain.</strong</em</h1></section>';

    expect(parseSlide(string)).toEqual({
      1: { id: 1, type: contentBlockTypes.H1, children: [2, 3, 7] },
      2: { id: 2, type: contentBlockTypes['#text'], data: 'Like' },
      3: { id: 3, type: contentBlockTypes.EM, children: [4, 5] },
      4: { id: 4, type: contentBlockTypes['#text'], data: 'tears' },
      5: { id: 5, type: contentBlockTypes.STRONG, children: [6] },
      6: { id: 6, type: contentBlockTypes['#text'], data: 'in' },
      7: { id: 7, type: contentBlockTypes.EM, children: [8, 9] },
      8: { id: 8, type: contentBlockTypes['#text'], data: 'the' },
      9: { id: 9, type: contentBlockTypes.STRONG, children: [10] },
      10: { id: 10, type: contentBlockTypes['#text'], data: 'rain.' },
    });
  });

  it('can parse multiple top level nodes', () => {
    const string =
      '<section><h1>Like</h1><h2>tears</h2><h1>in the</h1><h2>rain.</h2></section>';

    expect(parseSlide(string)).toEqual({
      1: { id: 1, type: 'TITLE', children: [2] },
      2: { id: 2, type: 'TEXT', data: 'Like' },
      3: { id: 3, type: 'SUBTITLE', children: [4] },
      4: { id: 4, type: 'TEXT', data: 'tears' },
      5: { id: 5, type: 'TITLE', children: [6] },
      6: { id: 6, type: 'TEXT', data: 'in the' },
      7: { id: 7, type: 'SUBTITLE', children: [8] },
      8: { id: 8, type: 'TEXT', data: 'rain.' },
    });
  });

  it('can parse multiple top level nodes with multiple nested nodes', () => {
    const string =
      '<section><h1>Like<em>tears</em></h1><h2>in<strong>the</strong>rain.</h2></section>';

    expect(parseSlide(string)).toEqual({
      1: { id: 1, type: 'TITLE', children: [2, 3] },
      2: { id: 2, type: 'TEXT', data: 'Like' },
      3: { id: 3, type: 'EMPHASIS', children: [4] },
      4: { id: 4, type: 'TEXT', data: 'tears' },
      5: { id: 5, type: 'SUBTITLE', children: [6, 7, 9] },
      6: { id: 6, type: 'TEXT', data: 'in' },
      7: { id: 7, type: 'STRONG', children: [8] },
      8: { id: 8, type: 'TEXT', data: 'the' },
      9: { id: 9, type: 'TEXT', data: 'rain.' },
    });
  });

  it('can save the class of top level nodes', () => {
    const string =
      '<section><h1 class="blade">Like tears in the rain.</h1></section>';

    expect(parseSlide(string)).toEqual({
      1: {
        id: 1,
        type: contentBlockTypes.H1,
        children: [2],
        attributes: { classList: 'blade' },
      },
      2: {
        id: 2,
        type: contentBlockTypes['#text'],
        data: 'Like tears in the rain.',
      },
    });
  });

  it('can save multiple classes of top level nodes', () => {
    const string =
      '<section><h1 class="blade runner">Like tears in the rain.</h1></section>';

    expect(parseSlide(string)).toEqual({
      1: {
        id: 1,
        type: contentBlockTypes.H1,
        children: [2],
        attributes: { classList: 'blade runner' },
      },
      2: {
        id: 2,
        type: contentBlockTypes['#text'],
        data: 'Like tears in the rain.',
      },
    });
  });

  it('can save multiple classes of nested nodes', () => {
    const string =
      '<section><h1>Like<em class="blade runner">tears in the rain.</em></h1></section>';

    expect(parseSlide(string)).toEqual({
      1: { id: 1, type: contentBlockTypes.H1, children: [2, 3] },
      2: { id: 2, type: contentBlockTypes['#text'], data: 'Like' },
      3: {
        id: 3,
        type: contentBlockTypes.EM,
        children: [4],
        attributes: { classList: 'blade runner' },
      },
      4: {
        id: 4,
        type: contentBlockTypes['#text'],
        data: 'tears in the rain.',
      },
    });
  });

  it('can save multiple classes of top level nodes and nested nodes', () => {
    const string =
      '<section><h1 class="blade runner">Like<em class="blade runner">tears in the rain.</em></h1></section>';

    expect(parseSlide(string)).toEqual({
      1: {
        id: 1,
        type: contentBlockTypes.H1,
        children: [2, 3],
        attributes: { classList: 'blade runner' },
      },
      2: { id: 2, type: contentBlockTypes['#text'], data: 'Like' },
      3: {
        id: 3,
        type: contentBlockTypes.EM,
        children: [4],
        attributes: { classList: 'blade runner' },
      },
      4: {
        id: 4,
        type: contentBlockTypes['#text'],
        data: 'tears in the rain.',
      },
    });
  });

  it('can save a data attribute of top level nodes', () => {
    const string =
      '<section><h1 data-test="blade">Like tears in the rain.</h1></section>';

    expect(parseSlide(string)).toEqual({
      1: {
        id: 1,
        type: contentBlockTypes.H1,
        children: [2],
        attributes: { dataset: { test: 'blade' } },
      },
      2: {
        id: 2,
        type: contentBlockTypes['#text'],
        data: 'Like tears in the rain.',
      },
    });
  });

  it('can save multiple data attributes of top level nodes', () => {
    const string =
      '<section><h1 data-test1="blade" data-test2="runner">Like tears in the rain.</h1></section>';

    expect(parseSlide(string)).toEqual({
      1: {
        id: 1,
        type: contentBlockTypes.H1,
        children: [2],
        attributes: { dataset: { test1: 'blade', test2: 'runner' } },
      },
      2: {
        id: 2,
        type: contentBlockTypes['#text'],
        data: 'Like tears in the rain.',
      },
    });
  });

  it('can save multiple data attributes of nested nodes', () => {
    const string =
      '<section><h1>Like<em data-test1="blade" data-test2="runner">tears in the rain.</em></h1></section>';

    expect(parseSlide(string)).toEqual({
      1: { id: 1, type: contentBlockTypes.H1, children: [2, 3] },
      2: { id: 2, type: contentBlockTypes['#text'], data: 'Like' },
      3: {
        id: 3,
        type: contentBlockTypes.EM,
        children: [4],
        attributes: { dataset: { test1: 'blade', test2: 'runner' } },
      },
      4: {
        id: 4,
        type: contentBlockTypes['#text'],
        data: 'tears in the rain.',
      },
    });
  });

  it('can save multiple data attributes of top level nodes and nested nodes', () => {
    const string =
      '<section><h1 data-test1="blade" data-test2="runner">Like<em data-test1="blade" data-test2="runner">tears in the rain.</em></h1></section>';

    expect(parseSlide(string)).toEqual({
      1: {
        id: 1,
        type: contentBlockTypes.H1,
        children: [2, 3],
        attributes: { dataset: { test1: 'blade', test2: 'runner' } },
      },
      2: { id: 2, type: contentBlockTypes['#text'], data: 'Like' },
      3: {
        id: 3,
        type: contentBlockTypes.EM,
        children: [4],
        attributes: { dataset: { test1: 'blade', test2: 'runner' } },
      },
      4: {
        id: 4,
        type: contentBlockTypes['#text'],
        data: 'tears in the rain.',
      },
    });
  });

  it('can save long data attribute names in camelCase', () => {
    const string =
      '<section><h1 data-long-ass-name-with-1-2-numbers="blade">Like tears in the rain.</h1></section>';

    expect(parseSlide(string)).toEqual({
      1: {
        id: 1,
        type: contentBlockTypes.H1,
        children: [2],
        attributes: { dataset: { longAssNameWith12Numbers: 'blade' } },
      },
      2: {
        id: 2,
        type: contentBlockTypes['#text'],
        data: 'Like tears in the rain.',
      },
    });
  });

  it('can save the id of nodes', () => {
    const string =
      '<section><h1 id="blade">Like tears in the rain.</h1></section>';

    expect(parseSlide(string)).toEqual({
      1: {
        id: 1,
        type: contentBlockTypes.H1,
        children: [2],
        attributes: { id: 'blade' },
      },
      2: {
        id: 2,
        type: contentBlockTypes['#text'],
        data: 'Like tears in the rain.',
      },
    });
  });
});
