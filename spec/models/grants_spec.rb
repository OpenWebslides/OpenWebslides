# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Grant, :type => :model do
  let(:deck) { build :deck }
  let(:user) { build :user }

  describe 'associations' do
    it 'belongs to a user' do
      expect(deck.owner).to be_instance_of User
    end

    it 'belongs to a deck' do
      expect(deck.owner).to be_instance_of User
    end
  end
end
