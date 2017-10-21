# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Secrets API', :type => :request do
  let(:user) { create :user, :confirmed }
  let(:conversation) { create :conversation, :user => user }

  let(:params) do
    {
      :data => {
        :type => 'secrets'
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

      context 'is secret' do
        before { annotation.protect }

        it 'rejects already secret' do
          post conversation_secret_path(:conversation_id => annotation.id), :params => params, :headers => headers

          expect(response.status).to eq 422
          expect(jsonapi_error_code(response)).to eq JSONAPI::VALIDATION_ERROR
          expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
        end
      end

      context 'is public' do
        it 'protects' do
          post conversation_secret_path(:conversation_id => annotation.id), :params => params, :headers => headers

          expect(response.status).to eq 200
          expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

          attrs = JSON.parse(response.body)['data']['attributes']

          expect(attrs['secret']).to be true

          annotation.reload
          expect(annotation).to be_secret
        end
      end
    end

    describe 'DELETE /' do
      before do
        add_content_type_header
        add_auth_header
      end

      context 'is public' do
        it 'rejects already public' do
          delete conversation_secret_path(:conversation_id => annotation.id), :params => params, :headers => headers

          expect(response.status).to eq 422
          expect(jsonapi_error_code(response)).to eq JSONAPI::VALIDATION_ERROR
          expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
        end
      end

      context 'is secret' do
        before { annotation.protect }

        it 'publishes' do
          delete conversation_secret_path(:conversation_id => annotation.id), :params => params, :headers => headers

          expect(response.status).to eq 200
          expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

          attrs = JSON.parse(response.body)['data']['attributes']

          expect(attrs['secret']).to be false

          annotation.reload
          expect(annotation).not_to be_secret
        end
      end
    end
  end
end
