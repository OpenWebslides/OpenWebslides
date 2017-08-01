# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AssetToken, :type => :model do
  let(:user) { create :user, :confirmed }
  let(:asset) { create :asset, :with_deck }

  let(:lifetime) { OpenWebslides.config.api.asset_url_lifetime.hours.from_now.to_i }

  let(:token) do
    token = AssetToken.new
    token.subject = user
    token.object = asset

    token
  end

  describe 'properties' do
    it 'has an object' do
      expect(token).to respond_to :object
      expect(token.subject).to eq user
    end
  end

  describe 'valid?' do
    it 'is invalid without object' do
      jwt = token.to_jwt

      t = AssetToken.from_token jwt
      t.object = nil

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

    let(:token) { AssetToken.from_token jwt }

    it 'matches object' do
      expect(token.object.id).to eq asset.id
    end
  end
end
