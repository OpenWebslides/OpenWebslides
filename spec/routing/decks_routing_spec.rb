# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'decks routing', :type => :routing do
  it 'routes decks endpoint' do
    route = '/api/decks'

    expect(:get => route).to route_to 'decks#index'
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:post => route).to route_to 'decks#create'
    expect(:delete => route).not_to be_routable
  end

  it 'routes deck endpoint' do
    route = '/api/decks/foo'

    expect(:get => route).to route_to 'decks#show', :id => 'foo'
    expect(:patch => route).to route_to 'decks#update', :id => 'foo'
    expect(:put => route).to route_to 'decks#update', :id => 'foo'
    expect(:post => route).not_to be_routable
    expect(:delete => route).to route_to 'decks#destroy', :id => 'foo'
  end

  it 'routes deck user relationship endpoint' do
    route = '/api/decks/foo/relationships/user'
    params = { :deck_id => 'foo', :relationship => 'user' }

    expect(:get => '/api/decks/foo/user').to route_to 'users#get_related_resource', params.merge(:source => 'decks')

    expect(:get => route).to route_to 'decks#show_relationship', params
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:post => route).not_to be_routable
    expect(:delete => route).not_to be_routable
  end

  it 'routes deck collaborators relationship endpoint' do
    route = '/api/decks/foo/relationships/collaborators'
    params = { :deck_id => 'foo', :relationship => 'collaborators' }

    expect(:get => '/api/decks/foo/collaborators').to route_to 'users#get_related_resources', params.merge(:source => 'decks')

    expect(:get => route).to route_to 'decks#show_relationship', params
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:post => route).not_to be_routable
    expect(:delete => route).not_to be_routable
  end

  it 'routes deck assets relationship endpoint' do
    route = '/api/decks/foo/relationships/assets'
    params = { :deck_id => 'foo', :relationship => 'assets' }

    expect(:get => '/api/decks/foo/assets').to route_to 'assets#get_related_resources', params.merge(:source => 'decks')

    expect(:get => route).to route_to 'decks#show_relationship', params
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:post => route).not_to be_routable
    expect(:delete => route).not_to be_routable
  end

  it 'routes deck conversations relationship endpoint' do
    route = '/api/decks/foo/relationships/conversations'
    params = { :deck_id => 'foo', :relationship => 'conversations' }

    expect(:get => '/api/decks/foo/conversations').to route_to 'conversations#get_related_resources', params.merge(:source => 'decks')

    expect(:get => route).to route_to 'decks#show_relationship', params
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:post => route).not_to be_routable
    expect(:delete => route).not_to be_routable
  end
end
