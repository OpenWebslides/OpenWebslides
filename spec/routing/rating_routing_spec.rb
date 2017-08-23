# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'ratings routing', :type => :routing do
  it 'routes conversations rating endpoint' do
    route = '/api/conversations/foo/rating'

    expect(:get => route).not_to be_routable
    expect(:post => route).to route_to 'rating#create', :conversation_id => 'foo'
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:delete => route).to route_to 'rating#destroy', :conversation_id => 'foo'
  end

  it 'routes comments rating endpoint' do
    route = '/api/comments/foo/rating'

    expect(:get => route).not_to be_routable
    expect(:post => route).to route_to 'rating#create', :comment_id => 'foo'
    expect(:patch => route).not_to be_routable
    expect(:put => route).not_to be_routable
    expect(:delete => route).to route_to 'rating#destroy', :comment_id => 'foo'
  end
end
