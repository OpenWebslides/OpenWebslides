# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Identity, :type => :model do
  describe 'attributes' do
    it { is_expected.not_to allow_value(nil).for(:uid) }
    it { is_expected.not_to allow_value('').for(:uid) }

    it { is_expected.not_to allow_value(nil).for(:provider) }
    it { is_expected.not_to allow_value('').for(:provider) }

    it 'is valid with attributes' do
      expect(build :identity, :with_user).to be_valid
    end

    it 'is invalid without attributes' do
      expect(Identity.new).not_to be_valid
      expect(Identity.new :uid => 'foo').not_to be_valid
      expect(Identity.new :provider => 'foo').not_to be_valid
    end
  end

  describe 'associations' do
    it { is_expected.to belong_to(:user) }
  end
end
