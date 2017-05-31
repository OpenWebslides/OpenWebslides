# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ApplicationPolicy::Scope do
  let(:user) { create :user }

  context 'all decks' do
    subject { described_class.new(user, Deck).resolve }

    it 'should return all decks' do
      expect(subject).to eq Deck.all
    end
  end

  context 'all users' do
    subject { described_class.new(user, User).resolve }

    it 'should return all users' do
      expect(subject).to eq User.all
    end
  end
end
