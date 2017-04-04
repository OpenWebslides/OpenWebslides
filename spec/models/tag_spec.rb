# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tag, :type => :model do
  it 'is valid with attributes' do
    expect(Tag.new(:name => 'foo')).to be_valid
  end

  it 'is invalid without name' do
    expect(Tag.new).not_to be_valid
  end

  it 'has many decks' do
    tag = build :tag, :with_decks

    # Use #length instead of #count for unpersisted relations
    expect(tag.decks.length).not_to be 0
    tag.decks.each { |d| expect(d).to be_instance_of Deck }
  end
end
