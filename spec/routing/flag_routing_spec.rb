# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'flags routing', :type => :routing do
  it 'routes conversations flag endpoint' do
    route = '/api/conversations/foo/flag'

    expect(:get => route).not_to be_routable
    expect(:post => route).to route_to 'flag#create', :conversation_id => 'foo'
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:delete => route).not_to be_routable
  end

  it 'routes comments flag endpoint' do
    route = '/api/comments/foo/flag'

    expect(:get => route).not_to be_routable
    expect(:post => route).to route_to 'flag#create', :comment_id => 'foo'
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:delete => route).not_to be_routable
  end
end
