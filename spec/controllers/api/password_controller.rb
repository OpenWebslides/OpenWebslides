# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::PasswordController do
  let(:user) { create :user, :confirmed }

  describe 'authentication' do
    describe 'POST create' do
      it 'allows unauthenticated requests but does not return a token' do
        post_unauthenticated :create

        expect(response.status).not_to eq 401
        expect(token response).to be_nil
      end

      it 'allows authenticated requests but does not return a token' do
        post_authenticated user, :create

        expect(response.status).not_to eq 401
        expect(token response).to be_nil
      end
    end

    describe 'PUT/PATCH update' do
      it 'allows unauthenticated requests but does not return a token' do
        patch_unauthenticated :update

        expect(response.status).not_to eq 401
        expect(token response).to be_nil
      end

      it 'allows authenticated requests but does not return a token' do
        patch_authenticated user, :update

        expect(response.status).not_to be 401
        expect(token response).to be_nil
      end
    end
  end
end
