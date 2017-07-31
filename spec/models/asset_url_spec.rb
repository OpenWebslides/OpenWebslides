# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AssetToken, :type => :model do
  let(:user) { create :user, :confirmed }
  let(:asset) { create :asset }

  let(:lifetime) { OpenWebslides.config.api.asset_url_lifetime.hours.from_now.to_i }

  let(:token) do
    token = AssetToken.new
    token.subject = user
    token.object = asset

    token
  end

  describe 'properties' do
    it 'has an expiration' do
      expect(token).to respond_to :expiration
      expect(token.expiration).to be_nil
    end

    it 'has a subject' do
      expect(token).to respond_to :subject
      expect(token.subject).to eq user
    end

    it 'has an object' do
      expect(token).to respond_to :object
      expect(token.subject).to eq user
    end
  end

  describe 'valid?' do
    it 'is invalid without subject' do
      jwt = token.to_jwt

      user.destroy

      t = AssetToken.from_jwt jwt

      expect(t).not_to be_valid
    end

    it 'is invalid without subject 2' do
      t = AssetToken.from_jwt token.to_jwt

      user.destroy

      expect(t).not_to be_valid
    end

    it 'is invalid on past date' do
      token.expiration = 1.second.ago.to_i

      t = AssetToken.from_jwt token.to_jwt

      expect(t).not_to be_valid
    end

    it 'is invalid after expiry date' do
      token.expiration = Time.now.to_i
      sleep 2

      t = AssetToken.from_jwt token.to_jwt

      expect(t).not_to be_valid
    end
  end

  describe 'from token' do
    let(:jwt) do
      payload = {
        :exp => lifetime,
        :sub => user.id,
        :obj => asset.id
      }
      JWT.encode payload, Rails.application.secrets.secret_key_base
    end

    let(:token) { AssetToken.from_jwt jwt }

    it 'matches expiration' do
      expect(token.expiration).to eq lifetime
    end

    it 'matches subject' do
      expect(token.subject.id).to eq user.id
    end

    it 'matches object' do
      expect(token.object.id).to eq asset.id
    end
  end
end
