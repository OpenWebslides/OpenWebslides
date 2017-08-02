# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TokenResource, :type => :resource do
  it 'should be abstract' do
    expect(described_class.abstract).to be true
  end

  describe 'fields' do
    it 'should have a valid set of fields' do
      expect(described_class.fields).to match_array %i[id email password]
    end

    it 'should have a valid set of creatable fields' do
      expect(described_class.creatable_fields).to match_array %i[email password]
    end
  end
end
