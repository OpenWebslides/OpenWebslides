# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::UsersController do
  let(:user1) { create :user, :confirmed }
  let(:user2) { create :user, :confirmed }

  describe 'authentication' do
    describe 'GET index' do
      it 'allows unauthenticated requests' do
        get_unauthenticated :index

        expect(response.status).not_to eq 401
        expect(token response).to be_nil
      end

      it 'allows authenticated requests and returns token' do
        get_authenticated user1, :index

        expect(response.status).not_to eq 401
        expect(token response).to be_valid
      end
    end

    describe 'GET show' do
      it 'allows unauthenticated requests' do
        get_unauthenticated :show, :id => user1.id

        expect(response.status).not_to eq 401
        expect(token response).to be_nil
      end

      it 'allows authenticated requests and returns token' do
        get_authenticated user1, :show, :id => user1.id

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
        post_authenticated user1, :create

        expect(response.status).not_to eq 401
        expect(token response).to be_valid
      end
    end

    describe 'PUT/PATCH update' do
      it 'denies unauthenticated requests and does not return token' do
        patch_unauthenticated :update, :id => user1.id

        expect(response.status).to eq 401
        expect(token response).to be_nil
      end

      it 'allows authenticated requests and returns token' do
        patch_authenticated user1, :update, :id => user1.id

        expect(response.status).not_to eq 401
        expect(token response).to be_valid
      end
    end

    describe 'DELETE destroy' do
      it 'denies unauthenticated requests and does not return token' do
        delete_unauthenticated :destroy, :id => user1.id

        expect(response.status).to eq 401
        expect(token response).to be_nil
      end

      it 'allows authenticated requests and does not return token' do
        delete_authenticated user1, :destroy, :id => user1.id

        expect(response.status).not_to eq 401
        expect(token response).to be_nil
      end
    end
  end

  def update_body(id)
    {
      :data => {
        :type => 'users',
        :id => id,
        :attributes => { :firstName => 'foo' }
      }
    }.to_json
  end

  describe 'authorization' do
    describe 'GET index' do
      it 'allows requests' do
        get_authenticated user1, :index

        expect(response.status).not_to eq 403
      end
    end

    describe 'GET show' do
      it 'allows requests for the same user' do
        get_authenticated user1, :show, :id => user1.id

        expect(response.status).not_to eq 403
      end

      it 'allows requests for another user' do
        get_authenticated user1, :show, :id => user2.id

        expect(response.status).not_to eq 403
      end
    end

    describe 'POST create' do
      it 'allows requests' do
        post_authenticated user1, :create

        expect(response.status).not_to eq 403
      end
    end

    describe 'PUT/PATCH update' do
      it 'allows requests for the same user' do
        @request.env['RAW_POST_DATA'] = update_body(user1.id)
        patch_authenticated user1, :update, :id => user1.id

        expect(response.status).not_to eq 403
      end

      it 'denies requests for another user' do
        @request.env['RAW_POST_DATA'] = update_body(user2.id)
        patch_authenticated user1, :update, :id => user2.id

        expect(response.status).to eq 403
      end
    end

    describe 'DELETE destroy' do
      it 'allows requests for the same user' do
        delete_authenticated user1, :destroy, :id => user1.id

        expect(response.status).not_to eq 403
      end

      it 'denies requests for another user' do
        delete_authenticated user1, :destroy, :id => user2.id

        expect(response.status).to eq 403
      end
    end
  end
end
