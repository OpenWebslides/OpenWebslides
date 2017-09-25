# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ItemResource, :type => :resource do
  it 'is abstract' do
    expect(described_class.abstract).to be true
  end
end
