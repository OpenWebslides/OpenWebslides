# frozen_string_literal: true

require 'rails_helper'

RSpec.describe DeckPolicy do
  subject { described_class.new user, deck }

  let(:deck) { build :deck, :state => :public_access, :owner => user }

  context 'for a guest' do
    let(:user) { nil }

    it { is_expected.to permit_action :index }
    it { is_expected.to forbid_action :create }

    it 'should not permit :create for another user' do
      expect(described_class.new(build(:user), deck)).to forbid_action :create
    end

    context 'for public decks' do
      let(:deck) { build :deck, :state => :public_access }
      it 'should permit only read' do
        expect(subject).to permit_action :show
        expect(subject).to forbid_action :update
        expect(subject).to forbid_action :destroy

        expect(subject).to permit_action :show_owner
        expect(subject).to forbid_action :update_owner
        expect(subject).to forbid_action :destroy_owner

        expect(subject).to forbid_action :create_collaborators
        expect(subject).to permit_action :show_collaborators
        expect(subject).to forbid_action :update_collaborators
        expect(subject).to forbid_action :destroy_collaborators

        expect(subject).to forbid_action :create_assets
        expect(subject).to permit_action :show_assets
        expect(subject).to forbid_action :update_assets
        expect(subject).to forbid_action :destroy_assets
      end
    end

    context 'for protected decks' do
      let(:deck) { build :deck, :state => :protected_access }
      it 'should not permit anything' do
        expect(subject).to forbid_action :show
        expect(subject).to forbid_action :update
        expect(subject).to forbid_action :destroy

        expect(subject).to forbid_action :show_owner
        expect(subject).to forbid_action :update_owner
        expect(subject).to forbid_action :destroy_owner

        expect(subject).to forbid_action :create_collaborators
        expect(subject).to forbid_action :show_collaborators
        expect(subject).to forbid_action :update_collaborators
        expect(subject).to forbid_action :destroy_collaborators

        expect(subject).to forbid_action :create_assets
        expect(subject).to forbid_action :show_assets
        expect(subject).to forbid_action :update_assets
        expect(subject).to forbid_action :destroy_assets
      end
    end

    context 'for private decks' do
      let(:deck) { build :deck, :state => :private_access }
      it 'should not permit anything' do
        expect(subject).to forbid_action :show
        expect(subject).to forbid_action :update
        expect(subject).to forbid_action :destroy

        expect(subject).to forbid_action :show_owner
        expect(subject).to forbid_action :update_owner
        expect(subject).to forbid_action :destroy_owner

        expect(subject).to forbid_action :create_collaborators
        expect(subject).to forbid_action :show_collaborators
        expect(subject).to forbid_action :update_collaborators
        expect(subject).to forbid_action :destroy_collaborators

        expect(subject).to forbid_action :create_assets
        expect(subject).to forbid_action :show_assets
        expect(subject).to forbid_action :update_assets
        expect(subject).to forbid_action :destroy_assets
      end
    end
  end

  context 'for a user' do
    let(:user) { build :user }

    it { is_expected.to permit_action :index }
    it { is_expected.to permit_action :create }

    it 'should not permit :create for another user' do
      expect(described_class.new(build(:user), deck)).to forbid_action :create
    end

    context 'for public decks' do
      let(:deck) { build :deck, :state => :public_access }
      it 'should permit only read' do
        expect(subject).to permit_action :show
        expect(subject).to forbid_action :update
        expect(subject).to forbid_action :destroy

        expect(subject).to permit_action :show_owner
        expect(subject).to forbid_action :update_owner
        expect(subject).to forbid_action :destroy_owner

        expect(subject).to forbid_action :create_collaborators
        expect(subject).to permit_action :show_collaborators
        expect(subject).to forbid_action :update_collaborators
        expect(subject).to forbid_action :destroy_collaborators

        expect(subject).to forbid_action :create_assets
        expect(subject).to permit_action :show_assets
        expect(subject).to forbid_action :update_assets
        expect(subject).to forbid_action :destroy_assets
      end
    end

    context 'for protected decks' do
      let(:deck) { build :deck, :state => :protected_access }
      it 'should permit only read' do
        expect(subject).to permit_action :show
        expect(subject).to forbid_action :update
        expect(subject).to forbid_action :destroy

        expect(subject).to permit_action :show_owner
        expect(subject).to forbid_action :update_owner
        expect(subject).to forbid_action :destroy_owner

        expect(subject).to forbid_action :create_collaborators
        expect(subject).to permit_action :show_collaborators
        expect(subject).to forbid_action :update_collaborators
        expect(subject).to forbid_action :destroy_collaborators

        expect(subject).to forbid_action :create_assets
        expect(subject).to permit_action :show_assets
        expect(subject).to forbid_action :update_assets
        expect(subject).to forbid_action :destroy_assets
      end
    end

    context 'for private decks' do
      let(:deck) { build :deck, :state => :private_access }
      it 'should not permit anything' do
        expect(subject).to forbid_action :show
        expect(subject).to forbid_action :update
        expect(subject).to forbid_action :destroy

        expect(subject).to forbid_action :show_owner
        expect(subject).to forbid_action :update_owner
        expect(subject).to forbid_action :destroy_owner

        expect(subject).to forbid_action :create_collaborators
        expect(subject).to forbid_action :show_collaborators
        expect(subject).to forbid_action :update_collaborators
        expect(subject).to forbid_action :destroy_collaborators

        expect(subject).to forbid_action :create_assets
        expect(subject).to forbid_action :show_assets
        expect(subject).to forbid_action :update_assets
        expect(subject).to forbid_action :destroy_assets
      end
    end
  end

  context 'for a collaborator' do
    let(:user) { build :user, :with_decks }

    it { is_expected.to permit_action :index }
    it { is_expected.to permit_action :create }

    it 'should not permit :create for another user' do
      expect(described_class.new(build(:user), deck)).to forbid_action :create
    end

    context 'for public decks' do
      let(:deck) { build :deck, :with_collaborators, :state => :public_access }
      let(:user) { deck.collaborators.first }
      it 'should permit update' do
        expect(subject).to permit_action :show
        expect(subject).to permit_action :update
        expect(subject).to forbid_action :destroy

        expect(subject).to permit_action :show_owner
        expect(subject).to forbid_action :update_owner
        expect(subject).to forbid_action :destroy_owner

        expect(subject).to forbid_action :create_collaborators
        expect(subject).to permit_action :show_collaborators
        expect(subject).to forbid_action :update_collaborators
        expect(subject).to forbid_action :destroy_collaborators

        expect(subject).to permit_action :create_assets
        expect(subject).to permit_action :show_assets
        expect(subject).to permit_action :update_assets
        expect(subject).to permit_action :destroy_assets
      end
    end

    context 'for protected decks' do
      let(:deck) { build :deck, :with_collaborators, :state => :protected_access }
      let(:user) { deck.collaborators.first }
      it 'should not permit anything' do
        expect(subject).to permit_action :show
        expect(subject).to permit_action :update
        expect(subject).to forbid_action :destroy

        expect(subject).to permit_action :show_owner
        expect(subject).to forbid_action :update_owner
        expect(subject).to forbid_action :destroy_owner

        expect(subject).to forbid_action :create_collaborators
        expect(subject).to permit_action :show_collaborators
        expect(subject).to forbid_action :update_collaborators
        expect(subject).to forbid_action :destroy_collaborators

        expect(subject).to permit_action :create_assets
        expect(subject).to permit_action :show_assets
        expect(subject).to permit_action :update_assets
        expect(subject).to permit_action :destroy_assets
      end
    end

    context 'for private decks' do
      let(:deck) { build :deck, :with_collaborators, :state => :private_access }
      let(:user) { deck.collaborators.first }
      it 'should not permit anything' do
        expect(subject).to permit_action :show
        expect(subject).to permit_action :update
        expect(subject).to forbid_action :destroy

        expect(subject).to permit_action :show_owner
        expect(subject).to forbid_action :update_owner
        expect(subject).to forbid_action :destroy_owner

        expect(subject).to forbid_action :create_collaborators
        expect(subject).to permit_action :show_collaborators
        expect(subject).to forbid_action :update_collaborators
        expect(subject).to forbid_action :destroy_collaborators

        expect(subject).to permit_action :create_assets
        expect(subject).to permit_action :show_assets
        expect(subject).to permit_action :update_assets
        expect(subject).to permit_action :destroy_assets
      end
    end
  end

  context 'for an owner' do
    let(:user) { build :user, :with_decks }

    it { is_expected.to permit_action :index }
    it { is_expected.to permit_action :create }

    it 'should not permit :create for another user' do
      expect(described_class.new(build(:user), deck)).to forbid_action :create
    end

    context 'for public decks' do
      let(:deck) { build :deck, :state => :public_access }
      let(:user) { deck.owner }
      it 'should permit everything' do
        expect(subject).to permit_action :show
        expect(subject).to permit_action :update
        expect(subject).to permit_action :destroy

        expect(subject).to permit_action :show_owner
        expect(subject).to permit_action :update_owner
        expect(subject).to forbid_action :destroy_owner

        expect(subject).to permit_action :create_collaborators
        expect(subject).to permit_action :show_collaborators
        expect(subject).to permit_action :update_collaborators
        expect(subject).to permit_action :destroy_collaborators

        expect(subject).to permit_action :create_assets
        expect(subject).to permit_action :show_assets
        expect(subject).to permit_action :update_assets
        expect(subject).to permit_action :destroy_assets
      end
    end

    context 'for protected decks' do
      let(:deck) { build :deck, :state => :protected_access }
      let(:user) { deck.owner }
      it 'should permit everything' do
        expect(subject).to permit_action :show
        expect(subject).to permit_action :update
        expect(subject).to permit_action :destroy

        expect(subject).to permit_action :show_owner
        expect(subject).to permit_action :update_owner
        expect(subject).to forbid_action :destroy_owner

        expect(subject).to permit_action :create_collaborators
        expect(subject).to permit_action :show_collaborators
        expect(subject).to permit_action :update_collaborators
        expect(subject).to permit_action :destroy_collaborators

        expect(subject).to permit_action :create_assets
        expect(subject).to permit_action :show_assets
        expect(subject).to permit_action :update_assets
        expect(subject).to permit_action :destroy_assets
      end
    end

    context 'for private decks' do
      let(:deck) { build :deck, :state => :private_access }
      let(:user) { deck.owner }
      it 'should permit everything' do
        expect(subject).to permit_action :show
        expect(subject).to permit_action :update
        expect(subject).to permit_action :destroy

        expect(subject).to permit_action :show_owner
        expect(subject).to permit_action :update_owner
        expect(subject).to forbid_action :destroy_owner

        expect(subject).to permit_action :create_collaborators
        expect(subject).to permit_action :show_collaborators
        expect(subject).to permit_action :update_collaborators
        expect(subject).to permit_action :destroy_collaborators

        expect(subject).to permit_action :create_assets
        expect(subject).to permit_action :show_assets
        expect(subject).to permit_action :update_assets
        expect(subject).to permit_action :destroy_assets
      end
    end
  end
end
