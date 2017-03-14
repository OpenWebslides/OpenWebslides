# frozen_string_literal: true
module Api
  class ApiController < ApplicationController
    include JSONAPI::ActsAsResourceController
    include Pundit
    include Pundit::ResourceController
    include DeviseTokenAuth::Concerns::SetUserByToken

    alias current_user current_api_user
  end
end
