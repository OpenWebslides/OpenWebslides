# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Annotations::Rating, :type => :model do
  describe 'associations' do
    it { is_expected.to belong_to(:user).inverse_of(:ratings) }
    it { is_expected.to belong_to(:annotation).inverse_of(:ratings) }
  end
end
