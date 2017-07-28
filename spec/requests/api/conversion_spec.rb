# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Conversions API', :type => :request do
  let(:user) { create :user, :confirmed }
  let(:conversion) { create :conversion, :user => user }

  describe 'POST /' do
    before do
      add_auth_header
      @headers['Content-Type'] = 'multipart/form-data'

      @body = {
        :qqfilename => 'presentation.pptx',
        :qqfile => fixture_file_upload(Rails.root.join 'spec', 'support', 'presentation.pptx')
      }
    end

    it 'rejects without qqfilename' do
      post api_conversions_path, :params => @body.except(:qqfilename), :headers => headers

      expect(response.status).to eq 422
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'rejects without qqfile' do
      post api_conversions_path, :params => @body.except(:qqfile), :headers => headers

      expect(response.status).to eq 422
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'returns successful' do
      post api_conversions_path, :params => @body, :headers => headers

      expect(response.status).to eq 201
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

      attributes = (JSON.parse response.body)['data']['attributes']
      expect(attributes['name']).to eq 'presentation.pptx'
      expect(attributes['status']).to eq 'queued'
    end
  end

  describe 'GET /:id' do
    before do
      add_accept_header
      add_auth_header
    end

    it 'rejects an invalid id' do
      get api_conversion_path(:id => 0), :headers => headers

      expect(response.status).to eq 404
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'returns successful' do
      get api_conversion_path(:id => conversion.id), :headers => headers

      expect(response.status).to eq 200
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

      data = (JSON.parse response.body)['data']
      expect(Conversion.statuses.keys).to include data['attributes']['status']
    end
  end

  # TODO: user relationship
  # TODO: deck relationship
end
