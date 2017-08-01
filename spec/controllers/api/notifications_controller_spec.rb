# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::NotificationsController do
  let(:user) { create :user, :confirmed }
  let(:notification) { create :notification }

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
        get_unauthenticated :show, :id => notification.id

        expect(response.status).not_to eq 401
        expect(token response).to be_nil
      end

      it 'allows authenticated requests and returns token' do
        get_authenticated user, :show, :id => notification.id

        expect(response.status).not_to eq 401
        expect(token response).to be_valid
      end
    end
  end

  describe 'authorization' do
    describe 'GET index' do
      it 'allows requests' do
        get_authenticated user, :index

        expect(response.status).not_to eq 403
      end
    end

    describe 'GET show' do
      it 'allows requests' do
        get_authenticated user, :show, :id => notification.id

        expect(response.status).not_to eq 403
      end
    end
  end
end
