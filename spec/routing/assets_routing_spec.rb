# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'assets routing', :type => :routing do
  it 'routes assets endpoint' do
    route = '/api/assets'

    expect(:get => route).not_to be_routable
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:post => route).to route_to 'api/assets#create'
    expect(:delete => route).not_to be_routable
  end

  it 'routes asset endpoint' do
    route = '/api/assets/foo'

    expect(:get => route).to route_to 'api/assets#show', :id => 'foo'
    expect(:patch => route).to route_to 'api/assets#update', :id => 'foo'
    expect(:put => route).to route_to 'api/assets#update', :id => 'foo'
    expect(:post => route).not_to be_routable
    expect(:delete => route).to route_to 'api/assets#destroy', :id => 'foo'
  end

  it 'routes asset deck relationship endpoint' do
    route = '/api/assets/foo/relationships/deck'
    params = { :asset_id => 'foo', :relationship => 'deck' }

    expect(:get => '/api/assets/foo/deck').to route_to 'api/decks#get_related_resource', params.merge(:source => 'api/assets')

    expect(:get => route).to route_to 'api/assets#show_relationship', params
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:post => route).not_to be_routable
    expect(:delete => route).not_to be_routable
  end
end
