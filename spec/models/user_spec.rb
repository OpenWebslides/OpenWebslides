# frozen_string_literal: true
require 'rails_helper'

RSpec.describe User, :type => :model do
  it 'is invalid without attributes' do
    expect(User.new).not_to be_valid
  end

  it 'is valid with valid attributes' do
    expect(User.new(:name => 'foo', :email => 'foo@bar')).to be_valid
  end

  it 'is invalid without name' do
    expect(User.new(:email => 'foo@bar')).not_to be_valid
    expect(User.new(:name => '', :email => 'foo@bar')).not_to be_valid
  end

  it 'is invalid without email' do
    expect(User.new(:name => 'foo')).not_to be_valid
    expect(User.new(:name => 'foo', :email => '')).not_to be_valid
  end

  it 'is invalid without correct email' do
    expect(User.new(:email => 'foo')).not_to be_valid
  end

  it 'has many decks' do
    user = build :user, :with_decks
    expect(user.decks.first).to be_instance_of Deck
  end
end
