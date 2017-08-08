# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Notification, :type => :model do
  describe 'attributes' do
    it { is_expected.not_to allow_value(nil).for(:event_type) }
    it { is_expected.not_to allow_value('').for(:event_type) }

    it 'is invalid without attributes' do
      expect(Notification.new).not_to be_valid
    end

    it 'is valid with attributes' do
      notification = build :notification
      expect(notification).to be_valid
    end

    it 'has a valid :event_type enum' do
      expect(%w[deck_created deck_updated]).to eq Notification.event_types.keys
    end
  end

  describe 'associations' do
    it { is_expected.to belong_to(:user).inverse_of(:notifications) }
    it { is_expected.to belong_to(:deck).inverse_of(:notifications) }
  end
end
