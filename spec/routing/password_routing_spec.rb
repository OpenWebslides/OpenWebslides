# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'password routing', :type => :routing do
  it 'routes password endpoint' do
    route = '/api/password'

    expect(:get => route).not_to be_routable
    expect(:patch => route).to route_to 'api/password#update'
    expect(:put => route).to route_to 'api/password#update'
    expect(:post => route).to route_to 'api/password#create'
    expect(:delete => route).not_to be_routable
  end
end
