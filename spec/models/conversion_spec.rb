# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Conversion, :type => :model do
  describe 'attributes' do
    it { is_expected.not_to allow_value(nil).for(:filename) }
    it { is_expected.not_to allow_value('').for(:filename) }

    it { is_expected.not_to allow_value(nil).for(:name) }
    it { is_expected.not_to allow_value('').for(:name) }

    it { is_expected.not_to allow_value(nil).for(:status) }
    it { is_expected.not_to allow_value('').for(:status) }

    it 'is invalid without attributes' do
      expect(Conversion.new).not_to be_valid
    end

    it 'is valid with attributes' do
      expect(build :conversion).to be_valid
    end

    it 'has a valid :event_type enum' do
      expect(%w[queued processing success error]).to eq Conversion.statuses.keys
    end
  end

  describe 'associations' do
    it { is_expected.to belong_to(:deck).inverse_of(:conversion) }
    it { is_expected.to belong_to(:user).inverse_of(:conversions) }
  end
end
