# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Deck, :type => :model do
  it 'is invalid without attributes' do
    expect(Deck.new).not_to be_valid
  end

  it 'is valid with attributes' do
    deck = build :deck, :with_owner
    expect(deck).to be_valid
  end

  it 'is invalid without name' do
    user = build :user
    expect(Deck.new(:repository => 'bar', :state => :public_access, :owner => user)).not_to be_valid
  end

  it 'is invalid without state' do
    user = build :user
    expect(Deck.new(:name => 'foo', :repository => 'bar', :owner => user)).not_to be_valid
  end

  it 'belongs to a user' do
    deck = build :deck, :with_owner
    expect(deck.owner).to be_instance_of User
  end

  it 'has a valid :status enum' do
    deck = build :deck, :with_owner
    expect(%w(public_access protected_access private_access)).to include deck.state
  end

  it 'has many tags' do
    deck = build :deck, :with_tags

    # Use #length instead of #count for unpersisted relations
    expect(deck.tags.length).not_to be 0
    deck.tags.each { |t| expect(t).to be_instance_of Tag }
  end
end
