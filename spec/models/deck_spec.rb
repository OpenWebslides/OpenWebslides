# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Deck, :type => :model do
  let(:deck) { build :deck }
  let(:user) { build :user }

  describe 'attributes' do
    it 'is invalid without attributes' do
      expect(subject).not_to be_valid
    end

    it 'is valid with attributes' do
      expect(deck).to be_valid
    end

    it 'is invalid without name' do
      expect(Deck.new :state => :public_access, :owner => user).not_to be_valid
    end

    it 'is valid without state' do
      expect(Deck.new :name => 'foo', :owner => user).to be_valid
    end

    it 'is invalid without template' do
      deck.template = nil

      expect(deck).not_to be_valid
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

      deck.destroy
      deck2.destroy
    end
  end

  describe 'associations' do
    it 'belongs to a user' do
      expect(deck.owner).to be_instance_of User
    end

    it 'generates a notification on create' do
      count = Notification.count

      d = create :deck

      expect(Notification.count).to eq (count + 1)
      expect(Notification.last.event_type).to eq 'deck_created'
      expect(Notification.last.deck).to eq d
    end

    it 'generates a notification on update' do
      d = create :deck

      count = Notification.count

      d.update :name => Faker::Lorem.words(4).join(' ')

      expect(Notification.count).to eq (count + 1)
      expect(Notification.last.event_type).to eq 'deck_updated'
      expect(Notification.last.deck).to eq d
    end
  end
end
