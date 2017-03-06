# frozen_string_literal: true
require 'rails_helper'

RSpec.describe UserPolicy do
  subject { described_class }

  permissions :show?, :create? do
    it 'allow everyone read and create access' do
      user1 = build :user
      user2 = build :user

      expect(subject).to permit nil, user1
      expect(subject).to permit user1, user1
      expect(subject).to permit user2, user1
    end
  end

  permissions :update?, :destroy? do
    it 'allow user to update and destroy his/her own account' do
      user1 = build :user
      user2 = build :user

      expect(subject).not_to permit nil, user1
      expect(subject).not_to permit user2, user1
      expect(subject).to permit user1, user1
    end
  end
end
