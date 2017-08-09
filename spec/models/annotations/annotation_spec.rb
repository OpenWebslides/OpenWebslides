# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Annotations::Annotation, :type => :model do
  describe 'associations' do
    it { is_expected.to belong_to(:user).inverse_of(:annotations) }
    it { is_expected.to belong_to(:deck).inverse_of(:annotations) }
  end
end
