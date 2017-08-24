# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Ratings API', :type => :request do
  let(:user) { create :user, :confirmed }
  let(:deck) { create :deck, :owner => user }
  let(:conversation) { create :conversation, :deck => deck }

  let(:rating) { create :rating, :annotation => annotation, :user => user }

  let(:params) do
    {
      :data => {
        :type => 'ratings'
      }
    }.to_json
  end

  context 'conversations' do
    let(:annotation) { conversation }

    describe 'POST /' do
      before do
        add_content_type_header
        add_auth_header
      end

      context 'duplicate rating' do
        before { create :rating, :user => user, :annotation => annotation }

        it 'rejects duplicate ratings' do
          post conversation_rating_path(:conversation_id => annotation.id), :params => params, :headers => headers

          expect(response.status).to eq 422
          expect(jsonapi_error_code(response)).to eq JSONAPI::VALIDATION_ERROR
          expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
        end
      end

      it 'creates a rating' do
        post conversation_rating_path(:conversation_id => annotation.id), :params => params, :headers => headers

        expect(response.status).to eq 200
        expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

        attrs = JSON.parse(response.body)['data']['attributes']

        expect(attrs['rated']).to be true
      end
    end

    describe 'DELETE /' do
      before do
        add_auth_header

        @rating = create :rating, :annotation => annotation, :user => user
      end

      context 'not yet rated' do
        before { @rating.destroy }

        it 'rejects not yet rated' do
          delete conversation_rating_path(:conversation_id => annotation.id), :headers => headers

          expect(response.status).to eq 404
          expect(jsonapi_error_code(response)).to eq JSONAPI::RECORD_NOT_FOUND
          expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
        end
      end

      it 'deletes a rating' do
        delete conversation_rating_path(:conversation_id => annotation.id), :headers => headers

        expect(-> { @rating.reload }).to raise_error ActiveRecord::RecordNotFound

        expect(response.status).to eq 200

        attrs = JSON.parse(response.body)['data']['attributes']

        expect(attrs['rated']).to be false
      end
    end
  end

  context 'comments' do
    let(:annotation) { create :comment, :conversation => conversation, :deck => conversation.deck, :content_item_id => conversation.content_item_id }

    describe 'POST /' do
      before do
        add_content_type_header
        add_auth_header
      end

      context 'duplicate rating' do
        before { create :rating, :user => user, :annotation => annotation }

        it 'rejects duplicate ratings' do
          post comment_rating_path(:comment_id => annotation.id), :params => params, :headers => headers

          expect(response.status).to eq 422
          expect(jsonapi_error_code(response)).to eq JSONAPI::VALIDATION_ERROR
          expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
        end
      end

      it 'creates a rating' do
        post comment_rating_path(:comment_id => annotation.id), :params => params, :headers => headers

        expect(response.status).to eq 200
        expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

        attrs = JSON.parse(response.body)['data']['attributes']

        expect(attrs['rated']).to be true
      end
    end

    describe 'DELETE /' do
      before do
        add_auth_header

        @rating = create :rating, :annotation => annotation, :user => user
      end

      context 'not yet rated' do
        before { @rating.destroy }

        it 'rejects not yet rated' do
          delete comment_rating_path(:comment_id => annotation.id), :headers => headers

          expect(response.status).to eq 404
          expect(jsonapi_error_code(response)).to eq JSONAPI::RECORD_NOT_FOUND
          expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
        end
      end

      it 'deletes a rating' do
        delete comment_rating_path(:comment_id => annotation.id), :headers => headers

        expect(-> { @rating.reload }).to raise_error ActiveRecord::RecordNotFound

        expect(response.status).to eq 200

        attrs = JSON.parse(response.body)['data']['attributes']

        expect(attrs['rated']).to be false
      end
    end
  end
end
