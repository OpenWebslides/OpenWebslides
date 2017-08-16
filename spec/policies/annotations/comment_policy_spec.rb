# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Annotations::CommentPolicy do
  subject { described_class.new user, comment }

  let(:comment) { build :comment, :deck => deck }

  context 'for public decks' do
    let(:deck) { build :deck, :with_collaborators, :state => :public_access }

    context 'for a guest' do
      let(:user) { nil }

      it { is_expected.to permit_action :show_conversation }
    end

    context 'for a user' do
      let(:user) { build :user }

      it { is_expected.to permit_action :show_conversation }
    end

    context 'for a collaborator' do
      let(:user) { deck.collaborators.first }

      it { is_expected.to permit_action :show_conversation }
    end

    context 'for an owner' do
      let(:user) { comment.user }

      it { is_expected.to permit_action :show_conversation }
    end

    context 'for a deck owner' do
      let(:user) { deck.owner }

      it { is_expected.to permit_action :show_conversation }
    end
  end

  context 'for protected decks' do
    let(:deck) { build :deck, :with_collaborators, :state => :protected_access }

    context 'for a guest' do
      let(:user) { nil }

      it { is_expected.to forbid_action :show_conversation }
    end

    context 'for a user' do
      let(:user) { build :user }

      it { is_expected.to permit_action :show_conversation }
    end

    context 'for a collaborator' do
      let(:user) { deck.collaborators.first }

      it { is_expected.to permit_action :show_conversation }
    end

    context 'for an owner' do
      let(:user) { comment.user }

      it { is_expected.to permit_action :show_conversation }
    end

    context 'for a deck owner' do
      let(:user) { deck.owner }

      it { is_expected.to permit_action :show_conversation }
    end
  end

  context 'for private decks' do
    let(:deck) { build :deck, :with_collaborators, :state => :private_access }

    context 'for a guest' do
      let(:user) { nil }

      it { is_expected.to forbid_action :show_conversation }
    end

    context 'for a user' do
      let(:user) { build :user }

      it { is_expected.to forbid_action :show_conversation }
    end

    context 'for a collaborator' do
      let(:user) { deck.collaborators.first }

      it { is_expected.to permit_action :show_conversation }
    end

    context 'for an owner' do
      before { deck.collaborators << comment.user }
      let(:user) { comment.user }

      it { is_expected.to permit_action :show_conversation }
    end

    context 'for a deck owner' do
      let(:user) { deck.owner }

      it { is_expected.to permit_action :show_conversation }
    end
  end
end
