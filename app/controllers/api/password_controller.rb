# frozen_string_literal: true

module Api
  class PasswordController < ApiController
    skip_after_action :enforce_policy_use, :only => %i[create update]
  end
end
