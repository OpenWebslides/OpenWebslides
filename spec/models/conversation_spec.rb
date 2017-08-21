# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Conversation, :type => :model do
  describe 'attributes' do
    it { is_expected.not_to allow_value(nil).for(:title) }
    it { is_expected.not_to allow_value('').for(:title) }

    it { is_expected.not_to allow_value(nil).for(:text) }
    it { is_expected.not_to allow_value('').for(:text) }

    it { is_expected.not_to allow_value(nil).for(:conversation_type) }
    it { is_expected.not_to allow_value('').for(:conversation_type) }
  end

  describe 'associations' do
    it { is_expected.to have_many(:comments).dependent(:destroy).inverse_of(:conversation) }
  end
end
