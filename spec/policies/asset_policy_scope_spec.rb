# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AssetPolicy::Scope do
  subject { described_class.new(user, Asset).resolve }

  include_context 'policy_sample'

  context 'for a guest' do
    let(:user) { nil }

    it 'should show assets of all public decks' do
      expect(subject.count).to eq 12
    end
  end

  context 'for user 1' do
    let(:user) { User.find_by :first_name => 'user1' }

    it 'should show assets of public, protected, owned and collaborated decks' do
      expect(subject.count).to eq 36
    end
  end

  context 'for user 2' do
    let(:user) { User.find_by :first_name => 'user2' }

    it 'should show assets of public, protected, owned and collaborated decks' do
      expect(subject.count).to eq 36
    end
  end

  context 'for user 3' do
    let(:user) { User.find_by :first_name => 'user3' }

    it 'should show assets of public, protected, owned and collaborated decks' do
      expect(subject.count).to eq 36
    end
  end

  context 'for user 4' do
    let(:user) { User.find_by :first_name => 'user4' }

    it 'should show assets of public, protected, owned and collaborated decks' do
      expect(subject.count).to eq 27
    end
  end
end
