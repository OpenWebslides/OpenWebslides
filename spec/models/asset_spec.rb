# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Asset, :type => :model do
  let(:asset) { create :asset, :with_deck }
  let(:deck) { create :deck }

  describe 'attributes' do
    it 'is invalid without attributes' do
      expect(subject).not_to be_valid
    end

    it 'is valid with attributes' do
      expect(asset).to be_valid
    end

    it 'is invalid without filename' do
      expect(Asset.new :deck => deck).not_to be_valid
    end

    it 'is valid without deck' do
      expect(Asset.new :filename => 'foo').to be_valid
    end

    it 'is unique over decks' do
      proc = -> { Asset.create! :filename => asset.filename, :deck => asset.deck }
      expect(proc).to raise_error ActiveRecord::RecordInvalid
    end
  end

  describe 'associations' do
    it 'belongs to a deck' do
      expect(asset.deck).to be_instance_of Deck
    end
  end
end
