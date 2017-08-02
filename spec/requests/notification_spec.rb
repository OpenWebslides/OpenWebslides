# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Notification API', :type => :request do
  let(:notification) { create :notification }

  describe 'GET /' do
    before do
      add_accept_header
    end

    it 'returns a list of all notifications' do
      create :notification
      get notifications_path, :headers => headers

      expect(response.status).to eq 200
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

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

  describe 'GET /:id' do
    before do
      add_accept_header
    end

    it 'rejects non-existant notifications' do
      get notification_path(:id => 999), :headers => headers

      expect(response.status).to eq 404
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'returns a notification' do
      get notification_path(:id => notification.id), :headers => headers

      expect(response.status).to eq 200
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

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
