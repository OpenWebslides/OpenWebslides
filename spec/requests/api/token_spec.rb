# frozen_string_literal: true

require 'rails_helper'

include RequestsHelper

RSpec.describe 'Token API', :type => :request do
  let(:unconfirmed_user) { create :user, :password => password }
  let(:user) { create :user, :confirmed, :password => password }
  let(:password) { Faker::Internet.password 6 }

  describe 'Obtain an authentication token' do
    def body(email, password)
      {
        :data => {
          :type => 'tokens',
          :attributes => {
            :email => email,
            :password => password
          }
        }
      }
    end

    it 'rejects invalid credentials' do
      post_unauthenticated '/api/token', body(user.email, 'foo').to_json

      expect(response.status).to eq 401
    end

    it 'rejects unconfirmed users' do
      post_unauthenticated '/api/token', body(unconfirmed_user.email, password).to_json

      expect(response.status).to eq 403
    end

    it 'returns a valid token' do
      post_unauthenticated '/api/token', body(user.email, password).to_json

      expect(response.status).to eq 201
      expect(response.headers['Authorization']).to start_with 'Bearer'

      token = JWT::Auth::Token.from_token response.headers['Authorization'].scan(/Bearer (.*)$/).flatten.last
      expect(token).to be_valid
    end
  end

  describe 'Invalidate all tokens' do
    it 'rejects unauthenticated requests' do
      delete_unauthenticated '/api/token'

      expect(response.status).to eq 401
    end

    it 'invalidates all tokens' do
      # Generate external token
      jwt = JWT::Auth::Token.from_user(user).to_jwt

      expect(JWT::Auth::Token.from_token jwt).to be_valid

      delete_authenticated user, '/api/token'

      expect(response.status).to eq 204
      expect(JWT::Auth::Token.from_token jwt).not_to be_valid
    end
  end
end
