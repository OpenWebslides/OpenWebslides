# frozen_string_literal: true

require 'rails_helper'

resource 'Authentication' do
  context 'Obtain a token' do
    let(:user) { create :user, :confirmed }

    post '/auth/token' do
      header 'Content-Type', 'application/json'

      parameter 'email', 'Email address', :required => true, :scope => :auth
      parameter 'password', 'Password', :required => true, :scope => :auth

      let(:raw_post) { { :auth => { :email => user.email, :password => user.password } }.to_json }

      example_request 'Authenticate using a local (email) account' do
        expect(status).to eq 201
        expect(response_headers['Content-Type']).to start_with 'application/vnd.api+json'
      end
    end
  end

  context 'Authenticate using an external provider' do
    get '/auth/github' do
      example_request 'Authenticate using GitHub' do
        expect(status).to eq 302
      end
    end

    get '/auth/google_oauth2' do
      example_request 'Authenticate using Google' do
        expect(status).to eq 302
      end
    end

    get '/auth/facebook' do
      example_request 'Authenticate using Facebook' do
        expect(status).to eq 302
      end
    end
  end
end
