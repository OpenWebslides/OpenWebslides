# frozen_string_literal: true
require 'rails_helper'
require 'rspec_api_documentation/dsl'

resource User do
  let(:id) { create(:user).id }

  ##
  # GET /users
  #
  get '/api/users' do
    it 'List HTML representation of users' do
      header 'Accept', 'text/html'
      do_request

      expect(response_status).to eq 406
    end

    it 'List JSON representation of users' do
      header 'Accept', 'application/json'
      do_request

      expect(response_status).to eq 200
      expect(response_headers['Content-Type']).to start_with 'application/json'
    end
  end

  ##
  # GET /users/:id
  #
  get 'api/users/:id' do
    it 'Show HTML representation of user' do
      header 'Accept', 'text/html'
      do_request

      expect(response_status).to eq 406
    end

    it 'Show JSON representation of user' do
      header 'Accept', 'application/json'
      do_request

      expect(response_status).to eq 200
      expect(response_headers['Content-Type']).to start_with 'application/json'

      response = JSON.parse response_body
      expect(response).to include 'id'
      expect(response).to include 'name'
      expect(response).to include 'email'
    end
  end
end
