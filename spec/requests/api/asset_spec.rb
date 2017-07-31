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
      @headers['Content-Type'] = 'application/octet-stream'
      @headers['Content-Disposition'] = 'attachment; filename="asset.png"'

      @body = fixture_file_upload(asset_file)

      # Stub out Repository::Asset::UpdateFile
      Repository::Asset::UpdateFile.send :define_method,
                                         :execute,
                                         -> { true }
    end

    it 'rejects without Content-Disposition' do
      post api_deck_assets_path(:deck_id => deck.id), :params => @body, :headers => headers.except('Content-Disposition')

      expect(response.status).to eq 400
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'rejects filename already taken' do
      post api_deck_assets_path(:deck_id => deck.id), :params => @body, :headers => headers.merge('Content-Disposition' => "attachment; filename=\"#{asset.filename}\"")

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
      add_accept_header
    end

    it 'rejects an invalid id' do
      get api_asset_path(:id => 0), :headers => headers

      expect(response.status).to eq 404
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'returns successful' do
      get api_asset_path(:id => asset.id), :headers => headers

      expect(response.status).to eq 200
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'has a raw link' do
      get api_asset_path(:id => asset.id), :headers => headers

      links = (JSON.parse response.body)['data']['links']
      expect(links['raw']).not_to be_nil
    end
  end

  describe 'DELETE /:id' do
    before do
      add_auth_header

      # Stub out Repository::Asset::Destroy
      Repository::Asset::Destroy.send :define_method,
                                      :execute,
                                      -> { true }
    end

    it 'rejects non-existant assets' do
      delete api_asset_path(:id => '0'), :headers => headers

      asset.reload
      expect(asset).not_to be_destroyed

      expect(response.status).to eq 404
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'deletes an asset' do
      id = asset.id
      delete api_asset_path(:id => asset.id), :headers => headers

      expect(-> { Asset.find id }).to raise_error ActiveRecord::RecordNotFound

      expect(response.status).to eq 204
    end
  end
end
