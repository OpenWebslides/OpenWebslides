# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::TokenController do
  let(:user) { create :user, :confirmed }

  describe 'authentication' do
    describe 'POST create' do
      it 'denies unauthenticated requests' do
        post_unauthenticated :create

        expect(response.status).to eq 400
        expect(token response).to be_nil
      end

      it 'denies token-authenticated requests' do
        post_authenticated user, :create

        expect(response.status).to eq 400
        expect(token response).to be_nil
      end

      # Proper token creation is tested in spec/requests/api/token_spec.rb
    end

    describe 'DELETE destroy' do
      it 'denies unauthenticated requests' do
        delete_unauthenticated :destroy

        expect(response.status).to eq 401
        expect(token response).to be_nil
      end

      it 'allows authenticated requests and does not return a token' do
        delete_authenticated user, :destroy

        expect(response.status).not_to be 401
        expect(token response).to be_nil
      end
    end
  end

  describe 'authorization' do
    describe 'POST create' do
      it 'allows requests' do
        post_authenticated user, :create

        expect(response.status).not_to eq 403
      end
    end

    describe 'DELETE destroy' do
      it 'allows requests' do
        delete_authenticated user, :destroy, :id => user.id

        expect(response.status).not_to eq 403
      end
    end
  end
end
