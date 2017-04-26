# frozen_string_literal: true

module Api
  class UsersController < ApiController
    before_action :authenticate_user, :except => %i[index show create confirm]

    before_action :verify_content_type_header, :only => %i[confirm]

    def confirm
      resource = User.confirm_by_token params[:confirmation_token]
      yield resource if block_given?

      raise Api::DeviseError, resource unless resource.errors.empty?

      head :no_content
    end
  end
end
