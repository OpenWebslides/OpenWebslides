# frozen_string_literal: true

module Api
  class AssetsController < ApiController
    before_action :authenticate_user
  end
end
