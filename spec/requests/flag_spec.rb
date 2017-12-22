# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Flags API', :type => :request do
  let(:user) { create :user, :confirmed }
  let(:deck) { create :deck, :user => user }
  let(:conversation) { create :conversation, :deck => deck }

  let(:params) do
    {
      :data => {
        :type => 'flags'
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

      context 'already flagged' do
        before { annotation.flag }

        it 'rejects already flagged' do
          post conversation_flag_path(:conversation_id => annotation.id), :params => params, :headers => headers

          expect(response.status).to eq 422
          expect(jsonapi_error_code(response)).to eq JSONAPI::VALIDATION_ERROR
          expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
        end
      end

      it 'flags' do
        post conversation_flag_path(:conversation_id => annotation.id), :params => params, :headers => headers

        expect(response.status).to eq 200
        expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

        attrs = JSON.parse(response.body)['data']['attributes']

        expect(attrs['flagged']).to be true

        annotation.reload
        expect(annotation).to be_flagged
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

      context 'already flagged' do
        before { annotation.flag }

        it 'rejects already flagged' do
          post comment_flag_path(:comment_id => annotation.id), :params => params, :headers => headers

          expect(response.status).to eq 422
          expect(jsonapi_error_code(response)).to eq JSONAPI::VALIDATION_ERROR
          expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
        end
      end

      it 'flags' do
        post comment_flag_path(:comment_id => annotation.id), :params => params, :headers => headers

        expect(response.status).to eq 200
        expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

        attrs = JSON.parse(response.body)['data']['attributes']

        expect(attrs['flagged']).to be true

        annotation.reload
        expect(annotation).to be_flagged
      end
    end
  end
end
