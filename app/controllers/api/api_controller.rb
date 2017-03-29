# frozen_string_literal: true
module Api
  class ApiController < ApplicationController
    include JSONAPI::ActsAsResourceController
    include Pundit
    include Pundit::ResourceController

    before_action :skip_session

    alias current_user current_api_user

    protected

    def skip_session
      request.session_options[:skip] = true
    end
  end
end
