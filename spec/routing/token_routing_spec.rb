# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'token routing', :type => :routing do
  it 'routes token endpoint' do
    route = '/api/token'

    expect(:get => route).not_to be_routable
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:post => route).to route_to 'token#create'
    expect(:delete => route).to route_to 'token#destroy'
  end
end
