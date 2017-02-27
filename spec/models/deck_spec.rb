# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Deck, :type => :model do
  it 'is invalid without attributes' do
    expect(Deck.new).not_to be_valid
  end

  it 'is valid with attributes' do
    user = build :user
    expect(Deck.new(:name => 'foo', :upstream => 'bar', :state => :public_access, :owner => user)).to be_valid
  end

  it 'is invalid without name' do
    user = build :user
    expect(Deck.new(:upstream => 'bar', :state => :public_access, :owner => user)).not_to be_valid
  end

  it 'is invalid without upstream' do
    user = build :user
    expect(Deck.new(:name => 'foo', :state => :public_access, :owner => user)).not_to be_valid
  end

  it 'is invalid without state' do
    user = build :user
    expect(Deck.new(:name => 'foo', :upstream => 'bar', :owner => user)).not_to be_valid
  end

  it 'belongs to a user' do
    deck = build :deck, :with_owner
    expect(deck.owner).to be_instance_of User
  end

  it 'has a valid :status enum' do
    deck = build :deck, :with_owner
    expect(['public_access', 'protected_access', 'private_access']).to include deck.state
  end
end
