# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SecretResource, :type => :resource do
  describe 'fields' do
    it 'should have a valid set of creatable fields' do
      expect(described_class.creatable_fields).to be_empty
    end
  end
end
