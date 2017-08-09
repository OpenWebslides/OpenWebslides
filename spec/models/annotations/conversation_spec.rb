# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Annotations::Conversation, :type => :model do
  describe 'attributes' do
    it { is_expected.not_to allow_value(nil).for(:text) }
    it { is_expected.not_to allow_value('').for(:text) }
  end

  describe 'associations' do
    it { is_expected.to have_many(:comments).inverse_of(:conversation) }
  end
end
