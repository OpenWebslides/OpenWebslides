# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Assets API', :type => :request do
  let(:deck) { create :deck }
  let(:user) { deck.owner }

  let(:asset_file) { Rails.root.join 'spec', 'support', 'asset.png' }

  describe 'POST /' do
    before do
      add_auth_header
      @headers['Content-Type'] = 'image/png'
      @headers['Content-Disposition'] = 'attachment; filename="asset.png"'

      @body = fixture_file_upload asset_file
    end

    it 'rejects without Content-Disposition' do
      post deck_assets_path(:deck_id => deck.id), :params => @body, :headers => headers.except('Content-Disposition')

      expect(response.status).to eq 400
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'rejects media types not allowed' do
      post deck_assets_path(:deck_id => deck.id), :params => @body, :headers => headers.merge('Content-Type' => 'application/octet-stream')

      expect(response.status).to eq 415
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'returns successful' do
      post deck_assets_path(:deck_id => deck.id), :params => @body, :headers => headers

      expect(response.status).to eq 201
      # Don't check for Content-Type: https://github.com/rails/rails/issues/3436
    end

    it 'rejects filename already taken' do
      post deck_assets_path(:deck_id => deck.id), :params => @body, :headers => headers.merge('Content-Disposition' => 'attachment; filename="exists.png"')

      expect(response.status).to eq 422
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
      expect(jsonapi_error_code(response)).to eq 422
    end
  end

  describe 'GET /:id' do
    before do
      add_auth_header
      add_accept_header
    end

    it 'rejects missing file' do
      get deck_asset_path(:deck_id => deck.id, :id => 'missing.png'), :headers => headers

      expect(response.status).to eq 404
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'returns successful' do
      get deck_asset_path(:deck_id => deck.id, :id => 'asset.png'), :headers => headers

      expect(response.status).to eq 200
      expect(response.content_type).to eq 'image/png'
    end
  end

  describe 'DELETE /:id' do
    before do
      add_auth_header
    end

    it 'rejects non-existant assets' do
      delete deck_asset_path(:deck_id => deck.id, :id => 'missing.png'), :headers => headers

      expect(response.status).to eq 404
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'deletes an asset' do
      delete deck_asset_path(:deck_id => deck.id, :id => 'exists.png'), :headers => headers

      expect(response.status).to eq 204
    end
  end
end
