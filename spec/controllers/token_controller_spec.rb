# frozen_string_literal: true

require 'rails_helper'
require 'jwt'

RSpec.describe TokenController do
  render_views

  subject { described_class.new }

  let(:user) { create :user }

  describe 'routing' do
    it 'has a token creation route' do
      expect(:post => '/auth/token').to route_to :controller => 'token', :action => 'create'
    end
  end

  describe 'creating a token' do
    it 'requires auth parameter' do
      expect { post :create }.to raise_error ActionController::ParameterMissing
    end

    it 'requires valid credentials' do
      params = { :auth => { :email => user.email, :password => 'password' } }
      post :create, :params => params

      expect(response.status).to eq 401
    end

    it 'returns jwt' do
      params = { :auth => { :email => user.email, :password => user.password } }
      post :create, :params => params

      expect(response.status).to eq 201
      json = JSON.parse response.body
      expect(json).to include 'jwt'
    end

    it 'returns valid jwt' do
      params = { :auth => { :email => user.email, :password => user.password } }
      post :create, :params => params
      token = JSON.parse(response.body)['jwt']
      secret = Rails.application.secrets.secret_key_base

      expect { JWT.decode token, secret }.not_to raise_error
      expect(JWT::Auth::Token.from_token(token).valid?).to be true
    end
  end
end
