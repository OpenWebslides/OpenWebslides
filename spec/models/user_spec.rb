# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, :type => :model do
  it 'is invalid without attributes' do
    expect(User.new).not_to be_valid
  end

  it 'is valid with valid attributes' do
    expect(build :user).to be_valid
  end

  it 'is invalid without name' do
    expect(build :user, :name => nil).not_to be_valid
    expect(build :user, :name => '').not_to be_valid
  end

  it 'is invalid without email' do
    expect(build :user, :email => nil).not_to be_valid
    expect(build :user, :email => '').not_to be_valid
  end

  it 'rejects invalid email' do
    expect(build :user, :email => 'foo').not_to be_valid
    expect(build :user, :email => 'foo@bar@baz').not_to be_valid
    expect(build :user, :email => 'foo@').not_to be_valid
    expect(build :user, :email => '@bar').not_to be_valid
  end

  it 'has many decks' do
    user = build :user, :with_decks

    # Use #length instead of #count for unpersisted relations
    expect(user.decks.length).not_to be 0
    user.decks.each { |d| expect(d).to be_instance_of Deck }
  end

  it 'has many identities' do
    user = build :user, :with_identities

    # Use #length instead of #count for unpersisted relations
    expect(user.identities.length).not_to be 0
    user.identities.each { |i| expect(i).to be_instance_of Identity }
  end
end
