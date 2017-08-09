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
end
