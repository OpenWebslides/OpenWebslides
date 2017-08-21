# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Conversations API', :type => :request do
  let(:user) { create :user, :confirmed }
  let(:deck) { create :deck }

  let(:conversation) { create :conversation }

  let(:title) { Faker::Lorem.words(4).join(' ') }
  let(:text) { Faker::Lorem.sentences(4).join(' ') }
  let(:conversation_type) { %i[question note].sample }
  let(:content_item_id) { Faker::Number.number 2 }

  let(:attributes) do
    {
      :title => title,
      :text => text,
      :conversationType => conversation_type,
      :contentItemId => content_item_id
    }
  end

  def request_body(attributes)
    {
      :data => {
        :type => 'conversations',
        :attributes => attributes,
        :relationships => {
          :deck => { :data => { :type => 'decks', :id => deck.id } },
          :user => { :data => { :type => 'users', :id => user.id } }
        }
      }
    }.to_json
  end

  def update_body(id, attributes)
    {
      :data => {
        :type => 'conversations',
        :id => id,
        :attributes => attributes
      }
    }.to_json
  end

  describe 'POST /' do
    before do
      add_content_type_header
      add_auth_header
    end

    it 'rejects no type' do
      post conversations_path, :params => request_body(attributes.merge :conversationType => nil), :headers => headers

      expect(response.status).to eq 422
      expect(jsonapi_error_code(response)).to eq JSONAPI::VALIDATION_ERROR
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'rejects no title' do
      post conversations_path, :params => request_body(attributes.merge :title => nil), :headers => headers

      expect(response.status).to eq 422
      expect(jsonapi_error_code(response)).to eq JSONAPI::VALIDATION_ERROR
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'rejects no text' do
      post conversations_path, :params => request_body(attributes.merge :text => nil), :headers => headers

      expect(response.status).to eq 422
      expect(jsonapi_error_code(response)).to eq JSONAPI::VALIDATION_ERROR
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'rejects no content_item_id' do
      post conversations_path, :params => request_body(attributes.merge :contentItemId => nil), :headers => headers

      expect(response.status).to eq 422
      expect(jsonapi_error_code(response)).to eq JSONAPI::VALIDATION_ERROR
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'creates a conversation' do
      post conversations_path, :params => request_body(attributes), :headers => headers

      expect(response.status).to eq 201
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

      json = JSON.parse response.body

      expect(json['data']['attributes']['text']).to match attributes[:text]
    end
  end

  describe 'GET /:id' do
    before do
      add_accept_header
    end

    it 'rejects an invalid id' do
      get conversation_path(:id => 0), :headers => headers

      expect(response.status).to eq 404
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'returns successful' do
      get conversation_path(:id => conversation.id), :headers => headers

      expect(response.status).to eq 200
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end
  end
end
