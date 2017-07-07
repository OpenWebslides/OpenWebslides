# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'decks routing', :type => :routing do
  it 'routes decks endpoint' do
    route = '/api/decks'

    expect(:get => route).to route_to 'api/decks#index'
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:post => route).to route_to 'api/decks#create'
    expect(:delete => route).not_to be_routable
  end

  it 'routes deck endpoint' do
    route = '/api/decks/foo'

    expect(:get => route).to route_to 'api/decks#show', :id => 'foo'
    expect(:patch => route).to route_to 'api/decks#update', :id => 'foo'
    expect(:put => route).to route_to 'api/decks#update', :id => 'foo'
    expect(:post => route).not_to be_routable
    expect(:delete => route).to route_to 'api/decks#destroy', :id => 'foo'
  end

  it 'routes deck owner relationship endpoint' do
    route = '/api/decks/foo/relationships/owner'
    params = { :deck_id => 'foo', :relationship => 'owner' }

    expect(:get => '/api/decks/foo/owner').to route_to 'api/users#get_related_resource', params.merge(:source => 'api/decks')

    expect(:get => route).to route_to 'api/decks#show_relationship', params
    expect(:patch => route).to route_to 'api/decks#update_relationship', params
    expect(:put => route).to route_to 'api/decks#update_relationship', params
    expect(:post => route).not_to be_routable
    expect(:delete => route).not_to be_routable
  end

  it 'routes deck collaborators relationship endpoint' do
    route = '/api/decks/foo/relationships/collaborators'
    params = { :deck_id => 'foo', :relationship => 'collaborators' }

    expect(:get => '/api/decks/foo/collaborators').to route_to 'api/users#get_related_resources', params.merge(:source => 'api/decks')

    expect(:get => route).to route_to 'api/decks#show_relationship', params
    expect(:patch => route).to route_to 'api/decks#update_relationship', params
    expect(:put => route).to route_to 'api/decks#update_relationship', params
    expect(:post => route).to route_to 'api/decks#create_relationship', params
    expect(:delete => route).to route_to 'api/decks#destroy_relationship', params
  end

  it 'routes deck assets relationship endpoint' do
    route = '/api/decks/foo/relationships/assets'
    params = { :deck_id => 'foo', :relationship => 'assets' }

    expect(:get => '/api/decks/foo/assets').to route_to 'api/assets#get_related_resources', params.merge(:source => 'api/decks')

    expect(:get => route).to route_to 'api/decks#show_relationship', params
    expect(:patch => route).to route_to 'api/decks#update_relationship', params
    expect(:put => route).to route_to 'api/decks#update_relationship', params
    expect(:post => route).to route_to 'api/decks#create_relationship', params
    expect(:delete => route).to route_to 'api/decks#destroy_relationship', params
  end
end
