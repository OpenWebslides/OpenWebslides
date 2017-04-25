# frozen_string_literal: true

require 'rails_helper'
require 'jwt'

RSpec.describe Auth::AuthController do
  render_views

  subject { described_class.new }

  describe 'routing' do
    it 'has a token creation route' do
      expect(:post => '/auth/token').to route_to :controller => 'auth/auth', :action => 'token'
      expect(:get => '/auth/confirm').to route_to :controller => 'auth/auth', :action => 'confirm'
      expect(:get => '/auth/expire').to route_to :controller => 'auth/auth', :action => 'expire'
    end
  end

  context 'obtaining a token' do
    context 'for a confirmed user' do
      let(:user) { create :user, :confirmed }

      describe 'creating a token' do
        it 'requires auth parameter' do
          expect { post :token }.to raise_error ActionController::ParameterMissing
        end

        it 'requires valid credentials' do
          params = { :auth => { :email => user.email, :password => 'password' } }
          post :token, :params => params

          expect(response.status).to eq 401
        end

        it 'returns jwt' do
          params = { :auth => { :email => user.email, :password => user.password } }
          post :token, :params => params

          expect(response.status).to eq 201
          json = JSON.parse response.body
          expect(json).to include 'jwt'
        end

        it 'returns valid jwt' do
          params = { :auth => { :email => user.email, :password => user.password } }
          post :token, :params => params
          token = JSON.parse(response.body)['jwt']
          secret = Rails.application.secrets.secret_key_base

          expect { JWT.decode token, secret }.not_to raise_error
          expect(JWT::Auth::Token.from_token(token).valid?).to be true
        end
      end
    end

    context 'for an unconfirmed user' do
      let(:user) { create :user }

      describe 'creating a token' do
        it 'returns an error' do
          params = { :auth => { :email => user.email, :password => user.password } }
          post :token, :params => params

          expect(response.status).to eq 403
          json = JSON.parse response.body
          expect(json).to include 'error'
        end
      end

      describe 'confirming an account' do
        it 'confirms a valid confirmation token' do
          expect(user.confirmed?).to be false

          params = { :confirmation_token => user.confirmation_token }
          get :confirm, :params => params

          # Don't check the cached version
          user.reload
          expect(response.status).to eq 200
        end

        it 'rejects an invalid confirmation token' do
          expect(user.confirmed?).to be false

          params = { :confirmation_token => 'foo' }
          get :confirm, :params => params

          # Don't check the cached version
          user.reload
          expect(response.status).to eq 403
          json = JSON.parse response.body
          expect(json).to include 'error'
        end
      end
    end
  end

  context 'expiring user sessions' do
    let(:user) { create :user, :confirmed }
    let(:token) { JWT::Auth::Token.from_user(user).to_jwt }

    it 'rejects invalid tokens' do
      get :expire

      expect(response.status).to eq 401
    end

    it 'expires valid tokens' do
      request.headers['Authorization'] = "Bearer #{token}"
      get :expire

      expect(response.status).to eq 200

      get :expire
      expect(response.status).to eq 401
    end
  end
end
