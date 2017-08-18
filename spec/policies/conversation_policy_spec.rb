# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ConversationPolicy do
  subject { described_class.new user, conversation }

  let(:conversation) { build :conversation, :deck => deck }

  context 'for public decks' do
    let(:deck) { build :deck, :with_collaborators, :state => :public_access }

    context 'for a guest' do
      let(:user) { nil }

      it { is_expected.to forbid_action :create_comments }
      it { is_expected.to permit_action :show_comments }
      it { is_expected.to forbid_action :update_comments }
      it { is_expected.to forbid_action :destroy_comments }
    end

    context 'for a user' do
      let(:user) { build :user }

      it { is_expected.to forbid_action :create_comments }
      it { is_expected.to permit_action :show_comments }
      it { is_expected.to forbid_action :update_comments }
      it { is_expected.to forbid_action :destroy_comments }
    end

    context 'for a collaborator' do
      let(:user) { deck.collaborators.first }

      it { is_expected.to forbid_action :create_comments }
      it { is_expected.to permit_action :show_comments }
      it { is_expected.to forbid_action :update_comments }
      it { is_expected.to forbid_action :destroy_comments }
    end

    context 'for an owner' do
      let(:user) { conversation.user }

      it { is_expected.to forbid_action :create_comments }
      it { is_expected.to permit_action :show_comments }
      it { is_expected.to forbid_action :update_comments }
      it { is_expected.to forbid_action :destroy_comments }
    end

    context 'for a deck owner' do
      let(:user) { deck.owner }

      it { is_expected.to forbid_action :create_comments }
      it { is_expected.to permit_action :show_comments }
      it { is_expected.to forbid_action :update_comments }
      it { is_expected.to forbid_action :destroy_comments }
    end
  end

  context 'for protected decks' do
    let(:deck) { build :deck, :with_collaborators, :state => :protected_access }

    context 'for a guest' do
      let(:user) { nil }

      it { is_expected.to forbid_action :create_comments }
      it { is_expected.to forbid_action :show_comments }
      it { is_expected.to forbid_action :update_comments }
      it { is_expected.to forbid_action :destroy_comments }
    end

    context 'for a user' do
      let(:user) { build :user }

      it { is_expected.to forbid_action :create_comments }
      it { is_expected.to permit_action :show_comments }
      it { is_expected.to forbid_action :update_comments }
      it { is_expected.to forbid_action :destroy_comments }
    end

    context 'for a collaborator' do
      let(:user) { deck.collaborators.first }

      it { is_expected.to forbid_action :create_comments }
      it { is_expected.to permit_action :show_comments }
      it { is_expected.to forbid_action :update_comments }
      it { is_expected.to forbid_action :destroy_comments }
    end

    context 'for an owner' do
      let(:user) { conversation.user }

      it { is_expected.to forbid_action :create_comments }
      it { is_expected.to permit_action :show_comments }
      it { is_expected.to forbid_action :update_comments }
      it { is_expected.to forbid_action :destroy_comments }
    end

    context 'for a deck owner' do
      let(:user) { deck.owner }

      it { is_expected.to forbid_action :create_comments }
      it { is_expected.to permit_action :show_comments }
      it { is_expected.to forbid_action :update_comments }
      it { is_expected.to forbid_action :destroy_comments }
    end
  end

  context 'for private decks' do
    let(:deck) { build :deck, :with_collaborators, :state => :private_access }

    context 'for a guest' do
      let(:user) { nil }

      it { is_expected.to forbid_action :create_comments }
      it { is_expected.to forbid_action :show_comments }
      it { is_expected.to forbid_action :update_comments }
      it { is_expected.to forbid_action :destroy_comments }
    end

    context 'for a user' do
      let(:user) { build :user }

      it { is_expected.to forbid_action :create_comments }
      it { is_expected.to forbid_action :show_comments }
      it { is_expected.to forbid_action :update_comments }
      it { is_expected.to forbid_action :destroy_comments }
    end

    context 'for a collaborator' do
      let(:user) { deck.collaborators.first }

      it { is_expected.to forbid_action :create_comments }
      it { is_expected.to permit_action :show_comments }
      it { is_expected.to forbid_action :update_comments }
      it { is_expected.to forbid_action :destroy_comments }
    end

    context 'for an owner' do
      before { deck.collaborators << conversation.user }
      let(:user) { conversation.user }

      it { is_expected.to forbid_action :create_comments }
      it { is_expected.to permit_action :show_comments }
      it { is_expected.to forbid_action :update_comments }
      it { is_expected.to forbid_action :destroy_comments }
    end

    context 'for a deck owner' do
      let(:user) { deck.owner }

      it { is_expected.to forbid_action :create_comments }
      it { is_expected.to permit_action :show_comments }
      it { is_expected.to forbid_action :update_comments }
      it { is_expected.to forbid_action :destroy_comments }
    end
  end
end
