# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UppercaseValueFormatter do
  let(:word) { Faker::Lorem.word }

  it 'uppercases' do
    expect(described_class.format word).to eq word.upcase
  end

  it 'downcasses' do
    expect(described_class.unformat word.upcase).to eq word
  end
end
