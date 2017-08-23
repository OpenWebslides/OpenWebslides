# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Ratings API', :type => :request do
  let(:user) { create :user, :confirmed }
  let(:deck) { create :deck, :owner => user }
  let(:annotation) { create :conversation, :deck => deck }

  let(:rating) { create :rating, :annotation => annotation, :user => user }

  let(:params) do
    {
      :data => {
        :type => 'ratings'
      }
    }.to_json
  end

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

      expect(response.status).to eq 201
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end
  end

  describe 'DELETE /' do
    before do
      add_auth_header

      @rating = create :rating, :annotation => annotation, :user => user
    end

    it 'deletes a rating' do
      delete conversation_rating_path(:conversation_id => annotation.id), :headers => headers

      expect(-> { @rating.reload }).to raise_error ActiveRecord::RecordNotFound

      expect(response.status).to eq 204
    end
  end
end
