# frozen_string_literal: true

require 'rails_helper'

RSpec.describe NotificationPolicy do
  subject { described_class.new user, record }

  let(:record) { build :notification, :deck => deck }

  context 'public decks' do
    let(:deck) { create :deck, :state => 'public_access' }

    context 'for a guest' do
      let(:user) { nil }

      it { is_expected.to permit_action :index }
      it { is_expected.to permit_action :show }

      it { is_expected.to permit_action :show_user }
      it { is_expected.to permit_action :show_deck }
    end

    context 'for a user' do
      let(:user) { build :user }

      it { is_expected.to permit_action :index }
      it { is_expected.to permit_action :show }

      it { is_expected.to permit_action :show_user }
      it { is_expected.to permit_action :show_deck }
    end
  end

  context 'protected decks' do
    let(:deck) { create :deck, :state => 'protected_access' }

    context 'for a guest' do
      let(:user) { nil }

      it { is_expected.to permit_action :index }
      it { is_expected.to forbid_action :show }

      it { is_expected.to forbid_action :show_user }
      it { is_expected.to forbid_action :show_deck }
    end

    context 'for a user' do
      let(:user) { build :user }

      it { is_expected.to permit_action :index }
      it { is_expected.to permit_action :show }

      it { is_expected.to permit_action :show_user }
      it { is_expected.to permit_action :show_deck }
    end
  end

  context 'private decks' do
    let(:deck) { create :deck, :state => 'private_access' }

    context 'for a guest' do
      let(:user) { nil }

      it { is_expected.to permit_action :index }
      it { is_expected.to forbid_action :show }

      it { is_expected.to forbid_action :show_user }
      it { is_expected.to forbid_action :show_deck }
    end

    context 'for a user' do
      let(:user) { build :user }

      it { is_expected.to permit_action :index }
      it { is_expected.to forbid_action :show }

      it { is_expected.to forbid_action :show_user }
      it { is_expected.to forbid_action :show_deck }
    end

    context 'for an owner' do
      let(:user) { deck.owner }

      it { is_expected.to permit_action :index }
      it { is_expected.to permit_action :show }

      it { is_expected.to permit_action :show_user }
      it { is_expected.to permit_action :show_deck }
    end
  end
end
