# frozen_string_literal: true

module Api
  class ApiController < ApplicationController
    include JSONAPI::ActsAsResourceController
    include Pundit
    include JWT::Auth::Authentication

    after_action :add_token_to_response
  end
end
