# frozen_string_literal: true

module Api
  class UsersController < ApiController
    before_action :authenticate_user, :only => %i[update destroy]

    after_action :renew_token, :except => :destroy
  end
end
