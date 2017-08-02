# frozen_string_literal: true

require 'rails_helper'

RSpec.describe NotificationsController do
  let(:user) { create :user, :confirmed }
  let(:notification) { create :notification }

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

  describe 'show' do
    context 'unauthenticated' do
      before { get :show, :params => { :id => notification.id } }

      it { is_expected.not_to be_protected }
      it { is_expected.not_to return_token }
    end

    context 'authenticated' do
      before do
        add_auth_header
        @request.headers.merge! @headers
        get :show, :params => { :id => notification.id }
      end

      it { is_expected.not_to be_protected }
      it { is_expected.to return_token }
    end
  end
end
