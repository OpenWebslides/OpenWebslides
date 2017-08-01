# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::TokenController do
  let(:user) { create :user, :confirmed }

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

  describe 'destroy' do
    context 'unauthenticated' do
      before { delete :destroy }

      it { is_expected.to be_protected }
      it { is_expected.not_to return_token }
    end

    context 'authenticated' do
      before do
        add_auth_header
        @request.headers.merge! @headers
        delete :destroy
      end

      it { is_expected.not_to be_protected }
      it { is_expected.not_to return_token }
    end
  end
end
