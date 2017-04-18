# frozen_string_literal: true

require 'rails_helper'

resource :users do
  get '/api/users' do
    example 'Listing users' do
      do_request

      expect(status).to eq 200
    end
  end
end
