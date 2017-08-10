# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Annotations::Comment, :type => :model do
  describe 'attributes' do
    it { is_expected.not_to allow_value(nil).for(:text) }
    it { is_expected.not_to allow_value('').for(:text) }
  end

  describe 'associations' do
    it { is_expected.to belong_to(:conversation).inverse_of(:comments) }
  end

  describe 'scope' do
    let(:conversation) { create :conversation }

    it 'deck must be equal to its parent conversation' do
      comment = build :comment,
                      :conversation => conversation,
                      :deck => create(:deck),
                      :content_item_id => conversation.content_item_id

      expect(comment).not_to be_valid
    end

    it 'content_item_id must be equal to its parent conversation' do
      comment = build :comment,
                      :conversation => conversation,
                      :deck => conversation.deck,
                      :content_item_id => Faker::Number.number(2)

      expect(comment.content_item_id).not_to eq comment.conversation.content_item_id

      expect(comment).not_to be_valid
    end

    it 'is equal to its parent conversation' do
      comment = build :comment,
                      :conversation => conversation,
                      :deck => conversation.deck,
                      :content_item_id => conversation.content_item_id

      expect(comment).to be_valid
    end
  end
end
