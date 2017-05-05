# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Notification, :type => :model do
  it 'is invalid without attributes' do
    expect(Notification.new).not_to be_valid
  end

  it 'is valid with attributes' do
    notification = build :notification
    expect(notification).to be_valid
  end

  it 'is invalid without deck' do
    notification = build :notification
    notification.deck = nil
    expect(notification).not_to be_valid
  end

  it 'is invalid without user' do
    notification = build :notification
    notification.user = nil
    expect(notification).not_to be_valid
  end

  it 'has a valid :event_type enum' do
    expect(%w[deck_created deck_updated]).to eq Notification.event_types.keys
  end
end
