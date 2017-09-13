# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UsersController do
  let(:user) { create :user, :confirmed }

  describe 'index' do
    context 'unauthenticated' do
      before { get :index }

      it { is_expected.not_to be_protected }
      it { is_expected.not_to return_token }
    end

    context 'authenticated' do
      before do
        add_auth_header
        @request.headers.merge! @headers
        get :index
      end

      it { is_expected.not_to be_protected }
      it { is_expected.to return_token }
    end
  end

  describe 'create' do
    context 'unauthenticated' do
      before { post :create }

      it { is_expected.not_to be_protected }
      it { is_expected.not_to return_token }
    end

    context 'authenticated' do
      before do
        add_auth_header
        @request.headers.merge! @headers
        post :create
      end

      it { is_expected.not_to be_protected }
      it { is_expected.not_to return_token }
    end
  end

  describe 'show' do
    context 'unauthenticated' do
      before { get :show, :params => { :id => user.id } }

      it { is_expected.not_to be_protected }
      it { is_expected.not_to return_token }
    end

    context 'authenticated' do
      before do
        add_auth_header
        @request.headers.merge! @headers
        get :show, :params => { :id => user.id }
      end

      it { is_expected.not_to be_protected }
      it { is_expected.to return_token }
    end
  end

  describe 'destroy' do
    context 'unauthenticated' do
      before { delete :destroy, :params => { :id => user.id } }

      it { is_expected.to be_protected }
      it { is_expected.not_to return_token }
    end

    context 'authenticated' do
      before do
        add_auth_header
        @request.headers.merge! @headers
        delete :destroy, :params => { :id => user.id }
      end

      it { is_expected.not_to be_protected }
      it { is_expected.not_to return_token }
    end
  end
end
