# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Annotations::Annotation, :type => :model do
  describe 'attributes' do
    it { is_expected.not_to allow_value(nil).for(:content_item_id) }
    it { is_expected.not_to allow_value('').for(:content_item_id) }
  end

  describe 'associations' do
    it { is_expected.to belong_to(:user).inverse_of(:annotations) }
    it { is_expected.to belong_to(:deck).inverse_of(:annotations) }
  end
end
