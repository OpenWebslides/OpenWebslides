# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ConversionResource, :type => :resource do
  let(:conversion) { create :conversion }
  let(:context) { {} }

  before do
    mock_method ConversionWorker, :perform
  end

  subject { described_class.new conversion, context }

  it { is_expected.to have_primary_key :id }

  it { is_expected.to have_attribute :name }
  it { is_expected.to have_attribute :status }
  it { is_expected.to have_attribute :created_at }

  it { is_expected.to have_one(:user) }
  it { is_expected.to have_one(:deck) }

  describe 'fields' do
    it 'should have a valid set of fetchable fields' do
      expect(subject.fetchable_fields).to match_array %i[id name status created_at user deck]
    end

    it 'should have a valid set of creatable fields' do
      expect(described_class.creatable_fields).to be_empty
    end
  end

  describe 'filters' do
    it 'should have a valid set of filters' do
      expect(described_class.filters.keys).to match_array %i[id status]
    end
  end
end
