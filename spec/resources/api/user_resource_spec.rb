# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::UserResource, :type => :resource do
  let(:user) { create :user }
  let(:context) { {} }

  subject { described_class.new user, context }

  it { is_expected.to have_primary_key :id }

  it { is_expected.to have_attribute :name }
  it { is_expected.not_to have_attribute :email }

  it { is_expected.to have_many(:decks).with_class_name 'Deck' }
  it { is_expected.to have_many(:contributions).with_class_name 'Deck' }

  describe 'fields' do
    context 'for a guest' do
      it 'should have a valid set of fetchable fields' do
        expect(subject.fetchable_fields).to match_array %i[id name decks contributions]
      end
    end

    context 'for a member' do
      let(:context) { { :current_user => user } }
      it 'should have a valid set of fetchable fields' do
        expect(subject.fetchable_fields).to match_array %i[id name email decks contributions]
      end
    end

    it 'should have a valid set of creatable fields' do
      expect(described_class.creatable_fields).to match_array %i[name email password]
    end

    it 'should have a valid set of updatable fields' do
      expect(described_class.updatable_fields).to match_array %i[name password]
    end

    it 'should have a valid set of sortable fields' do
      expect(described_class.sortable_fields context).to match_array %i[id name email]
    end

    it 'should have a valid set of filterable fields' do
      expect(described_class.filters.keys).to match_array %i[id name email]
    end
  end
end
