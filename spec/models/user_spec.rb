# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, :type => :model do
  let(:user) { create :user }
  let(:confirmed_user) { create :user, :confirmed }

  describe 'attributes' do
    it { is_expected.not_to allow_value(nil).for(:first_name) }
    it { is_expected.not_to allow_value('').for(:first_name) }

    it { is_expected.not_to allow_value(nil).for(:email) }
    it { is_expected.not_to allow_value('').for(:email) }
    it { is_expected.not_to allow_value('foo').for(:email) }
    it { is_expected.not_to allow_value('foo@bar@baz').for(:email) }
    it { is_expected.not_to allow_value('foo@').for(:email) }
    it { is_expected.not_to allow_value('@bar').for(:email) }

    it { is_expected.not_to allow_value(nil).for(:password) }
    it { is_expected.not_to allow_value('').for(:password) }

    it { is_expected.not_to allow_value(nil).for(:token_version) }
    it { is_expected.not_to allow_value('').for(:token_version) }
    it { is_expected.not_to allow_value('foo').for(:token_version) }
    it { is_expected.to allow_value(0).for(:token_version) }

    it { is_expected.not_to allow_value(nil).for(:tos_accepted) }
    it { is_expected.not_to allow_value('').for(:tos_accepted) }
    it { is_expected.not_to allow_value(false).for(:tos_accepted) }
    it { is_expected.to allow_value(true).for(:tos_accepted) }
    it { is_expected.to allow_value('foo').for(:tos_accepted) }
    it { is_expected.not_to allow_value('false').for(:tos_accepted) }

    it { is_expected.not_to allow_value(nil).for(:password) }
    it { is_expected.not_to allow_value('').for(:password) }
    it { is_expected.not_to allow_value('abc12').for(:password) }
    it { is_expected.to allow_value('abc123').for(:password) }

    it 'is invalid without attributes' do
      expect(User.new).not_to be_valid
    end

    it 'is valid with valid attributes' do
      expect(build :user).to be_valid
    end

    it 'is not valid when terms are not accepted' do
      expect(build :user, :tos_accepted => false).not_to be_valid
    end

    it 'rejects changes to email' do
      # The readonly_email callback only triggers on :update, so the record has to be persisted
      expect(user).to be_valid

      user.email = 'bar@foo'
      expect(user).not_to be_valid
      user.destroy
    end

    it 'invalidates tokens on password change' do
      token_version = user.token_version

      user.update :password => 'abcd1234'
      expect(user.token_version).to eq token_version + 1
    end

    it 'increments token version' do
      token_version = user.token_version

      user.increment_token_version!
      expect(user.token_version).to eq token_version + 1
    end

    it 'returns a correct full name' do
      expect(build(:user, :first_name => 'foo', :last_name => nil).name).to eq 'foo'
      expect(build(:user, :first_name => 'foo', :last_name => '').name).to eq 'foo'
      expect(build(:user, :first_name => 'foo', :last_name => 'bar').name).to eq 'foo bar'
    end
  end

  describe 'associations' do
    it { is_expected.to have_many(:identities).dependent(:destroy) }
    it { is_expected.to have_many(:decks).dependent(:destroy).inverse_of(:user) }
    it { is_expected.to have_many(:conversions).dependent(:destroy).inverse_of(:user) }
    it { is_expected.to have_many(:grants).dependent(:destroy) }
    it { is_expected.to have_many(:collaborations).through(:grants).inverse_of(:collaborators) }
    it { is_expected.to have_many(:notifications).dependent(:destroy).inverse_of(:user) }
    it { is_expected.to have_many(:annotations).dependent(:destroy).inverse_of(:user) }
    it { is_expected.to have_many(:ratings).dependent(:destroy).inverse_of(:user) }
  end

  it 'finds confirmed users by token' do
    result = User.find_by_token :id => confirmed_user.id, :token_version => confirmed_user.token_version
    expect(result).to eq confirmed_user
  end

  it 'does not find unconfirmed users by token' do
    result = proc { User.find_by_token :id => user.id, :token_version => user.token_version }

    expect(result).to raise_error JSONAPI::Exceptions::UnconfirmedError
  end
end
