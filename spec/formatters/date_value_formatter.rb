# frozen_string_literal: true

require 'rails_helper'

RSpec.describe DateValueFormatter do
  let(:date) { Time.zone.at 1234567890 }
  it 'formats' do
    expect(described_class.format date).to eq '1234567890'
  end

  it 'unformats' do
    expect(described_class.unformat 1234567890).to eq date
  end
end
