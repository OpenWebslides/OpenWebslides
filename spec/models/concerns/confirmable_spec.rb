# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User do
  let(:subject) { build :user }

  context 'for a non-persisted user' do
    it 'responds to the correct methods' do
      expect(subject).to respond_to :confirm
      expect(subject).to respond_to :confirmed?
    end
  end

  context 'for a persisted user' do
    before(:each) { subject.save! }

    it 'has a confirmation token' do
      expect(subject.confirmation_token).not_to be_nil
    end

    it 'is not confirmed' do
      expect(subject.confirmed?).to be false
    end

    it 'can be confirmed by calling confirm' do
      subject.confirm
      expect(subject.confirmed?).to be true
    end

    it 'can be confirmed using a valid token' do
      expect(subject.confirmed?).to be false

      expect(described_class.confirm_by_token subject.confirmation_token).to be true

      # Don't check the cached version
      subject.reload

      expect(subject.confirmed?).to be true
    end

    it 'cannot be confirmed using an invalid token' do
      expect(subject.confirmed?).to be false

      expect(described_class.confirm_by_token 'foo').to be false
      expect(subject.confirmed?).to be false
    end
  end
end
