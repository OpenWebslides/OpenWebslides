# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::UsersController do
  let(:user) { create :user, :confirmed }

  describe 'resource methods' do
    context 'unauthenticated' do
      it 'index' do
        get_unauthenticated :index
        expect(response.status).not_to eq 401
        expect(token response).to be_nil
      end

      it 'show' do
        get_unauthenticated :show, :id => user.id
        expect(response.status).not_to eq 401
        expect(token response).to be_nil
      end

      it 'create' do
        post_unauthenticated :create
        expect(response.status).not_to eq 401
        expect(token response).to be_nil
      end

      it 'update' do
        patch_unauthenticated :update, :id => user.id
        expect(response.status).not_to eq 401
        expect(token response).to be_nil
      end

      it 'destroy' do
        delete_unauthenticated :destroy, :id => user.id
        expect(response.status).not_to eq 401
        expect(token response).to be_nil
      end
    end

    context 'authenticated' do
      it 'index' do
        get_authenticated user, :index
        expect(response.status).not_to eq 401
        expect(token response).to be_valid
      end

      it 'show' do
        get_authenticated user, :show, :id => user.id
        expect(response.status).not_to eq 401
        expect(token response).to be_valid
      end

      it 'create' do
        post_authenticated user, :create
        expect(response.status).not_to eq 401
        expect(token response).to be_valid
      end

      it 'update' do
        patch_authenticated user, :update, :id => user.id
        expect(response.status).not_to eq 401
        expect(token response).to be_valid
      end

      it 'destroy' do
        delete_authenticated user, :destroy, :id => user.id
        expect(response.status).not_to eq 401
        # Server doesn't renew the token after account destruction
        expect(token response).to be_nil
      end
    end
  end

  describe 'relationship methods' do
    context 'unauthenticated' do
      it 'show_relationship' do
        get_unauthenticated :show_relationship, :user_id => user.id, :relationship => 'decks'
        expect(response.status).not_to eq 401
        expect(token response).to be_nil
      end

      it 'create_relationship' do
        get_unauthenticated :create_relationship, :user_id => user.id, :relationship => 'decks'
        expect(response.status).not_to eq 401
        expect(token response).to be_nil
      end

      it 'update_relationship' do
        get_unauthenticated :update_relationship, :user_id => user.id, :relationship => 'decks'
        expect(response.status).not_to eq 401
        expect(token response).to be_nil
      end

      it 'destroy_relationship' do
        get_unauthenticated :destroy_relationship, :user_id => user.id, :relationship => 'decks'
        expect(response.status).not_to eq 401
        expect(token response).to be_nil
      end
    end

    context 'authenticated' do
      it 'show_relationship' do
        get_authenticated user, :show_relationship, :user_id => user.id, :relationship => 'decks'
        expect(response.status).not_to eq 401
        expect(token response).to be_valid
      end

      it 'create_relationship' do
        get_authenticated user, :create_relationship, :user_id => user.id, :relationship => 'decks'
        expect(response.status).not_to eq 401
        expect(token response).to be_valid
      end

      it 'update_relationship' do
        get_authenticated user, :update_relationship, :user_id => user.id, :relationship => 'decks'
        expect(response.status).not_to eq 401
        expect(token response).to be_valid
      end

      it 'destroy_relationship' do
        get_authenticated user, :destroy_relationship, :user_id => user.id, :relationship => 'decks'
        expect(response.status).not_to eq 401
        expect(token response).to be_valid
      end
    end
  end
end
