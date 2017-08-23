# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CommentResource, :type => :resource do
  let(:comment) { create :comment }
  let(:context) { {} }

  subject { described_class.new comment, context }

  it { is_expected.to have_primary_key :id }

  it { is_expected.to have_attribute :content_item_id }
  it { is_expected.to have_attribute :text }

  it { is_expected.to have_one :user }
  it { is_expected.to have_one :deck }
  it { is_expected.to have_one :conversation }

  describe 'fields' do
    it 'should have a valid set of fetchable fields' do
      expect(subject.fetchable_fields).to match_array %i[id content_item_id user deck text conversation rating rated secret edited flagged deleted]
    end

    context 'hidden state' do
      before { comment.hide }

      it 'should have a valid set of fetchable fields' do
        expect(subject.fetchable_fields).to match_array %i[id content_item_id user deck conversation rating rated secret edited flagged deleted]
      end
    end

    it 'should have a valid set of creatable fields' do
      expect(described_class.creatable_fields).to match_array %i[content_item_id user deck text conversation]
    end

    it 'should have a valid set of updatable fields' do
      expect(described_class.updatable_fields).to match_array %i[text]
    end

    it 'should have a valid set of sortable fields' do
      expect(described_class.sortable_fields context).to match_array %i[id content_item_id text rating rated secret edited flagged deleted]
    end
  end

  describe 'filters' do
    it 'should have a valid set of filters' do
      expect(described_class.filters.keys).to match_array %i[id user content_item_id rated]
    end
  end
end
