# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Token API', :type => :request do
  let(:password) { Faker::Internet.password 6 }

  let(:unconfirmed_user) { create :user, :password => password }
  let(:user) { create :user, :confirmed, :password => password }

  def request_body(email, password)
    {
      :data => {
        :type => 'tokens',
        :attributes => {
          :email => email,
          :password => password
        }
      }
    }.to_json
  end

  describe 'POST /' do
    before do
      add_content_type_header
      add_accept_header
    end

    it 'rejects invalid credentials' do
      post token_path, :params => request_body(user.email, 'foo'), :headers => headers

      expect(response.status).to eq 401
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'returns a valid token' do
      post token_path, :params => request_body(user.email, password), :headers => headers

      expect(response.status).to eq 201
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
      expect(response.headers['Authorization']).to start_with 'Bearer'

      token = JWT::Auth::Token.from_token response.headers['Authorization'].scan(/Bearer (.*)$/).flatten.last
      expect(token).to be_valid
    end

    it 'is case insensitive' do
      post token_path, :params => request_body(user.email.upcase, password), :headers => headers

      expect(response.status).to eq 201
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
      expect(response.headers['Authorization']).to start_with 'Bearer'

      token = JWT::Auth::Token.from_token response.headers['Authorization'].scan(/Bearer (.*)$/).flatten.last
      expect(token).to be_valid
    end
  end

  describe 'DELETE /' do
    before do
      add_auth_header
    end

    it 'rejects unauthenticated requests' do
      delete token_path

      expect(response.status).to eq 401
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'invalidates all tokens' do
      # Generate external token
      jwt = JWT::Auth::Token.from_user(user).to_jwt

      expect(JWT::Auth::Token.from_token jwt).to be_valid

      delete token_path, :headers => headers

      expect(response.status).to eq 204
      expect(JWT::Auth::Token.from_token jwt).not_to be_valid
    end
  end
end
