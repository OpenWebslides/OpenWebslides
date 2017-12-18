# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Conversations API', :type => :request do
  let(:user) { create :user, :confirmed }
  let(:deck) { create :deck }

  let(:conversation) { create :conversation, :user => user }

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

      attr = JSON.parse(response.body)['data']['attributes']

      expect(attr['text']).to match attributes[:text]
      expect(attr['secret']).to eq false
    end
  end

  describe 'PATCH /:id' do
    before do
      add_auth_header
      add_content_type_header
    end

    it 'updates text' do
      patch conversation_path(:id => conversation.id), :params => update_body(conversation.id, :text => 'foo'), :headers => headers

      expect(response.status).to eq 200
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

      attr = JSON.parse(response.body)['data']['attributes']

      expect(attr['text']).to eq 'foo'
    end

    it 'updates title' do
      patch conversation_path(:id => conversation.id), :params => update_body(conversation.id, :title => 'foo'), :headers => headers

      expect(response.status).to eq 200
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

      attr = JSON.parse(response.body)['data']['attributes']

      expect(attr['title']).to eq 'foo'
    end

    it 'protects public annotation' do
      expect(conversation).not_to be_secret

      patch conversation_path(:id => conversation.id), :params => update_body(conversation.id, :secret => true), :headers => headers

      expect(response.status).to eq 200
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

      attr = JSON.parse(response.body)['data']['attributes']

      expect(attr['secret']).to eq true
    end

    it 'unprotects protected annotation' do
      conversation.protect
      expect(conversation).to be_secret

      patch conversation_path(:id => conversation.id), :params => update_body(conversation.id, :secret => false), :headers => headers

      expect(response.status).to eq 200
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

      attr = JSON.parse(response.body)['data']['attributes']

      expect(attr['secret']).to eq false
    end

    it 'does not protect protected annotation' do
      conversation.protect
      expect(conversation).to be_secret

      patch conversation_path(:id => conversation.id), :params => update_body(conversation.id, :secret => true), :headers => headers

      expect(response.status).to eq 422
    end

    it 'does not unprotect unprotected annotation' do
      expect(conversation).not_to be_secret

      patch conversation_path(:id => conversation.id), :params => update_body(conversation.id, :secret => false), :headers => headers

      expect(response.status).to eq 422
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

      json = JSON.parse response.body

      expect(json['data']['meta']['createdAt'].to_i).to eq conversation.created_at.to_i
      expect(json['data']['meta']['commentCount']).to eq conversation.comments.count
    end
  end

  describe 'DELETE /:id' do
    before do
      add_auth_header
      add_accept_header
    end

    it 'rejects an invalid id' do
      delete conversation_path(:id => '0'), :headers => headers

      conversation.reload
      expect(conversation).not_to be_destroyed

      expect(response.status).to eq 404
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'returns successful' do
      delete conversation_path(:id => conversation.id), :headers => headers

      conversation.reload
      expect(conversation).not_to be_destroyed
      expect(conversation).to be_hidden

      expect(response.status).to eq 204
    end
  end
end
