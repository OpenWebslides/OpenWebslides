/* eslint-disable */
const exampleState = {
  app: {
    authentication: {
      isAuthenticated: true,
      firstName: 'testFirstName',
      authToken:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0OTk1MTQwNDksInN1YiI6MTQsInZlciI6Mn0.DrQHVo5O0D0iB6K6rXIdR2YPNRW9QekM-rBAWXakJvw',
      id: '14',
    },
    confirmEmail: {
      emailConfirmed: 'confirming',
    },
    slideEditor: {
      activeDeckId: '53',
      activeSlideId: '53-1',
      activeContentItemId: null,
      focusedContentItemId: null,
      focusedTextPropName: null,
      selectionOffsets: {
        start: 0,
        end: 0,
      },
      activeSlideViewTypes: ['CONTENT', 'LIVE'],
      focusedSlideViewType: null,
      hasChanged: false,
    },
    feed: {
      listOfFeedNotifications: [],
      sentRequestForList: false,
      receivedList: false,
      errorMessage: '',
      currentOffset: 0,
      typeFilter: 'ALL',
    },
    deckManagement: {
      listOfDecks: [],
      sentRequestForDecksList: false,
      receivedList: false,
      listErrorMessage: '',
      sentDeletionRequestFor: null,
      deletionErrorMessage: '',
    },
  },
  entities: {
    decks: {
      byId: {
        '53': {
          id: '53',
          slideIds: ['53-1', '53-2', '53-4', '53-5'],
          slideSequence: 6,
          meta: {
            authorId: 32,
            title: 'Test deck',
            description: 'a really nice deck',
          },
        },
      },
    },
    slides: {
      byId: {
        '53-1': {
          id: '53-1',
          level: 1,
          contentItemIds: ['53-1-0', '53-1-1', '53-1-2', '53-1-5'],
          contentItemSequence: 8,
          meta: {},
        },
      },
    },
    contentItems: {
      byId: {
        '53-1-0': {
          id: '53-1-0',
          contentItemType: TITLE,
          viewType: LIVE,
          text: 'sic parvis magna',
          inlineProperties: [
            {
              type: EM,
              offsets: {
                start: 0,
                end: 4,
              },
            },
            {
              type: STRONG,
              offsets: {
                start: 8,
                end: 14,
              },
            },
            {
              type: LINK,
              offsets: {
                start: 15,
                end: 20,
              },
              attr: {
                href: 'link',
              },
            },
          ],
        },
        '53-1-1': {
          id: '53-1-1',
          contentItemType: PARAGRAPH,
          viewType: LIVE,
          text: 'sic parvis magna',
          inlineProperties: [],
        },
        '53-1-2': {
          id: '53-1-2',
          contentItemType: SECTION,
          viewType: LIVE,
          childItemIds: ['53-1-3', '53-1-4'],
        },
        '53-1-3': {
          id: '53-1-3',
          contentItemType: TITLE,
          viewType: LIVE,
          text: 'sic parvis magna',
          inlineProperties: [],
        },
        '53-1-4': {
          id: '53-1-4',
          contentItemType: PARAGRAPH,
          viewType: LIVE,
          text: 'sic parvis magna',
          inlineProperties: [],
        },
        '53-1-5': {
          id: '53-1-5',
          contentItemType: SECTION,
          viewType: LIVE,
          childItemIds: ['53-1-6', '53-1-7'],
        },
        '53-1-6': {
          id: '53-1-6',
          contentItemType: TITLE,
          viewType: LIVE,
          text: 'sic parvis magna',
          inlineProperties: [],
        },
        '53-1-7': {
          id: '53-1-7',
          contentItemType: PARAGRAPH,
          viewType: LIVE,
          text: 'sic parvis magna',
          inlineProperties: [],
        },
        '53-1-8': {
          id: '53-1-8',
          contentItemType: PARAGRAPH,
          viewType: COURSE,
          text: 'This paragraph is only visible in course mode.',
          inlineProperties: [],
        },
      },
    },
  },
  vendor: {
    forms: {},
  },
};
/* eslint-enable */
