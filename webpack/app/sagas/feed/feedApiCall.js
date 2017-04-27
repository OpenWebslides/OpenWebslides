function getNotifications() {
  // For now just return some dummy events until we actually implement the API
  return [
    {
      timestamp: '1000',
      type: 'DECK_CREATED',
      targetDeck: 'OpenWebSlides',
      concernedUser: 'Florian',
      viewed: false,
    }, {
      timestamp: '1001',
      type: 'DECK_CREATED',
      targetDeck: 'World Domination',
      concernedUser: 'Rein',
      viewed: true,
    }, {
      timestamp: '1002',
      type: 'DECK_CREATED',
      targetDeck: 'The greatest deck ever. Bigly.',
      concernedUser: 'Donald Trump',
      viewed: true,
    }, {
      timestamp: '1003',
      type: 'DECK_UPDATED',
      targetDeck: 'How to always be on time',
      concernedUser: 'Gandalf',
      viewed: false,
    }, {
      timestamp: '1004',
      type: 'DECK_CREATED',
      targetDeck: 'Wake up!',
      concernedUser: 'Neo',
      viewed: true,
    },
  ];
}

export default getNotifications;
