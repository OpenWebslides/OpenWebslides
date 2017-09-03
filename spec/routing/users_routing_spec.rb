# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'users routing', :type => :routing do
  it 'routes users endpoint' do
    route = '/api/users'

    expect(:get => route).to route_to 'users#index'
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:post => route).not_to be_routable
    expect(:delete => route).not_to be_routable
  end

  it 'routes user endpoint' do
    route = '/api/users/foo'

    expect(:get => route).to route_to 'users#show', :id => 'foo'
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:post => route).not_to be_routable
    expect(:delete => route).to route_to 'users#destroy', :id => 'foo'
  end

  it 'routes user decks relationship endpoint' do
    route = '/api/users/foo/relationships/decks'
    params = { :user_id => 'foo', :relationship => 'decks' }

    expect(:get => '/api/users/foo/decks').to route_to 'decks#get_related_resources', params.merge(:source => 'users')

    expect(:get => route).to route_to 'users#show_relationship', params
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:post => route).not_to be_routable
    expect(:delete => route).not_to be_routable
  end

  it 'routes user collaborations relationship endpoint' do
    route = '/api/users/foo/relationships/collaborations'
    params = { :user_id => 'foo', :relationship => 'collaborations' }

    expect(:get => '/api/users/foo/collaborations').to route_to 'decks#get_related_resources', params.merge(:source => 'users')

    expect(:get => route).to route_to 'users#show_relationship', params
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:post => route).not_to be_routable
    expect(:delete => route).not_to be_routable
  end

  it 'routes user conversions relationship endpoint' do
    route = '/api/users/foo/relationships/conversions'
    params = { :user_id => 'foo', :relationship => 'conversions' }

    expect(:get => '/api/users/foo/conversions').to route_to 'conversions#get_related_resources', params.merge(:source => 'users')

    expect(:get => route).to route_to 'users#show_relationship', params
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:post => route).not_to be_routable
    expect(:delete => route).not_to be_routable
  end
end
