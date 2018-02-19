# frozen_string_literal: true

require 'rails_helper'

require 'open_webslides/version'

RSpec.describe 'Version API', :type => :request do
  describe 'GET /' do
    it 'returns successful' do
      get version_path

      expect(response.status).to eq 200
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

      json = JSON.parse response.body
      expect(json['data']['type']).to eq 'apps'
      expect(json['data']['attributes']['version']).to eq OpenWebslides.version.build
      expect(json['data']['attributes']['version_string']).to eq OpenWebslides.version.version_string
    end
  end
end
