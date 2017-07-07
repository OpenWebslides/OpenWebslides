# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'confirmation routing', :type => :routing do
  it 'routes confirmation endpoint' do
    route = '/api/confirmation'

    expect(:get => route).not_to be_routable
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:post => route).to route_to 'api/confirmation#create'
    expect(:delete => route).not_to be_routable
  end
end
