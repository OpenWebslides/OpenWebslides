import React from 'react';
import parseSlideObject from '../../lib/parseDeckObject';
import contentBlockTypes from '../../lib/contentBlockTypes';
import reactContentBlocks from '../../lib/reactContentBlocks';

describe('parseDeckObject', () => {
  xit('can parse an object with one node to a React element', () => {
    const deckObject = {
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
    };

    expect(parseSlideObject(deckObject)).toEqual([
      <reactContentBlocks.Slide key="slide1">
        {[
          <reactContentBlocks.Title key="contentBlock1">
            {['Like tears in the rain.']}
          </reactContentBlocks.Title>,
        ]}
      </reactContentBlocks.Slide>,
    ]);
  });

  xit('can parse an object with two nodes to a React element', () => {
    const deckObject = {
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
    };

    expect(parseSlideObject(deckObject)).toEqual([
      <reactContentBlocks.Slide key="slide1">
        {[
          <reactContentBlocks.Title key="contentBlock1">
            {[
              'Like',
              <reactContentBlocks.EmphasizedText key="contentBlock3">
                {['tears']}
              </reactContentBlocks.EmphasizedText>,
            ]}
          </reactContentBlocks.Title>,
        ]}
      </reactContentBlocks.Slide>,
      <reactContentBlocks.Slide key="slide2">
        {[
          <reactContentBlocks.Subtitle key="contentBlock5">
            {[
              'in',
              <reactContentBlocks.StrongText key="contentBlock7">
                {['the']}
              </reactContentBlocks.StrongText>,
              'rain.',
            ]}
          </reactContentBlocks.Subtitle>,
        ]}
      </reactContentBlocks.Slide>,
    ]);
  });

  xit(
    'can parse an object representing nested nodes to a React element',
    () => {
      const slideObject = {
        1: { id: 1, type: contentBlockTypes.H1, children: [2, 3, 5] },
        2: {
          id: 2,
          type: contentBlockTypes['#text'],
          data: 'Like tears in the rain',
        },
        3: { id: 3, type: contentBlockTypes.EM, children: [4] },
        4: { id: 4, type: contentBlockTypes['#text'], data: 'tears' },
        5: { id: 5, type: contentBlockTypes['#text'], data: 'in the rain' },
      };

      expect(parseSlideObject(slideObject)).toEqual([
        <reactContentBlocks.Title>
          {['Like tears in the rain']}
        </reactContentBlocks.Title>,
      ]);
    },
  );
});
