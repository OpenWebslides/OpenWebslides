# frozen_string_literal: true

require 'rails_helper'

RSpec.describe NotificationResource, :type => :resource do
  let(:notification) { create :notification }
  let(:context) { {} }

  subject { described_class.new notification, context }

  it { is_expected.to have_primary_key :id }

  it { is_expected.to have_attribute :predicate }
  it { is_expected.to have_attribute :subject_display_name }
  it { is_expected.to have_attribute :item_display_name }

  it { is_expected.to have_one(:subject) }
  it { is_expected.to have_one(:item) }

  describe 'fields' do
    it 'should have a valid set of fetchable fields' do
      expect(subject.fetchable_fields).to match_array %i[id predicate subject_display_name item_display_name subject item]
    end

    it 'should have a valid set of sortable fields' do
      expect(described_class.sortable_fields context).to match_array %i[created_at]
    end

    it 'should sort on descending :created_at by default' do
      expect(described_class.default_sort.first[:field]).to eq 'created_at'
      expect(described_class.default_sort.first[:direction]).to eq :desc
    end

    it { is_expected.to respond_to :meta }
  end

  describe 'filters' do
    it 'should have a valid set of filters' do
      expect(described_class.filters.keys).to match_array %i[id predicate subject item]
    end
  end
end
