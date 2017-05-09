# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::UsersController do
  let(:user) { create :user, :confirmed }

  describe 'authentication' do
    describe 'GET index' do
      it 'allows unauthenticated requests' do
        get_unauthenticated :index

        expect(response.status).not_to eq 401
        expect(token response).to be_nil
      end

      it 'allows authenticated requests and returns token' do
        get_authenticated user, :index

        expect(response.status).not_to eq 401
        expect(token response).to be_valid
      end
    end

    describe 'GET show' do
      it 'allows unauthenticated requests' do
        get_unauthenticated :show, :id => user.id

        expect(response.status).not_to eq 401
        expect(token response).to be_nil
      end

      it 'allows authenticated requests and returns token' do
        get_authenticated user, :show, :id => user.id

        expect(response.status).not_to eq 401
        expect(token response).to be_valid
      end
    end

    describe 'POST create' do
      it 'allows unauthenticated requests and does not return token' do
        post_unauthenticated :create

        expect(response.status).not_to eq 401
        expect(token response).to be_nil
      end

      it 'allows authenticated requests and returns token' do
        post_authenticated user, :create

        expect(response.status).not_to eq 401
        expect(token response).to be_valid
      end
    end

    describe 'PUT/PATCH update' do
      it 'denies unauthenticated requests and does not return token' do
        patch_unauthenticated :update, :id => user.id

        expect(response.status).to eq 401
        expect(token response).to be_nil
      end

      it 'allows authenticated requests and returns token' do
        patch_authenticated user, :update, :id => user.id

        expect(response.status).not_to eq 401
        expect(token response).to be_valid
      end
    end

    describe 'DELETE destroy' do
      it 'denies unauthenticated requests and does not return token' do
        delete_unauthenticated :destroy, :id => user.id

        expect(response.status).to eq 401
        expect(token response).to be_nil
      end

      it 'allows authenticated requests and does not return token' do
        delete_authenticated user, :destroy, :id => user.id

        expect(response.status).not_to eq 401
        expect(token response).to be_nil
      end
    end
  end
end
