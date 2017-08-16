# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Notification API', :type => :request do
  let(:notification) { create :notification }

  describe 'get all notifications' do
    it 'returns a list of all notifications' do
      create :notification
      get_unauthenticated api_notifications_path

      expect(response.status).to eq 200

      json = JSON.parse response.body
      expect(json).to include 'data'
      expect(json['data']).to be_an Array
      expect(json['data']).not_to be_empty

      notification = json['data'].first
      expect(notification).to include 'attributes'
      expect(notification['attributes']).to include 'eventType'
      expect(notification['attributes']).to include 'createdAt'
      expect(notification['attributes']).to include 'userName'
      expect(notification['attributes']).to include 'deckName'
    end
  end

  describe 'get a notification' do
    it 'rejects non-existant notifications' do
      get_unauthenticated api_notification_path :id => 999

      expect(response.status).to eq 404
    end

    it 'returns a notification' do
      get_unauthenticated api_notification_path :id => notification.id

      expect(response.status).to eq 200

      json = JSON.parse response.body
      expect(json).to include 'data'

      notification = json['data']
      expect(notification).to include 'attributes'
      expect(notification['attributes']).to include 'eventType'
      expect(notification['attributes']).to include 'createdAt'
      expect(notification['attributes']).to include 'userName'
      expect(notification['attributes']).to include 'deckName'
    end
  end
end