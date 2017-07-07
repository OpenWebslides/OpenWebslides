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

    describe 'assets' do
      it 'routes assets endpoint' do
        route = '/api/assets'

        expect(:post => route).to route_to 'api/assets#create'
      end

      it 'routes asset endpoint' do
        route = '/api/assets/foo'

        expect(:get => route).to route_to 'api/assets#show', :id => 'foo'
        expect(:patch => route).to route_to 'api/assets#update', :id => 'foo'
        expect(:put => route).to route_to 'api/assets#update', :id => 'foo'
        expect(:delete => route).to route_to 'api/assets#destroy', :id => 'foo'
      end
    end
  end
end
