# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Notification, :type => :model do
  describe 'attributes' do
    it { is_expected.not_to allow_value(nil).for(:predicate) }
    it { is_expected.not_to allow_value('').for(:predicate) }

    it 'is invalid without attributes' do
      expect(Notification.new).not_to be_valid
    end

    it 'is valid with attributes' do
      notification = build :notification
      expect(notification).to be_valid
    end

    it 'has a valid :predicate enum' do
      expect(%w[deck_created deck_updated conversation_created comment_created]).to eq Notification.predicates.keys
    end
  end

  describe 'associations' do
    it { is_expected.to belong_to(:subject).inverse_of(:notifications) }
    it { is_expected.to belong_to(:item).inverse_of(:notifications) }
  end
end
