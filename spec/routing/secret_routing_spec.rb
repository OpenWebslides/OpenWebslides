# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'secrets routing', :type => :routing do
  it 'routes conversations secret endpoint' do
    route = '/api/conversations/foo/secret'

    expect(:get => route).not_to be_routable
    expect(:post => route).to route_to 'secret#create', :conversation_id => 'foo'
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:delete => route).to route_to 'secret#destroy', :conversation_id => 'foo'
  end
end
