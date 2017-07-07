# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'notifications routing', :type => :routing do
  it 'routes notifications endpoint' do
    route = '/api/notifications'

    expect(:get => route).to route_to 'api/notifications#index'
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:post => route).not_to be_routable
    expect(:delete => route).not_to be_routable
  end

  it 'routes notification endpoint' do
    route = '/api/notifications/foo'

    expect(:get => route).to route_to 'api/notifications#show', :id => 'foo'
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:post => route).not_to be_routable
    expect(:delete => route).not_to be_routable
  end

  it 'routes notification user relationship endpoint' do
    route = '/api/notifications/foo/relationships/user'
    params = { :notification_id => 'foo', :relationship => 'user' }

    expect(:get => '/api/notifications/foo/user').to route_to 'api/users#get_related_resource', params.merge(:source => 'api/notifications')

    expect(:get => route).to route_to 'api/notifications#show_relationship', params
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:post => route).not_to be_routable
    expect(:delete => route).not_to be_routable
  end

  it 'routes notification deck relationship endpoint' do
    route = '/api/notifications/foo/relationships/deck'
    params = { :notification_id => 'foo', :relationship => 'deck' }

    expect(:get => '/api/notifications/foo/deck').to route_to 'api/decks#get_related_resource', params.merge(:source => 'api/notifications')

    expect(:get => route).to route_to 'api/notifications#show_relationship', params
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:post => route).not_to be_routable
    expect(:delete => route).not_to be_routable
  end
end
