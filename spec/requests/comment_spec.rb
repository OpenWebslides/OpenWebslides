# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Comments API', :type => :request do
  let(:user) { create :user, :confirmed }
  let(:conversation) { create :conversation, :user => user }
  let(:comment) { create :comment, :conversation => conversation, :deck => conversation.deck, :content_item_id => conversation.content_item_id, :user => user }

  let(:text) { Faker::Lorem.sentences(4).join(' ') }

  let(:attributes) do
    {
      :text => text,
      :contentItemId => conversation.content_item_id
    }
  end

  def request_body(attributes)
    {
      :data => {
        :type => 'comments',
        :attributes => attributes,
        :relationships => {
          :conversation => { :data => { :type => 'conversations', :id => conversation.id } },
          :deck => { :data => { :type => 'decks', :id => conversation.deck.id } },
          :user => { :data => { :type => 'users', :id => user.id } }
        }
      }
    }.to_json
  end

  def update_body(id, attributes)
    {
      :data => {
        :type => 'comments',
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

    it 'rejects no text' do
      post comments_path, :params => request_body(attributes.merge :text => nil), :headers => headers

      expect(response.status).to eq 422
      expect(jsonapi_error_code(response)).to eq JSONAPI::VALIDATION_ERROR
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'rejects no content_item_id' do
      post comments_path, :params => request_body(attributes.merge :contentItemId => nil), :headers => headers

      expect(response.status).to eq 422
      expect(jsonapi_error_code(response)).to eq [JSONAPI::VALIDATION_ERROR, JSONAPI::VALIDATION_ERROR]
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    context 'flagged conversation' do
      before { conversation.flag }

      it 'rejects create' do
        post comments_path, :params => request_body(attributes), :headers => headers

        expect(response.status).to eq 422
        expect(jsonapi_error_code(response)).to eq JSONAPI::VALIDATION_ERROR
        expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
      end
    end

    context 'hidden conversation' do
      before { conversation.hide }

      it 'rejects create' do
        post comments_path, :params => request_body(attributes), :headers => headers

        expect(response.status).to eq 422
        expect(jsonapi_error_code(response)).to eq JSONAPI::VALIDATION_ERROR
        expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
      end
    end

    it 'creates a comment' do
      post comments_path, :params => request_body(attributes), :headers => headers

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

    context 'flagged conversation' do
      before { comment.conversation.flag }

      it 'rejects update' do
        patch comment_path(:id => comment.id), :params => update_body(comment.id, :text => 'foo'), :headers => headers

        expect(response.status).to eq 422
        expect(jsonapi_error_code(response)).to eq JSONAPI::VALIDATION_ERROR
        expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
      end
    end

    context 'hidden conversation' do
      before { comment.conversation.hide }

      it 'rejects hidden conversation' do
        patch comment_path(:id => comment.id), :params => update_body(comment.id, :text => 'foo'), :headers => headers

        expect(response.status).to eq 422
        expect(jsonapi_error_code(response)).to eq JSONAPI::VALIDATION_ERROR
        expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
      end
    end

    it 'updates text' do
      patch comment_path(:id => comment.id), :params => update_body(comment.id, :text => 'foo'), :headers => headers

      expect(response.status).to eq 200
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

      attr = JSON.parse(response.body)['data']['attributes']

      expect(attr['text']).to eq 'foo'
    end

    it 'protects public annotation' do
      expect(comment).not_to be_secret

      patch comment_path(:id => comment.id), :params => update_body(comment.id, :secret => true), :headers => headers

      expect(response.status).to eq 200
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

      attr = JSON.parse(response.body)['data']['attributes']

      expect(attr['secret']).to eq true
    end

    it 'unprotects protected annotation' do
      comment.protect
      expect(comment).to be_secret

      patch comment_path(:id => comment.id), :params => update_body(comment.id, :secret => false), :headers => headers

      expect(response.status).to eq 200
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

      attr = JSON.parse(response.body)['data']['attributes']

      expect(attr['secret']).to eq false
    end

    it 'does not protect protected annotation' do
      comment.protect
      expect(comment).to be_secret

      patch comment_path(:id => comment.id), :params => update_body(comment.id, :secret => true), :headers => headers

      expect(response.status).to eq 422
    end

    it 'does not unprotect unprotected annotation' do
      expect(comment).not_to be_secret

      patch comment_path(:id => comment.id), :params => update_body(comment.id, :secret => false), :headers => headers

      expect(response.status).to eq 422
    end
  end

  describe 'GET /:id' do
    before do
      add_accept_header
    end

    it 'rejects an invalid id' do
      get comment_path(:id => 0), :headers => headers

      expect(response.status).to eq 404
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'returns successful' do
      get comment_path(:id => comment.id), :headers => headers

      expect(response.status).to eq 200
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

      json = JSON.parse response.body

      expect(json['data']['meta']['createdAt'].to_i).to eq comment.created_at.to_i
    end
  end

  describe 'DELETE /:id' do
    before do
      add_auth_header
      add_accept_header
    end

    it 'rejects an invalid id' do
      delete comment_path(:id => '0'), :headers => headers

      comment.reload
      expect(comment).not_to be_destroyed

      expect(response.status).to eq 404
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    context 'flagged parent conversation' do
      before { comment.conversation.flag }

      it 'returns successful' do
        delete comment_path(:id => comment.id), :headers => headers

        comment.reload
        expect(comment).not_to be_destroyed
        expect(comment).not_to be_hidden

        expect(response.status).to eq 204
      end
    end
  end
end
