# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Deck, :type => :model do
  it 'is invalid without attributes' do
    expect(Deck.new).not_to be_valid
  end

  it 'is valid with attributes' do
    deck = build :deck
    expect(deck).to be_valid
  end

  it 'is invalid without name' do
    user = build :user
    expect(Deck.new :state => :public_access, :owner => user).not_to be_valid
  end

  it 'is valid without state' do
    user = build :user
    expect(Deck.new :name => 'foo', :owner => user).to be_valid
  end

  it 'belongs to a user' do
    deck = build :deck
    expect(deck.owner).to be_instance_of User
  end

  it 'has a valid :status enum' do
    deck = build :deck
    expect(%w[public_access protected_access private_access]).to include deck.state
  end

  it 'has a canonical name' do
    deck = build :deck
    deck.generate_canonical_name
    expect(deck.canonical_name).not_to be_nil
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
