# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'comments routing', :type => :routing do
  it 'routes comments endpoint' do
    route = '/api/comments'

    expect(:get => route).not_to be_routable
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:post => route).to route_to 'comments#create'
    expect(:delete => route).not_to be_routable
  end

  it 'routes comment endpoint' do
    route = '/api/comments/foo'

    expect(:get => route).to route_to 'comments#show', :id => 'foo'
    expect(:patch => route).to route_to 'comments#update', :id => 'foo'
    expect(:put => route).to route_to 'comments#update', :id => 'foo'
    expect(:post => route).not_to be_routable
    expect(:delete => route).to route_to 'comments#destroy', :id => 'foo'
  end

  it 'routes comment user relationship endpoint' do
    route = '/api/comments/foo/relationships/user'
    params = { :comment_id => 'foo', :relationship => 'user' }

    expect(:get => '/api/comments/foo/user').to route_to 'users#get_related_resource', params.merge(:source => 'comments')

    expect(:get => route).to route_to 'comments#show_relationship', params
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
