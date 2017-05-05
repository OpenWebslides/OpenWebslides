function getNotifications() {
  // For now just return some dummy events until we actually implement the API
  const samples = [
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
      targetDeck: 'ts ard to rwtie with onw hnd',
      concernedUser: 'Jamie Lannister ',
      viewed: false,
    }, {
      timestamp: '1005',
      type: 'DECK_UPDATED',
      targetDeck: 'You shall not use html tables for a list',
      concernedUser: 'Min',
      viewed: true,
    }, {
      timestamp: '1006',
      type: 'DECK_CREATED',
      targetDeck: 'Hey! I\'m making a deck! Funny how deck almost sounds like [censured]. Wait, seriously, I can\'t write' +
      '[censured]? What kind of lame-[censured] app is this? I bet you that the developpers are all dorks. And that they don\'t have friends. ' +
      'And that they\'re mad at me because this title is way to long now. Hah! [censored] you developers!',
      concernedUser: 'Deadpool',
      viewed: false,
    }, {
      timestamp: '1007',
      type: 'DECK_UPDATED',
      targetDeck: 'How to come up with funny deck names',
      concernedUser: 'Luca',
      viewed: true,
    }, {
      timestamp: '1008',
      type: 'DECK_CREATED',
      targetDeck: 'The way of the Jedi',
      concernedUser: 'Obi-Wan',
      viewed: true,
    }, {
      timestamp: '1009',
      type: 'DECK_CREATED',
      targetDeck: 'Let it go',
      concernedUser: 'The frozen chick',
      viewed: false,
    }, {
      timestamp: '1010',
      type: 'DECK_UPDATED',
      targetDeck: 'I should really write a generator for deck names',
      concernedUser: 'Luca Dorigo',
      viewed: true,
    },
  ];

  return samples;
}

export default getNotifications;
