# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'jwt' do
  let(:user) { create :user }

  describe 'versioned token' do
    let(:valid_token) { Knock::AuthToken.new :payload => user.to_token_payload }
    let(:invalid_token) { Knock::AuthToken.new :payload => user.to_token_payload.merge(:ver => 2) }

    it 'is valid' do
      entity = Knock::AuthToken.new(:token => valid_token.instance_variable_get(:@token)).entity_for User

      expect(entity).not_to be_nil
      expect(entity).to eq entity
    end

    it 'is invalid' do
      entity = Knock::AuthToken.new(:token => invalid_token.instance_variable_get(:@token)).entity_for User

      expect(entity).to be_nil
    end
  end
end
