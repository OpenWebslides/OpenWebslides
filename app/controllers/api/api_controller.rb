# frozen_string_literal: true

module Api
  ##
  # REST API controller
  #
  class ApiController < ApplicationController
    include JSONAPI::Utils
    include JWT::Auth::Authentication
    include Pundit

    include ErrorHandling

    protected

    ##
    # Request context for resources
    #
    def context
      { :current_user => current_user }
    end
  end
end
