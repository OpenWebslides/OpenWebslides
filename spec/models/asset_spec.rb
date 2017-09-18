# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Asset, :type => :model do
  let(:asset) { Asset.new :filename => 'asset.png', :deck => build(:deck) }

  it 'has attributes' do
    expect(asset).to respond_to :filename
    expect(asset).to respond_to :deck
  end
end
