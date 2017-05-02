# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ApplicationController do
  describe 'routing' do
    it 'has a catchall' do
      params = { :controller => 'application', :action => 'index' }
      expect(:get => '/').to route_to params
    end
  end
end
