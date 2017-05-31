# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::DeckResource, :type => :resource do
  let(:deck) { create :deck }
  let(:context) { {} }

  let(:nil_deck) { create :deck, :description => nil }

  subject { described_class.new deck, context }

  it { is_expected.to have_primary_key :id }

  it { is_expected.to have_attribute :name }
  it { is_expected.to have_attribute :state }

  it { is_expected.to have_one :owner }

  it { is_expected.to have_many(:collaborators).with_class_name 'User' }

  describe 'fields' do
    it 'should have a valid set of fetchable fields' do
      expect(subject.fetchable_fields).to match_array %i[id name state description template owner collaborators]
    end

    it 'should omit empty fields' do
      subject { described_class.new nil_deck, context }
      expect(subject.fetchable_fields).to match_array %i[id name state description template owner collaborators]
    end

    it 'should have a valid set of creatable fields' do
      expect(described_class.creatable_fields).to match_array %i[name state description template owner]
    end

    it 'should have a valid set of updatable fields' do
      expect(described_class.updatable_fields).to match_array %i[name state description template owner]
    end

    it 'should have a valid set of sortable fields' do
      expect(described_class.sortable_fields context).to match_array %i[id name state description template]
    end
  end

  describe 'filters' do
    it 'should have a valid set of filters' do
      expect(described_class.filters.keys).to match_array %i[id name state description]
    end

    let(:verify) { described_class.filters[:state][:verify] }

    it 'should verify state' do
      expect(verify.call(%w[public_access foo protected_access private_access bar], {}))
        .to match_array %w[public_access protected_access private_access]
    end
  end
end
