# frozen_string_literal: true
module Api
  class ApiController < ApplicationController
    include JSONAPI::ActsAsResourceController
    include Pundit
    include Pundit::ResourceController

    alias current_user current_api_user
  end
end
