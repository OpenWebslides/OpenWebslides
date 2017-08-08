# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'conversions routing', :type => :routing do
  it 'routes conversions endpoint' do
    route = '/api/conversions'

    expect(:get => route).not_to be_routable
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:post => route).to route_to 'conversions#create'
    expect(:delete => route).not_to be_routable
  end

  it 'routes conversion endpoint' do
    route = '/api/conversions/foo'

    expect(:get => route).to route_to 'conversions#show', :id => 'foo'
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:post => route).not_to be_routable
    expect(:delete => route).not_to be_routable
  end

  it 'routes conversion deck relationship endpoint' do
    route = '/api/conversions/foo/relationships/deck'
    params = { :conversion_id => 'foo', :relationship => 'deck' }

    expect(:get => '/api/conversions/foo/deck').to route_to 'decks#get_related_resource', params.merge(:source => 'conversions')

    expect(:get => route).to route_to 'conversions#show_relationship', params
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:post => route).not_to be_routable
    expect(:delete => route).not_to be_routable
  end

  it 'routes conversion user relationship endpoint' do
    route = '/api/conversions/foo/relationships/user'
    params = { :conversion_id => 'foo', :relationship => 'user' }

    expect(:get => '/api/conversions/foo/user').to route_to 'users#get_related_resource', params.merge(:source => 'conversions')

    expect(:get => route).to route_to 'conversions#show_relationship', params
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:post => route).not_to be_routable
    expect(:delete => route).not_to be_routable
  end
end
