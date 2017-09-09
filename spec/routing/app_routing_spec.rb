# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'app routing', :type => :routing do
  it 'does not route root' do
    expect(:get => '/').not_to be_routable
  end

  it 'routes api root' do
    expect(:get => '/api').to route_to 'application#version'
  end
end
