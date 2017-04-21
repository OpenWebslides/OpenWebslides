# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Auth::OmniauthController do
  describe 'routing' do
    it 'has an omniauth callback' do
      params = { :controller => 'auth/omniauth', :action => 'callback', :provider => 'provider' }
      expect(:get => '/auth/provider/callback').to route_to params
    end
  end
end
