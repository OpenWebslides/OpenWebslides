# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Assets API', :type => :request do
  let(:asset) { create :asset, :with_deck }
  let(:deck) { asset.deck }
  let(:user) { deck.owner }

  let(:asset_file) { Rails.root.join 'spec', 'support', 'asset.png' }

  describe 'POST /' do
    before do
      add_auth_header
      @headers['Content-Type'] = 'multipart/form-data'

      @body = {
        :qqfilename => 'asset.png',
        :qqfile => fixture_file_upload(asset_file)
      }

      # Stub out Repository::Asset::UpdateFile
      Repository::Asset::UpdateFile.send :define_method,
                                         :execute,
                                         -> { true }
    end

    it 'rejects without qqfilename' do
      post api_deck_assets_path(:deck_id => deck.id), :params => @body.except(:qqfilename), :headers => headers

      expect(response.status).to eq 400
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'rejects without qqfile' do
      post api_deck_assets_path(:deck_id => deck.id), :params => @body.except(:qqfile), :headers => headers

      expect(response.status).to eq 400
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'rejects filename already taken' do
      post api_deck_assets_path(:deck_id => deck.id), :params => @body.merge(:qqfilename => asset.filename), :headers => headers

      expect(response.status).to eq 422
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
      expect(jsonapi_error_code(response)).to eq JSONAPI::VALIDATION_ERROR
    end

    it 'returns successful' do
      post api_deck_assets_path(:deck_id => deck.id), :params => @body, :headers => headers

      expect(response.status).to eq 201
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

      attributes = (JSON.parse response.body)['data']['attributes']
      expect(attributes['filename']).to eq 'asset.png'
    end
  end

  describe 'GET /:id' do
    before do
      add_auth_header
      @headers['Accept'] = '*/*'

      # Stub out Repository::Asset::AssetCommand#asset_file
      Repository::Asset::AssetCommand.send :define_method,
                                           :asset_file,
                                           -> { Rails.root.join 'spec', 'support', 'asset.png' }
    end

    it 'rejects an invalid id' do
      get api_deck_asset_path(:deck_id => deck.id, :id => 0), :headers => headers

      expect(response.status).to eq 404
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'returns successful' do
      get api_deck_asset_path(:deck_id => deck.id, :id => asset.id), :headers => headers

      expect(response.status).to eq 200
      expect(response.content_type).to eq 'image/png'
    end
  end

  describe 'DELETE /:id' do
    before do
      add_auth_header
    end

    it 'rejects non-existant assets' do
      delete api_deck_asset_path(:deck_id => deck.id, :id => '0'), :headers => headers

      asset.reload
      expect(asset).not_to be_destroyed

      expect(response.status).to eq 404
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'deletes an asset' do
      id = asset.id
      delete api_deck_asset_path(:deck_id => deck.id, :id => asset.id), :headers => headers

      expect(-> { Asset.find id }).to raise_error ActiveRecord::RecordNotFound

      expect(response.status).to eq 204
    end
  end
end
