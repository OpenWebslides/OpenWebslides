# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AnnotationPolicy::Scope do
  subject { described_class.new(user, Annotation).resolve }

  include_context 'policy_sample'

  context 'for a guest' do
    let(:user) { nil }

    it 'should show annotations of all public decks' do
      expect(subject.count).to eq 12
    end
  end

  context 'for user 1' do
    let(:user) { User.find_by :first_name => 'user1' }

    it 'should show annotations of public, protected, owned and collaborated decks' do
      expect(subject.count).to eq 36
    end
  end

  context 'for user 2' do
    let(:user) { User.find_by :first_name => 'user2' }

    it 'should show annotations of public, protected, owned and collaborated decks' do
      expect(subject.count).to eq 36
    end
  end

  context 'for user 3' do
    let(:user) { User.find_by :first_name => 'user3' }

    it 'should show annotations of public, protected, owned and collaborated decks' do
      expect(subject.count).to eq 36
    end
  end

  context 'for user 4' do
    let(:user) { User.find_by :first_name => 'user4' }

    it 'should show annotations of public, protected, owned and collaborated decks' do
      expect(subject.count).to eq 27
    end
  end

  describe 'secret annotations' do
    let(:annotation) { build :conversation }

    before { annotation.protect }

    context 'for a guest' do
      let(:user) { nil }

      it 'does not includes the secret annotation' do
        expect(subject).not_to include annotation
      end
    end

    context 'for another user' do
      let(:user) { build :user }

      it 'does not includes the secret annotation' do
        expect(subject).not_to include annotation
      end
    end

    context 'for an owner' do
      let(:user) { annotation.user }

      it 'includes the secret annotation' do
        expect(subject).to include annotation
      end
    end
  end
end
