# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AnnotationPolicy do
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

      it { is_expected.to forbid_action :fsm_edit }
      it { is_expected.to forbid_action :fsm_flag }
      it { is_expected.to forbid_action :fsm_hide }
      it { is_expected.to forbid_action :fsm_protect }
      it { is_expected.to forbid_action :fsm_publish }
      it { is_expected.to forbid_action :fsm_rate }
    end

    context 'for another user' do
      let(:user) { build :user }

      it { is_expected.to forbid_action :create }
      it { is_expected.to permit_action :show }
      it { is_expected.to forbid_action :update }
      it { is_expected.to forbid_action :destroy }

      it { is_expected.to permit_action :show_deck }
      it { is_expected.to permit_action :show_user }

      it { is_expected.to forbid_action :fsm_edit }
      it { is_expected.to permit_action :fsm_flag }
      it { is_expected.to forbid_action :fsm_hide }
      it { is_expected.to forbid_action :fsm_protect }
      it { is_expected.to forbid_action :fsm_publish }
      it { is_expected.to permit_action :fsm_rate }
    end

    context 'for a collaborator' do
      before { annotation.user = user }
      let(:user) { deck.collaborators.first }

      it { is_expected.to permit_action :create }
      it { is_expected.to permit_action :show }
      it { is_expected.to permit_action :update }
      it { is_expected.to permit_action :destroy }

      it { is_expected.to permit_action :show_deck }
      it { is_expected.to permit_action :show_user }

      it { is_expected.to permit_action :fsm_edit }
      it { is_expected.to forbid_action :fsm_flag }
      it { is_expected.to permit_action :fsm_hide }
      it { is_expected.to permit_action :fsm_protect }
      it { is_expected.to permit_action :fsm_publish }
      it { is_expected.to permit_action :fsm_rate }
    end

    context 'for another collaborator' do
      let(:user) { deck.collaborators.first }

      it { is_expected.to forbid_action :create }
      it { is_expected.to permit_action :show }
      it { is_expected.to forbid_action :update }
      it { is_expected.to forbid_action :destroy }

      it { is_expected.to permit_action :show_deck }
      it { is_expected.to permit_action :show_user }

      it { is_expected.to forbid_action :fsm_edit }
      it { is_expected.to permit_action :fsm_flag }
      it { is_expected.to permit_action :fsm_hide }
      it { is_expected.to forbid_action :fsm_protect }
      it { is_expected.to forbid_action :fsm_publish }
      it { is_expected.to permit_action :fsm_rate }
    end

    context 'for an owner' do
      let(:user) { annotation.user }

      it { is_expected.to permit_action :create }
      it { is_expected.to permit_action :show }
      it { is_expected.to permit_action :update }
      it { is_expected.to permit_action :destroy }

      it { is_expected.to permit_action :show_deck }
      it { is_expected.to permit_action :show_user }

      it { is_expected.to permit_action :fsm_edit }
      it { is_expected.to forbid_action :fsm_flag }
      it { is_expected.to permit_action :fsm_hide }
      it { is_expected.to permit_action :fsm_protect }
      it { is_expected.to permit_action :fsm_publish }
      it { is_expected.to permit_action :fsm_rate }
    end

    context 'for a deck owner' do
      before { annotation.user = user }
      let(:user) { deck.owner }

      it { is_expected.to permit_action :create }
      it { is_expected.to permit_action :show }
      it { is_expected.to permit_action :update }
      it { is_expected.to permit_action :destroy }

      it { is_expected.to permit_action :show_deck }
      it { is_expected.to permit_action :show_user }

      it { is_expected.to permit_action :fsm_edit }
      it { is_expected.to forbid_action :fsm_flag }
      it { is_expected.to permit_action :fsm_hide }
      it { is_expected.to permit_action :fsm_protect }
      it { is_expected.to permit_action :fsm_publish }
      it { is_expected.to permit_action :fsm_rate }
    end

    context 'for another deck owner' do
      let(:user) { deck.owner }

      it { is_expected.to forbid_action :create }
      it { is_expected.to permit_action :show }
      it { is_expected.to forbid_action :update }
      it { is_expected.to forbid_action :destroy }

      it { is_expected.to permit_action :show_deck }
      it { is_expected.to permit_action :show_user }

      it { is_expected.to forbid_action :fsm_edit }
      it { is_expected.to permit_action :fsm_flag }
      it { is_expected.to permit_action :fsm_hide }
      it { is_expected.to forbid_action :fsm_protect }
      it { is_expected.to forbid_action :fsm_publish }
      it { is_expected.to permit_action :fsm_rate }
    end

    describe 'private annotations' do
      before { annotation.protect }

      context 'for a guest' do
        let(:user) { nil }

        it { is_expected.to forbid_action :show }
      end

      context 'for another user' do
        let(:user) { build :user }

        it { is_expected.to forbid_action :show }
      end

      context 'for the owner' do
        let(:user) { annotation.user }

        it do
          is_expected.to permit_action :show
        end
      end
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

      it { is_expected.to forbid_action :fsm_edit }
      it { is_expected.to forbid_action :fsm_flag }
      it { is_expected.to forbid_action :fsm_hide }
      it { is_expected.to forbid_action :fsm_protect }
      it { is_expected.to forbid_action :fsm_publish }
      it { is_expected.to forbid_action :fsm_rate }
    end

    context 'for another user' do
      let(:user) { build :user }

      it { is_expected.to forbid_action :create }
      it { is_expected.to permit_action :show }
      it { is_expected.to forbid_action :update }
      it { is_expected.to forbid_action :destroy }

      it { is_expected.to permit_action :show_deck }
      it { is_expected.to permit_action :show_user }

      it { is_expected.to forbid_action :fsm_edit }
      it { is_expected.to permit_action :fsm_flag }
      it { is_expected.to forbid_action :fsm_hide }
      it { is_expected.to forbid_action :fsm_protect }
      it { is_expected.to forbid_action :fsm_publish }
      it { is_expected.to permit_action :fsm_rate }
    end

    context 'for a collaborator' do
      before { annotation.user = user }
      let(:user) { deck.collaborators.first }

      it { is_expected.to permit_action :create }
      it { is_expected.to permit_action :show }
      it { is_expected.to permit_action :update }
      it { is_expected.to permit_action :destroy }

      it { is_expected.to permit_action :show_deck }
      it { is_expected.to permit_action :show_user }

      it { is_expected.to permit_action :fsm_edit }
      it { is_expected.to forbid_action :fsm_flag }
      it { is_expected.to permit_action :fsm_hide }
      it { is_expected.to permit_action :fsm_protect }
      it { is_expected.to permit_action :fsm_publish }
      it { is_expected.to permit_action :fsm_rate }
    end

    context 'for another collaborator' do
      let(:user) { deck.collaborators.first }

      it { is_expected.to forbid_action :create }
      it { is_expected.to permit_action :show }
      it { is_expected.to forbid_action :update }
      it { is_expected.to forbid_action :destroy }

      it { is_expected.to permit_action :show_deck }
      it { is_expected.to permit_action :show_user }

      it { is_expected.to forbid_action :fsm_edit }
      it { is_expected.to permit_action :fsm_flag }
      it { is_expected.to permit_action :fsm_hide }
      it { is_expected.to forbid_action :fsm_protect }
      it { is_expected.to forbid_action :fsm_publish }
      it { is_expected.to permit_action :fsm_rate }
    end

    context 'for an owner' do
      let(:user) { annotation.user }

      it { is_expected.to permit_action :create }
      it { is_expected.to permit_action :show }
      it { is_expected.to permit_action :update }
      it { is_expected.to permit_action :destroy }

      it { is_expected.to permit_action :show_deck }
      it { is_expected.to permit_action :show_user }

      it { is_expected.to permit_action :fsm_edit }
      it { is_expected.to forbid_action :fsm_flag }
      it { is_expected.to permit_action :fsm_hide }
      it { is_expected.to permit_action :fsm_protect }
      it { is_expected.to permit_action :fsm_publish }
      it { is_expected.to permit_action :fsm_rate }
    end

    context 'for a deck owner' do
      before { annotation.user = user }
      let(:user) { deck.owner }

      it { is_expected.to permit_action :create }
      it { is_expected.to permit_action :show }
      it { is_expected.to permit_action :update }
      it { is_expected.to permit_action :destroy }

      it { is_expected.to permit_action :show_deck }
      it { is_expected.to permit_action :show_user }

      it { is_expected.to permit_action :fsm_edit }
      it { is_expected.to forbid_action :fsm_flag }
      it { is_expected.to permit_action :fsm_hide }
      it { is_expected.to permit_action :fsm_protect }
      it { is_expected.to permit_action :fsm_publish }
      it { is_expected.to permit_action :fsm_rate }
    end

    context 'for another deck owner' do
      let(:user) { deck.owner }

      it { is_expected.to forbid_action :create }
      it { is_expected.to permit_action :show }
      it { is_expected.to forbid_action :update }
      it { is_expected.to forbid_action :destroy }

      it { is_expected.to permit_action :show_deck }
      it { is_expected.to permit_action :show_user }

      it { is_expected.to forbid_action :fsm_edit }
      it { is_expected.to permit_action :fsm_flag }
      it { is_expected.to permit_action :fsm_hide }
      it { is_expected.to forbid_action :fsm_protect }
      it { is_expected.to forbid_action :fsm_publish }
      it { is_expected.to permit_action :fsm_rate }
    end

    describe 'private annotations' do
      before { annotation.protect }

      context 'for a guest' do
        let(:user) { nil }

        it { is_expected.to forbid_action :show }
      end

      context 'for another user' do
        let(:user) { build :user }

        it { is_expected.to forbid_action :show }
      end

      context 'for the owner' do
        let(:user) { annotation.user }

        it do
          is_expected.to permit_action :show
        end
      end
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

      it { is_expected.to forbid_action :fsm_edit }
      it { is_expected.to forbid_action :fsm_flag }
      it { is_expected.to forbid_action :fsm_hide }
      it { is_expected.to forbid_action :fsm_protect }
      it { is_expected.to forbid_action :fsm_publish }
      it { is_expected.to forbid_action :fsm_rate }
    end

    context 'for another user' do
      let(:user) { build :user }

      it { is_expected.to forbid_action :create }
      it { is_expected.to forbid_action :show }
      it { is_expected.to forbid_action :update }
      it { is_expected.to forbid_action :destroy }

      it { is_expected.to forbid_action :show_deck }
      it { is_expected.to permit_action :show_user }

      it { is_expected.to forbid_action :fsm_edit }
      it { is_expected.to forbid_action :fsm_flag }
      it { is_expected.to forbid_action :fsm_hide }
      it { is_expected.to forbid_action :fsm_protect }
      it { is_expected.to forbid_action :fsm_publish }
      it { is_expected.to forbid_action :fsm_rate }
    end

    context 'for a collaborator' do
      before { annotation.user = user }
      let(:user) { deck.collaborators.first }

      it { is_expected.to permit_action :create }
      it { is_expected.to permit_action :show }
      it { is_expected.to permit_action :update }
      it { is_expected.to permit_action :destroy }

      it { is_expected.to permit_action :show_deck }
      it { is_expected.to permit_action :show_user }

      it { is_expected.to permit_action :fsm_edit }
      it { is_expected.to forbid_action :fsm_flag }
      it { is_expected.to permit_action :fsm_hide }
      it { is_expected.to permit_action :fsm_protect }
      it { is_expected.to permit_action :fsm_publish }
      it { is_expected.to permit_action :fsm_rate }
    end

    context 'for another collaborator' do
      let(:user) { deck.collaborators.first }

      it { is_expected.to forbid_action :create }
      it { is_expected.to permit_action :show }
      it { is_expected.to forbid_action :update }
      it { is_expected.to forbid_action :destroy }

      it { is_expected.to permit_action :show_deck }
      it { is_expected.to permit_action :show_user }

      it { is_expected.to forbid_action :fsm_edit }
      it { is_expected.to permit_action :fsm_flag }
      it { is_expected.to permit_action :fsm_hide }
      it { is_expected.to forbid_action :fsm_protect }
      it { is_expected.to forbid_action :fsm_publish }
      it { is_expected.to permit_action :fsm_rate }
    end

    context 'for an owner' do
      before { deck.collaborators << annotation.user }
      let(:user) { annotation.user }

      it { is_expected.to permit_action :create }
      it { is_expected.to permit_action :show }
      it { is_expected.to permit_action :update }
      it { is_expected.to permit_action :destroy }

      it { is_expected.to permit_action :show_deck }
      it { is_expected.to permit_action :show_user }

      it { is_expected.to permit_action :fsm_edit }
      it { is_expected.to forbid_action :fsm_flag }
      it { is_expected.to permit_action :fsm_hide }
      it { is_expected.to permit_action :fsm_protect }
      it { is_expected.to permit_action :fsm_publish }
      it { is_expected.to permit_action :fsm_rate }
    end

    context 'for a deck owner' do
      before { annotation.user = user }
      let(:user) { deck.owner }

      it { is_expected.to permit_action :create }
      it { is_expected.to permit_action :show }
      it { is_expected.to permit_action :update }
      it { is_expected.to permit_action :destroy }

      it { is_expected.to permit_action :show_deck }
      it { is_expected.to permit_action :show_user }

      it { is_expected.to permit_action :fsm_edit }
      it { is_expected.to forbid_action :fsm_flag }
      it { is_expected.to permit_action :fsm_hide }
      it { is_expected.to permit_action :fsm_protect }
      it { is_expected.to permit_action :fsm_publish }
    end

    context 'for another deck owner' do
      let(:user) { deck.owner }

      it { is_expected.to forbid_action :create }
      it { is_expected.to permit_action :show }
      it { is_expected.to forbid_action :update }
      it { is_expected.to forbid_action :destroy }

      it { is_expected.to permit_action :show_deck }
      it { is_expected.to permit_action :show_user }

      it { is_expected.to forbid_action :fsm_edit }
      it { is_expected.to permit_action :fsm_flag }
      it { is_expected.to permit_action :fsm_hide }
      it { is_expected.to forbid_action :fsm_protect }
      it { is_expected.to forbid_action :fsm_publish }
    end

    describe 'private annotations' do
      before { annotation.protect }

      context 'for a guest' do
        let(:user) { nil }

        it { is_expected.to forbid_action :show }
      end

      context 'for another user' do
        let(:user) { build :user }

        it { is_expected.to forbid_action :show }
      end

      context 'for the owner' do
        let(:user) { annotation.user }
        before { deck.collaborators << user }

        it do
          is_expected.to permit_action :show
        end
      end
    end
  end
end
