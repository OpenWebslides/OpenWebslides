# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::ConfirmationResource, :type => :resource do
  it 'should be abstract' do
    expect(described_class.abstract).to be true
  end

  describe 'fields' do
    it 'should have a valid set of fields' do
      expect(described_class.fields).to match_array %i[id confirmation_token]
    end

    it 'should have a valid set of creatable fields' do
      expect(described_class.creatable_fields).to match_array %i[confirmation_token]
    end
  end
end
