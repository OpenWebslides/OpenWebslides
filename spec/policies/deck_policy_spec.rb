# frozen_string_literal: true

require 'rails_helper'

RSpec.describe DeckPolicy do
  subject { described_class.new user, deck }

  let(:deck) { build :deck, :state => :public_access }

  context 'for a guest' do
    let(:user) { nil }

    it 'should permit :index' do
      expect(subject).to permit_action :index
    end

    it 'should not permit :create' do
      expect(subject).to forbid_action :create
    end

    context 'for public decks' do
      let(:deck) { build :deck, :state => :public_access }
      it 'should permit only :show on public decks' do
        expect(subject).to permit_action :show
        expect(subject).to forbid_action :update
        expect(subject).to forbid_action :destroy
      end
    end

    context 'for protected decks' do
      let(:deck) { build :deck, :state => :protected_access }
      it 'should not permit anything on protected decks' do
        expect(subject).to forbid_action :show
        expect(subject).to forbid_action :update
        expect(subject).to forbid_action :destroy
      end
    end

    context 'for private decks' do
      let(:deck) { build :deck, :state => :private_access }
      it 'should not permit anything on private decks' do
        expect(subject).to forbid_action :show
        expect(subject).to forbid_action :update
        expect(subject).to forbid_action :destroy
      end
    end
  end

  context 'for a member' do
    let(:user) { build :user }

    it 'should permit :index' do
      expect(subject).to permit_action :index
    end

    it 'should permit :create' do
      expect(subject).to permit_action :create
    end

    context 'for public decks' do
      let(:deck) { build :deck, :state => :public_access }
      it 'should permit only :show on public decks' do
        expect(subject).to permit_action :show
        expect(subject).to forbid_action :update
        expect(subject).to forbid_action :destroy
      end
    end

    context 'for protected decks' do
      let(:deck) { build :deck, :state => :protected_access }
      it 'should permit only :show on protected decks' do
        expect(subject).to permit_action :show
        expect(subject).to forbid_action :update
        expect(subject).to forbid_action :destroy
      end
    end

    context 'for private decks' do
      let(:deck) { build :deck, :state => :private_access }
      it 'should not permit anything on private decks' do
        expect(subject).to forbid_action :show
        expect(subject).to forbid_action :update
        expect(subject).to forbid_action :destroy
      end
    end
  end

  context 'for a contributor' do
    let(:user) { build :user, :with_decks }

    it 'should permit :index' do
      expect(subject).to permit_action :index
    end

    it 'should permit :create' do
      expect(subject).to permit_action :create
    end

    context 'for public decks' do
      let(:deck) { build :deck, :with_contributors, :state => :public_access }
      let(:user) { deck.contributors.first }
      it 'should permit anything but destroy on public decks' do
        expect(subject).to permit_action :show
        expect(subject).to permit_action :update
        expect(subject).to forbid_action :destroy
      end
    end

    context 'for protected decks' do
      let(:deck) { build :deck, :with_contributors, :state => :protected_access }
      let(:user) { deck.contributors.first }
      it 'should permit anything but destroy on protected decks' do
        expect(subject).to permit_action :show
        expect(subject).to permit_action :update
        expect(subject).to forbid_action :destroy
      end
    end

    context 'for private decks' do
      let(:deck) { build :deck, :with_contributors, :state => :private_access }
      let(:user) { deck.contributors.first }
      it 'should permit anything but destroy on private decks' do
        expect(subject).to permit_action :show
        expect(subject).to permit_action :update
        expect(subject).to forbid_action :destroy
      end
    end
  end

  context 'for an owner' do
    let(:user) { build :user, :with_decks }

    it 'should permit :index' do
      expect(subject).to permit_action :index
    end

    it 'should permit :create' do
      expect(subject).to permit_action :create
    end

    context 'for public decks' do
      let(:deck) { build :deck, :state => :public_access }
      let(:user) { deck.owner }
      it 'should permit anything on public decks' do
        expect(subject).to permit_action :show
        expect(subject).to permit_action :update
        expect(subject).to permit_action :destroy
      end
    end

    context 'for protected decks' do
      let(:deck) { build :deck, :state => :protected_access }
      let(:user) { deck.owner }
      it 'should permit anything on protected decks' do
        expect(subject).to permit_action :show
        expect(subject).to permit_action :update
        expect(subject).to permit_action :destroy
      end
    end

    context 'for private decks' do
      let(:deck) { build :deck, :state => :private_access }
      let(:user) { deck.owner }
      it 'should permit anything on private decks' do
        expect(subject).to permit_action :show
        expect(subject).to permit_action :update
        expect(subject).to permit_action :destroy
      end
    end
  end
end

RSpec.describe DeckPolicy::Scope do
  subject { described_class.new(user, Deck).resolve }

  context 'for a guest' do
    let(:user) { nil }

    it 'should show all public decks' do
      expect(subject.pluck :name).to match_array %w[u1d1 u2d1 u3d1 u4d1]
    end
  end

  context 'for user 1' do
    let(:user) { User.find_by :first_name => 'user1' }

    it 'should show public, protected, owned and contributed decks' do
      expect(subject.pluck :name).to match_array %w[u1d1 u1d2 u1d3 u1d4 u2d1 u2d2 u2d4 u3d1 u3d2 u3d4 u4d1 u4d2]
    end
  end

  context 'for user 2' do
    let(:user) { User.find_by :first_name => 'user2' }

    it 'should show public, protected, owned and contributed decks' do
      expect(subject.pluck :name).to match_array %w[u1d1 u1d2 u1d4 u2d1 u2d2 u2d3 u2d4 u3d1 u3d2 u3d4 u4d1 u4d2]
    end
  end

  context 'for user 3' do
    let(:user) { User.find_by :first_name => 'user3' }

    it 'should show public, protected, owned and contributed decks' do
      expect(subject.pluck :name).to match_array %w[u1d1 u1d2 u1d4 u2d1 u2d2 u2d4 u3d1 u3d2 u3d3 u3d4 u4d1 u4d2]
    end
  end

  context 'for user 4' do
    let(:user) { User.find_by :first_name => 'user4' }

    it 'should show public, protected, owned and contributed decks' do
      expect(subject.pluck :name).to match_array %w[u1d1 u1d2 u2d1 u2d2 u3d1 u3d2 u4d1 u4d2 u4d3]
    end
  end
end
