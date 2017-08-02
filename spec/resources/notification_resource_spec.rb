# frozen_string_literal: true

require 'rails_helper'

RSpec.describe NotificationResource, :type => :resource do
  let(:notification) { create :notification }
  let(:context) { {} }

  subject { described_class.new notification, context }

  it { is_expected.to have_primary_key :id }

  it { is_expected.to have_attribute :event_type }
  it { is_expected.to have_attribute :created_at }
  it { is_expected.to have_attribute :deck_name }
  it { is_expected.to have_attribute :user_name }

  it { is_expected.to have_one(:user) }
  it { is_expected.to have_one(:deck) }

  describe 'fields' do
    it 'should have a valid set of fetchable fields' do
      expect(subject.fetchable_fields).to match_array %i[id event_type created_at deck_name user_name deck user]
    end

    it 'should have a valid set of sortable fields' do
      expect(described_class.sortable_fields context).to match_array %i[created_at]
    end

    it 'should sort on descending :created_at by default' do
      expect(described_class.default_sort.first[:field]).to eq 'created_at'
      expect(described_class.default_sort.first[:direction]).to eq :desc
    end
  end

  describe 'filters' do
    it 'should have a valid set of filters' do
      expect(described_class.filters.keys).to match_array %i[id event_type deck user]
    end
  end
end
