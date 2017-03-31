# frozen_string_literal: true
module Api
  class ApiController < ApplicationController
    include JSONAPI::ActsAsResourceController
    include Pundit
    include Pundit::ResourceController

    def current_user
      header = request.env['HTTP_AUTHORIZATION']
      return nil unless header

      token = header.scan(/Bearer (.*)$/).flatten.last
      return nil unless token

      payload = OpenWebslides::Api::Authentication.decode token

      User.find_by payload['id']
    rescue JWT::DecodeError
      nil
    end

    def authenticate_user
      # TODO: validate token lifetime
      head :unauthorized unless current_user
    end
  end
end
