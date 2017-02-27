# frozen_string_literal: true
module Api
  class ApiController < ApplicationController
    before_action :ensure_json_request

    private

    def ensure_json_request
      return if request.format == :json
      head :not_acceptable
    end
  end
end
