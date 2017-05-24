# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'routing', :type => :routing do
  describe 'API' do
    describe 'authentication' do
      it 'routes password reset endpoint' do
        route = '/api/password'

        expect(:get => route).not_to be_routable
        expect(:patch => route).to route_to 'api/password#update'
        expect(:put => route).to route_to 'api/password#update'
        expect(:post => route).to route_to 'api/password#create'
        expect(:delete => route).not_to be_routable
      end

      it 'routes token endpoint' do
        route = '/api/token'

        expect(:get => route).not_to be_routable
        expect(:patch => route).not_to be_routable
        expect(:put => route).not_to be_routable
        expect(:post => route).to route_to 'api/token#create'
        expect(:delete => route).to route_to 'api/token#destroy'
      end

      it 'routes confirmation endpoint' do
        route = '/api/confirmation'

        expect(:get => route).not_to be_routable
        expect(:patch => route).not_to be_routable
        expect(:put => route).not_to be_routable
        expect(:post => route).to route_to 'api/confirmation#create'
        expect(:delete => route).not_to be_routable
      end
    end

    describe 'notifications' do
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
    end

    describe 'users' do
      it 'routes users endpoint' do
        route = '/api/users'

        expect(:get => route).to route_to 'api/users#index'
        expect(:patch => route).not_to be_routable
        expect(:put => route).not_to be_routable
        expect(:post => route).to route_to 'api/users#create'
        expect(:delete => route).not_to be_routable
      end

      it 'routes user endpoint' do
        route = '/api/users/foo'

        expect(:get => route).to route_to 'api/users#show', :id => 'foo'
        expect(:patch => route).to route_to 'api/users#update', :id => 'foo'
        expect(:put => route).to route_to 'api/users#update', :id => 'foo'
        expect(:post => route).not_to be_routable
        expect(:delete => route).to route_to 'api/users#destroy', :id => 'foo'
      end
    end
  end
end
