# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'assets routing', :type => :routing do
  it 'routes assets endpoint' do
    route = '/api/decks/foo/assets'
    params = { :deck_id => 'foo', :relationship => 'assets', :source => 'api/decks' }

    expect(:get => route).to route_to 'api/assets#get_related_resources', params
    expect(:post => route).to route_to 'api/assets#create', :deck_id => 'foo'
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:delete => route).not_to be_routable
  end

  it 'routes asset endpoint' do
    route = '/api/decks/foo/assets/bar'
    params = { :id => 'bar', :deck_id => 'foo' }

    expect(:get => route).to route_to 'api/assets#show', params
    expect(:patch => route).to route_to 'api/assets#update', params
    expect(:put => route).to route_to 'api/assets#update', params
    expect(:post => route).not_to be_routable
    expect(:delete => route).to route_to 'api/assets#destroy', params
  end
end
