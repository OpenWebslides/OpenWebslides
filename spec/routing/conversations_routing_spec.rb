# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'conversations routing', :type => :routing do
  it 'routes conversations endpoint' do
    route = '/api/conversations'

    expect(:get => route).not_to be_routable
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:post => route).to route_to 'conversations#create'
    expect(:delete => route).not_to be_routable
  end

  it 'routes conversation endpoint' do
    route = '/api/conversations/foo'

    expect(:get => route).to route_to 'conversations#show', :id => 'foo'
    expect(:patch => route).to route_to 'conversations#update', :id => 'foo'
    expect(:put => route).to route_to 'conversations#update', :id => 'foo'
    expect(:post => route).not_to be_routable
    expect(:delete => route).to route_to 'conversations#destroy', :id => 'foo'
  end

  it 'routes conversation user relationship endpoint' do
    route = '/api/conversations/foo/relationships/user'
    params = { :conversation_id => 'foo', :relationship => 'user' }

    expect(:get => '/api/conversations/foo/user').to route_to 'users#get_related_resource', params.merge(:source => 'conversations')

    expect(:get => route).to route_to 'conversations#show_relationship', params
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:post => route).not_to be_routable
    expect(:delete => route).not_to be_routable
  end

  it 'routes conversation deck relationship endpoint' do
    route = '/api/conversations/foo/relationships/deck'
    params = { :conversation_id => 'foo', :relationship => 'deck' }

    expect(:get => '/api/conversations/foo/deck').to route_to 'decks#get_related_resource', params.merge(:source => 'conversations')

    expect(:get => route).to route_to 'conversations#show_relationship', params
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:post => route).not_to be_routable
    expect(:delete => route).not_to be_routable
  end
end
