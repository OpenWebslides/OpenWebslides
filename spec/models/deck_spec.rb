# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Deck, :type => :model do
  let(:deck) { build :deck, :with_assets }
  let(:user) { build :user }

  describe 'attributes' do
    it { is_expected.not_to allow_value(nil).for(:name) }
    it { is_expected.not_to allow_value('').for(:name) }

    it { is_expected.not_to allow_value(nil).for(:state) }
    it { is_expected.not_to allow_value('').for(:state) }

    it { is_expected.not_to allow_value(nil).for(:template) }
    it { is_expected.not_to allow_value('').for(:template) }

    it 'is invalid without attributes' do
      expect(subject).not_to be_valid
    end

    it 'is valid with attributes' do
      expect(deck).to be_valid
    end

    it 'has a valid :status enum' do
      expect(%w[public_access protected_access private_access]).to include deck.state
    end

    it 'has a canonical name' do
      deck.send :generate_canonical_name
      expect(deck.canonical_name).not_to be_nil
    end

    it 'has a default template' do
      expect(deck.template).not_to be_nil
      expect(deck.template).not_to be_empty
    end

    it 'has an overridable template' do
      new_template = Faker::Lorem.words(2).join ' '

      deck = build :deck, :template => new_template

      expect(deck.template).to eq new_template
    end

    let(:owner) { build :user, :email => 'foo@bar' }
    it 'has a unique canonical name' do
      deck = create :deck, :name => 'Foo Bar', :owner => owner
      expect(deck.canonical_name).to eq 'foo-bar-foo-bar'

      deck2 = create :deck, :name => 'Foo Bar', :owner => owner
      expect(deck2.canonical_name).to eq 'foo-bar-foo-bar-2'
    end
  end

  describe 'associations' do
    it { is_expected.to belong_to(:owner).inverse_of(:decks) }
    it { is_expected.to have_many(:grants).dependent(:destroy) }
    it { is_expected.to have_many(:collaborators).through(:grants).inverse_of(:collaborations) }
    it { is_expected.to have_many(:assets).dependent(:destroy).inverse_of(:deck) }
    it { is_expected.to have_many(:notifications).dependent(:destroy).inverse_of(:deck) }
    it { is_expected.to have_one(:conversion).dependent(:destroy).inverse_of(:deck) }
    it { is_expected.to have_many(:annotations).dependent(:destroy).inverse_of(:deck) }
    it { is_expected.to have_many(:conversations).inverse_of(:deck) }

    it 'generates a notification on create' do
      count = Notification.count

      d = build :deck
      DeckService.new(d).create

      expect(Notification.count).to eq count + 1
      expect(Notification.last.predicate).to eq 'deck_created'
      expect(Notification.last.deck).to eq d
    end

    it 'generates a notification on update' do
      d = create :deck

      count = Notification.count

      DeckService.new(d).update :author => user, :content => 'foo'

      expect(Notification.count).to eq count + 1
      expect(Notification.last.predicate).to eq 'deck_updated'
      expect(Notification.last.deck).to eq d
    end
  end

  describe 'methods' do
    it { is_expected.to respond_to :display_name }
  end
end
