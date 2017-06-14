# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::AssetResource, :type => :resource do
  let(:asset) { create :asset }
  let(:context) { {} }

  subject { described_class.new asset, context }

  it { is_expected.to have_primary_key :id }

  it { is_expected.to have_attribute :filename }

  it { is_expected.to have_one :deck }

  describe 'fields' do
    it 'should have a valid set of fetchable fields' do
      expect(subject.fetchable_fields).to match_array %i[id filename deck]
    end

    it 'should have a valid set of creatable fields' do
      expect(described_class.creatable_fields).to match_array %i[filename deck]
    end

    it 'should have a valid set of updatable fields' do
      expect(described_class.updatable_fields).to be_empty
    end

    it 'should have a valid set of sortable fields' do
      expect(described_class.sortable_fields context).to match_array %i[id filename]
    end
  end
end
