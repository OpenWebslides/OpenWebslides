# frozen_string_literal: true

module Api
  class ConfirmationController < ApiController
    skip_after_action :enforce_policy_use, :only => :create
  end
end
