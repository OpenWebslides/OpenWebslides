# frozen_string_literal: true
require 'rails_helper'

RSpec.describe DeckPolicy do
  subject { described_class }

  permissions :read? do
    it 'allows guests read access only on public decks' do
      public_deck = build :deck, :state => :public_access
      protected_deck = build :deck, :state => :protected_access
      private_deck = build :deck, :state => :private_access

      expect(subject).to permit nil, public_deck
      expect(subject).not_to permit nil, protected_deck
      expect(subject).not_to permit nil, private_deck
    end

    it 'allows members read access on protected decks' do
      public_deck = build :deck, :state => :public_access
      protected_deck = build :deck, :state => :protected_access
      private_deck = build :deck, :state => :private_access

      user = build :user

      expect(subject).to permit user, public_deck
      expect(subject).to permit user, protected_deck
      expect(subject).not_to permit user, private_deck
    end

    it 'allows contributors read access on private decks contributed to' do
      public_deck = build :deck, :state => :public_access
      protected_deck = build :deck, :state => :protected_access
      private_deck = build :deck, :state => :private_access
      contributed_deck = build :deck, :state => :private_access

      contributor = build :user
      contributed_deck.contributors << contributor

      expect(subject).to permit contributor, public_deck
      expect(subject).to permit contributor, protected_deck
      expect(subject).not_to permit contributor, private_deck
      expect(subject).to permit contributor, contributed_deck
    end

    it 'allows owners read access' do
      owner = build :user

      public_deck = build :deck, :state => :public_access, :owner => owner
      protected_deck = build :deck, :state => :protected_access, :owner => owner
      private_deck = build :deck, :state => :private_access, :owner => owner

      expect(subject).to permit owner, public_deck
      expect(subject).to permit owner, protected_deck
      expect(subject).to permit owner, private_deck
    end
  end
end
