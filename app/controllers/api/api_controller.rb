# frozen_string_literal: true
module Api
  class ApiController < ApplicationController
    include DeviseTokenAuth::Concerns::SetUserByToken
    include Pundit
    include JSONAPI::ActsAsResourceController

    after_action :verify_authorized, :except => :index
    after_action :verify_policy_scoped, :only => :index

    def context
      {
        :user => pundit_user
      }
    end

    def pundit_user
      current_api_user
    end
  end
end
