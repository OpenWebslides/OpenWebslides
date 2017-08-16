# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Annotations::AnnotationPolicy do
  subject { described_class.new user, annotation }

  let(:annotation) { build :annotation, :deck => deck }

  context 'for public decks' do
    let(:deck) { build :deck, :with_collaborators, :state => :public_access }

    context 'for a guest' do
      let(:user) { nil }

      it { is_expected.to forbid_action :create }
      it { is_expected.to permit_action :show }
      it { is_expected.to forbid_action :update }
      it { is_expected.to forbid_action :destroy }

      it { is_expected.to permit_action :show_deck }
      it { is_expected.to permit_action :show_user }
    end

    context 'for a user' do
      let(:user) { build :user }

      it { is_expected.to permit_action :create }
      it { is_expected.to permit_action :show }
      it { is_expected.to forbid_action :update }
      it { is_expected.to forbid_action :destroy }

      it { is_expected.to permit_action :show_deck }
      it { is_expected.to permit_action :show_user }
    end

    context 'for a collaborator' do
      let(:user) { deck.collaborators.first }

      it { is_expected.to permit_action :create }
      it { is_expected.to permit_action :show }
      it { is_expected.to forbid_action :update }
      it { is_expected.to forbid_action :destroy }

      it { is_expected.to permit_action :show_deck }
      it { is_expected.to permit_action :show_user }
    end

    context 'for an owner' do
      let(:user) { annotation.user }

      it { is_expected.to permit_action :create }
      it { is_expected.to permit_action :show }
      it { is_expected.to permit_action :update }
      it { is_expected.to permit_action :destroy }

      it { is_expected.to permit_action :show_deck }
      it { is_expected.to permit_action :show_user }
    end

    context 'for a deck owner' do
      let(:user) { deck.owner }

      it { is_expected.to permit_action :create }
      it { is_expected.to permit_action :show }
      it { is_expected.to forbid_action :update }
      it { is_expected.to forbid_action :destroy }

      it { is_expected.to permit_action :show_deck }
      it { is_expected.to permit_action :show_user }
    end
  end

  context 'for protected decks' do
    let(:deck) { build :deck, :with_collaborators, :state => :protected_access }

    context 'for a guest' do
      let(:user) { nil }

      it { is_expected.to forbid_action :create }
      it { is_expected.to forbid_action :show }
      it { is_expected.to forbid_action :update }
      it { is_expected.to forbid_action :destroy }

      it { is_expected.to forbid_action :show_deck }
      it { is_expected.to permit_action :show_user }
    end

    context 'for a user' do
      let(:user) { build :user }

      it { is_expected.to permit_action :create }
      it { is_expected.to permit_action :show }
      it { is_expected.to forbid_action :update }
      it { is_expected.to forbid_action :destroy }

      it { is_expected.to permit_action :show_deck }
      it { is_expected.to permit_action :show_user }
    end

    context 'for a collaborator' do
      let(:user) { deck.collaborators.first }

      it { is_expected.to permit_action :create }
      it { is_expected.to permit_action :show }
      it { is_expected.to forbid_action :update }
      it { is_expected.to forbid_action :destroy }

      it { is_expected.to permit_action :show_deck }
      it { is_expected.to permit_action :show_user }
    end

    context 'for an owner' do
      let(:user) { annotation.user }

      it { is_expected.to permit_action :create }
      it { is_expected.to permit_action :show }
      it { is_expected.to permit_action :update }
      it { is_expected.to permit_action :destroy }

      it { is_expected.to permit_action :show_deck }
      it { is_expected.to permit_action :show_user }
    end

    context 'for a deck owner' do
      let(:user) { deck.owner }

      it { is_expected.to permit_action :create }
      it { is_expected.to permit_action :show }
      it { is_expected.to forbid_action :update }
      it { is_expected.to forbid_action :destroy }

      it { is_expected.to permit_action :show_deck }
      it { is_expected.to permit_action :show_user }
    end
  end

  context 'for private decks' do
    let(:deck) { build :deck, :with_collaborators, :state => :private_access }

    context 'for a guest' do
      let(:user) { nil }

      it { is_expected.to forbid_action :create }
      it { is_expected.to forbid_action :show }
      it { is_expected.to forbid_action :update }
      it { is_expected.to forbid_action :destroy }

      it { is_expected.to forbid_action :show_deck }
      it { is_expected.to permit_action :show_user }
    end

    context 'for a user' do
      let(:user) { build :user }

      it { is_expected.to forbid_action :create }
      it { is_expected.to forbid_action :show }
      it { is_expected.to forbid_action :update }
      it { is_expected.to forbid_action :destroy }

      it { is_expected.to forbid_action :show_deck }
      it { is_expected.to permit_action :show_user }
    end

    context 'for a collaborator' do
      let(:user) { deck.collaborators.first }

      it { is_expected.to permit_action :create }
      it { is_expected.to permit_action :show }
      it { is_expected.to forbid_action :update }
      it { is_expected.to forbid_action :destroy }

      it { is_expected.to permit_action :show_deck }
      it { is_expected.to permit_action :show_user }
    end

    context 'for an owner' do
      deck.collaborators << annotation.user
      let(:user) { annotation.user }

      it { is_expected.to permit_action :create }
      it { is_expected.to permit_action :show }
      it { is_expected.to permit_action :update }
      it { is_expected.to permit_action :destroy }

      it { is_expected.to permit_action :show_deck }
      it { is_expected.to permit_action :show_user }
    end

    context 'for a deck owner' do
      let(:user) { deck.owner }

      it { is_expected.to permit_action :create }
      it { is_expected.to permit_action :show }
      it { is_expected.to forbid_action :update }
      it { is_expected.to forbid_action :destroy }

      it { is_expected.to permit_action :show_deck }
      it { is_expected.to permit_action :show_user }
    end
  end
end
