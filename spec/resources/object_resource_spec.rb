# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ObjectResource, :type => :resource do
  it 'is abstract' do
    expect(described_class.abstract).to be true
  end
end
