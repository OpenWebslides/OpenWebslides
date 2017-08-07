import contentItemFactory from 'lib/content-item-factories';

test('contentItemFactory', () => {
  const props = {
    ancestorItemIds: ['1-0-0'],
    attributes: { 'data-view-type': 'live' },
    contentItem: { contentItemType: 'TITLE', id: '1-0-1', inlineProperties: [], viewType: 'LIVE', text: 'sic parvis magna' },
    contentItemId: '1-0-1',
    editable: true,
    headingLevel: 2,
    slideId: '1-0',
    slideViewType: 'LIVE',
  };

  const result = contentItemFactory(props);
  expect(result).toEqual({});
})
;
