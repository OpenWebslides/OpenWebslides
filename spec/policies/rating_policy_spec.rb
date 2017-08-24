# frozen_string_literal: true

require 'rails_helper'

RSpec.describe RatingPolicy do
  subject { described_class.new user, rating }

  let(:rating) { build :rating, :user => user, :annotation => deck.conversations.first }

  context 'for public decks' do
    let(:deck) { build :deck, :with_conversations, :with_collaborators, :state => :public_access }

    context 'for a guest' do
      let(:user) { nil }

      it { is_expected.to forbid_action :create }
      it { is_expected.to forbid_action :destroy }
    end

    context 'for a user' do
      let(:user) { build :user }

      it { is_expected.to permit_action :create }
      it { is_expected.to permit_action :destroy }
    end

    context 'for a collaborator' do
      let(:user) { deck.collaborators.first }

      it { is_expected.to permit_action :create }
      it { is_expected.to permit_action :destroy }
    end

    context 'for an owner' do
      let(:user) { deck.owner }

      it { is_expected.to permit_action :create }
      it { is_expected.to permit_action :destroy }
    end
  end

  context 'for protected decks' do
    let(:deck) { build :deck, :with_conversations, :with_collaborators, :state => :protected_access }

    context 'for a guest' do
      let(:user) { nil }

      it { is_expected.to forbid_action :create }
      it { is_expected.to forbid_action :destroy }
    end

    context 'for a user' do
      let(:user) { build :user }

      it { is_expected.to permit_action :create }
      it { is_expected.to permit_action :destroy }
    end

    context 'for a collaborator' do
      let(:user) { deck.collaborators.first }

      it { is_expected.to permit_action :create }
      it { is_expected.to permit_action :destroy }
    end

    context 'for an owner' do
      let(:user) { deck.owner }

      it { is_expected.to permit_action :create }
      it { is_expected.to permit_action :destroy }
    end
  end

  context 'for private decks' do
    let(:deck) { build :deck, :with_conversations, :with_collaborators, :state => :private_access }

    context 'for a guest' do
      let(:user) { nil }

      it { is_expected.to forbid_action :create }
      it { is_expected.to forbid_action :destroy }
    end

    context 'for a user' do
      let(:user) { build :user }

      it { is_expected.to forbid_action :create }
      it { is_expected.to forbid_action :destroy }
    end

    context 'for a collaborator' do
      let(:user) { deck.collaborators.first }

      it { is_expected.to permit_action :create }
      it { is_expected.to permit_action :destroy }
    end

    context 'for an owner' do
      let(:user) { deck.owner }

      it { is_expected.to permit_action :create }
      it { is_expected.to permit_action :destroy }
    end
  end
end
