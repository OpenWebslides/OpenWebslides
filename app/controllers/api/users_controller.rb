# frozen_string_literal: true
module Api
  class UsersController < ApiController
    before_action :authenticate_user, :except => [:create]
  end
end
