# frozen_string_literal: true

module Api
  class NotificationsController < ApiController
    after_action :renew_token
  end
end
