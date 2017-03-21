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

  it 'is invalid without state' do
    user = build :user
    expect(Deck.new :name => 'foo', :owner => user).not_to be_valid
  end

  it 'belongs to a user' do
    deck = build :deck
    expect(deck.owner).to be_instance_of User
  end

  it 'has a valid :status enum' do
    deck = build :deck
    expect(%w(public_access protected_access private_access)).to include deck.state
  end

  it 'has a canonical name' do
    deck = create :deck
    expect(deck.canonical_name).not_to be_nil
  end

  it 'has many tags' do
    deck = build :deck, :with_tags

    # Use #length instead of #count for unpersisted relations
    expect(deck.tags.length).not_to be 0
    deck.tags.each { |t| expect(t).to be_instance_of Tag }
  end
end
