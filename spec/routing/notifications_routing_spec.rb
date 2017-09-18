# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'notifications routing', :type => :routing do
  it 'routes notifications endpoint' do
    route = '/api/notifications'

    expect(:get => route).to route_to 'notifications#index'
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:post => route).not_to be_routable
    expect(:delete => route).not_to be_routable
  end

  it 'routes notification endpoint' do
    route = '/api/notifications/foo'

    expect(:get => route).to route_to 'notifications#show', :id => 'foo'
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:post => route).not_to be_routable
    expect(:delete => route).not_to be_routable
  end

  it 'routes notification subject relationship endpoint' do
    route = '/api/notifications/foo/relationships/subject'
    params = { :notification_id => 'foo', :relationship => 'subject' }

    expect(:get => '/api/notifications/foo/subject').to route_to 'users#get_related_resource', params.merge(:source => 'notifications')

    expect(:get => route).to route_to 'notifications#show_relationship', params
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:post => route).not_to be_routable
    expect(:delete => route).not_to be_routable
  end

  it 'routes notification object relationship endpoint' do
    route = '/api/notifications/foo/relationships/object'
    params = { :notification_id => 'foo', :relationship => 'object' }

    expect(:get => '/api/notifications/foo/object').to route_to 'decks#get_related_resource', params.merge(:source => 'notifications')

    expect(:get => route).to route_to 'notifications#show_relationship', params
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:post => route).not_to be_routable
    expect(:delete => route).not_to be_routable
  end
end
